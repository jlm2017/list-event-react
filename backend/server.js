const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.PORT || 5001;

const router = express.Router();


router.use();


app.use('/', router);


app.listen(port);
