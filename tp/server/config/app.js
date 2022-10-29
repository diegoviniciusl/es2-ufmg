require('dotenv').config();

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

module.exports = app;
