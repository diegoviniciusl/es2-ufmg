require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const router = require('./router');

const app = express();

app.use(cors());
app.options('*', cors());
app.use(helmet());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use('/api', router);

module.exports = app;
