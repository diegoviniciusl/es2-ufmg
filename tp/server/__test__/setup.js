const { Game } = require('../models');

afterAll(async () => {
  if (process.env.NODE_ENV === 'test') {
    await Game.destroy({ truncate: true, force: true });
  }
});
