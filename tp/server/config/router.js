const express = require('express');

const router = express.Router();
const gameRoutes = require('../modules/game/game.routes');

router.use('/game', gameRoutes);

module.exports = router;
