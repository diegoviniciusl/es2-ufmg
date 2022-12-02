const app = require('../../config/app');
const requestHelper = require('../helpers/requestHelper');
const { Game, ...models } = require('../../models');

const {
  get,
  server,
} = requestHelper(app);

const getPath = (gameId) => `/api/game/${gameId}/next-move`;

afterAll(async () => {
  await server.close();
  await models.sequelize.close();
});

afterEach(async () => {
  await Game.destroy({ truncate: true, force: true });
});

describe('[IT][GET] next move', () => {
  it('should return 404 for empty gameId', async () => {
    const response = await get({
      path: getPath(''),
    });

    expect(response.statusCode).toEqual(404);
    expect(response.body).toEqual({});
  });

  it('should create new game if game does not exist', async () => {
    const gameId = '222000111';
    const response = await get({
      path: getPath(gameId),
    });

    const createdGame = await Game.findByPk(gameId);

    expect(response.statusCode).toEqual(200);
    expect(createdGame).toMatchObject({ gameId });
    expect(response.body.newGame.length).toEqual(9);
  });
});
