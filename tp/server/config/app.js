require('dotenv').config();

require('express-async-errors');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const router = require('./router');

const app = express();

app.use(express.json());
app.use(cors());
app.options('*', cors());
app.use(helmet());
app.use('/api', router);
// eslint-disable-next-line no-unused-vars
app.use((error, _req, res, _next) => {
  console.error('Error', { error });
  return res.status(500).json();
});

module.exports = app;
