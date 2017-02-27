const express = require('express');
const Promise = require('bluebird');
const winston = require('winston');
const redis = require('redis');
const crypto = require('crypto');
const proxy = require('express-http-proxy');
const base64 = require('js-base64').Base64;

Promise.promisifyAll(crypto);
Promise.promisifyAll(redis.RedisClient.prototype);

const port = process.env.PORT || 5001;
const APIKey = process.env.API_KEY;
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const TOKEN_LENGTH = +process.env.TOKEN_LENGTH || 32;
const API_ENDPOINT = process.env.API_ENDPOINT || "https://api.jlm2017.fr/";

const fetchItem = require('./api')(API_ENDPOINT).fetchItem;

winston.configure({
  level: LOG_LEVEL,
  transports: [
    new (winston.transports.Console)()
  ]
});

function checkToken(email, token) {
  return redisClient.getAsync(`user:${email}:token`).then(function (actualToken) {
    return actualToken === token;
  })
}

function saveToken(email, token) {
  return redisClient.setAsync(`user:${email}:token`, token);
}

function generateToken() {
  return crypto.randomBytesAsync(TOKEN_LENGTH).then(function (buffer) {
    return buffer.toString('hex');
  });
}

function checkIfAdmin(email) {
  return redisClient.getAsync(`user:${email}:admin`)
    .then(function (value) {
      return value === "true";
    })
}

function checkIfOwner(email, resource, _id) {
  if (['all_groups', 'all_events'].includes(resource)) {
    return fetchItem(resource, _id, {APIKey})
      .then(function (item) {
        return item.contact.email === email;
      });
  } else if (resource === 'people') {
    return fetchItem('people', _id, {APIKey})
      .then(function (person) {
        return person.email === email;
      });
  } else {
    return Promise.resolve(false);
  }
}

function checkIfAllowed(email, resource, _id) {
  return checkIfAdmin(email)
    .then(function(admin) {
      return admin || checkIfOwner(email, resource, _id);
    });
}

function tokenParamsMiddleware(req, res, next) {
  if (!req.get('X-email')) {
    res.status(401).json({status: 'Missing email', code: 401});
  } else {
    req.email = req.get('X-email');
    // TODO validate email here
    req.token = req.get('X-token') || null;
    next();
  }
}

function validateTokenMiddleware(req, res, next) {
  if (!req.token) {
    res.status(401).json({status: 'Unauthenticated', code: 401});
  } else {
    checkToken(req.email, req.token).then(function (passed) {
      if (!passed) {
        res.status(401).json({status: 'Invalid authentication', code: 401});
      } else {
        next();
      }
    })
  }
}

function checkRightsMiddleware(req, res, next) {
  checkIfAllowed(req.email, req.params.resource, req.params.id)
    .then(function (valid) {
      if (valid) {
        next();
      } else {
        res.status(403).json({status: 'Forbidden', code: 403});
      }
    })
}

function decorateWithAuthHeader(proxyReq, originalReq) {
  proxyReq.headers['Authorization'] = 'Basic ' + base64.encode(`${APIKey}:`);
  return proxyReq;
}

const proxyToAPI = proxy(API_ENDPOINT, {
  decorateRequest: decorateWithAuthHeader
});

const app = express();
const redisClient = redis.createClient();

const router = express.Router();

// add email and token attributes to the req object from headers
router.use(tokenParamsMiddleware);

// this route is above the Middleware that checks for token validity
router.post('/send_token', function (req, res) {
  generateToken().then(function (token) {
    return saveToken(req.email, token);
  }).then(function () {
    res.json({status: 'sent'});
  })
});

// this route is above the Middleware that checks for token validity
router.get('/check_token', function (req, res) {
  return checkToken(req.email, req.token).then(function (passed) {
    res.json({passed});
  });
});

// this middleware validates the token: everything below needs a verified token
router.use(validateTokenMiddleware);

// this route handles all methods to specific resources that are owned by the authenticated user
router.all(
  '/:resource([a-z_]+)/:id([0-9a-f]{24})',
  checkRightsMiddleware,
  proxyToAPI
);

// this route handles the creation of new resources (everyone that is authenticated can do it) TODO verify assertion
router.post(
  '/:resource([a-z_]+)/',
  proxyToAPI
);

// every other route is 404
router.use(function (req, res) {
  res.status(404).json({status: 'Does not exist', code: 404});
});

app.use('/', router);

app.listen(port);

winston.info(`Listening on port ${port}`);
