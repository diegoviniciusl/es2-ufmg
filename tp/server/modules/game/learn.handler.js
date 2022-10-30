const Sequelize = require('sequelize');
const { Game } = require('../../models');

const resetMoves = (game) => {
  Object.keys(game.moves).forEach((gameId) => { game.moves[gameId] = 5; });
};

const hasNoPossibleMoves = (game) => Object.values(game.moves).every((times) => (times === 0));

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
  const updatePromises = [];
  existingGames.forEach((existingGame) => {
    Object.entries(games).forEach(([gameId, nextGameId]) => {
      if (gameId !== existingGame.gameId) return;
      if (!existingGame.moves || !existingGame.moves[nextGameId]) return;
      existingGame.moves[nextGameId] += won ? 1 : -1;
      if (existingGame.moves[nextGameId] < 0) return;
      existingGame.changed('moves', true);

      if (hasNoPossibleMoves(existingGame)) {
        resetMoves(existingGame);
      }

      updatePromises.push(existingGame.save());
    });
  });
  await Promise.all(updatePromises);
  return res.status(200).json();
};

module.exports = {
  handler,
};
