const fetch = require('node-fetch');
const Headers = fetch.Headers;
const Base64 = require('js-base64').Base64;

class NetworkError {
  constructor(message) {
    this.name = 'NetworkError';
    this.message = message;
    this.stack = new Error().stack;
  }
}

class ApiError {
  constructor(message) {
    this.name = 'ApiError';
    this.message = message;
    this.stack = new Error().stack;
  }
}

class EntityNotFoundError extends ApiError {
}

class BadDataError extends ApiError {
}

function appendAuthHeaders(headers, APIKey) {
  headers.append('Authorization', 'Basic ' + Base64.encode(`${APIKey}:`));
}

exports = module.exports = function (API_RO_ENDPOINT) {
  return {
    whereCloseTo: function whereCloseTo(coordinates, maxDistance = 10000) {
      return {
        coordinates: {
          "$near": {
            "$geometry": {
              type: "Point",
              coordinates: coordinates,
            },
            "$maxDistance": maxDistance
          }
        }
      };
    },
    fetchItems: function fetchItems(resource, options) {
      options = options || {};
      const {APIKey} = options;

      let url = `${API_RO_ENDPOINT}/${resource}/`;

      if (options.where) {
        const whereQueryString = JSON.stringify(options.where);
        url = `${url}?where=${whereQueryString}`
      }

      const init = {headers: new Headers()};

      if (APIKey) {
        appendAuthHeaders(init.headers, APIKey);
      }

      console.log(`fetchItems, url: ${url}`);

      return fetch(url, init)
        .catch(function (err) {
          // fetch only rejects on network failure
          throw new NetworkError('Cannot reach API');
        })
        .then(function (res) {
          return res.json();
        })
        .catch(function (err) {
          // err was thrown by the .json() method call
          throw new BadDataError('API response was not JSON');
        })
        .then(function (content) {
          if (!('_items' in content)) {
            throw new BadDataError('No _items field in response');
          }
          return content._items;
        });

    },
    fetchItem: function fetchItem(resource, id, options) {
      options = options || {};
      const {APIKey} = options;

      const url = `${API_RO_ENDPOINT}/${resource}/${id}`;

      const init = {headers: new Headers()};

      if (APIKey) {
        appendAuthHeaders(init.headers, APIKey);
      }

      console.log(`fetchItem, url: ${url}`);

      return fetch(url, init)
        .catch(function (err) {
          // fetch only rejects on network failure
          throw new NetworkError('Cannot reach API');
        })
        .then(function (res) {
          if (!res.ok) {
            if (res.status === 404) {
              throw new EntityNotFoundError(`${resource}/${id} does not exist`);
            } else {
              throw new BadDataError(`Bad response from API (${res.status})`);
            }
          } else {
            return res.json();
          }
        })
        .catch(function (err) {
          if (err instanceof ApiError) {
            // rethrow if err is already an ApiError
            throw err;
          } else {
            // if not, it means the error comes from the .json() call
            throw new BadDataError('API response was not JSON');
          }
        });
    }
  };
};

module.exports.NetworkError = NetworkError;
module.exports.ApiError = ApiError;
module.exports.EntityNotFoundError = EntityNotFoundError;
module.exports.BadDataError = BadDataError;