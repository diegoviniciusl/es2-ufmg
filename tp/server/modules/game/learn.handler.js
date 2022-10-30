const Sequelize = require('sequelize');
const { Game } = require('../../models');

const resetMoves = (game) => Object.keys(game.moves).forEach((gameId) => { game.moves[gameId] = 5; });

const hasNoPossibleMoves = (game) => Object.values(game.moves).every((times) => (times === 0));

const getNewGame = async (game, { games, won }) => {
  const nextGameId = games[game.gameId];
  game.moves[nextGameId] += won ? 1 : -2;
  if (game.moves[nextGameId] < 0) game.moves[nextGameId] = 0;

  game.changed('moves', true);

  if (hasNoPossibleMoves(game)) resetMoves(game);

  return game.save();
};

const handler = async (req, res) => {
  const { body } = req;
  const { games, won } = body;
  const existingGames = await Game.findAll({
    where: {
      gameId: {
        [Sequelize.Op.in]: Object.keys(games),
      },
    },
  });
  const existingGamesUpdates = existingGames.map((existingGame) => (getNewGame(existingGame, { games, won })));
  await Promise.all(existingGamesUpdates);

  return res.status(200).json();
};

module.exports = {
  handler,
};
