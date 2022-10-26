const express = require('express');

const getNextMove = require('./get-next-move.handler');
const learn = require('./learn.handler');

const router = express.Router();

router.get('/:gameId/next-move', getNextMove.handler);
router.post('/learn', learn.handler);

module.exports = router;
