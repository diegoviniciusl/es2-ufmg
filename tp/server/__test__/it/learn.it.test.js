const app = require('../../config/app');
const requestHelper = require('../helpers/requestHelper');
const { Game, ...models } = require('../../models');

const {
  post,
  server,
} = requestHelper(app);

const getPath = () => '/api/game/learn';

afterAll(async () => {
  await server.close();
  await models.sequelize.close();
});

afterEach(async () => {
  await Game.destroy({ truncate: true, force: true });
});

describe('[IT][POST] learn', () => {
  it('should return 400 for empty games', async () => {
    const response = await post({
      path: getPath(''),
      params: {
        won: false,
      },
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toEqual({ errors: { message: 'Missing body.games' } });
  });

  it('should return 400 for empty won', async () => {
    const response = await post({
      path: getPath(),
      params: {
        games: { 111111221: '111111220' },
      },
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toEqual({ errors: { message: 'Missing body.won' } });
  });

  it('should increase move percentage for games if computer won', async () => {
    const game = await Game.create({
      gameId: '222000111',
      moves: {
        222001011: 5,
      },
    });

    const response = await post({
      path: getPath(),
      params: {
        won: true,
        games: { 222000111: '222001011' },
      },
    });

    await game.reload();

    expect(response.statusCode).toEqual(200);
    expect(game.moves[222001011]).toEqual(6);
  });

  it('should decrease move percentage for games if computer lost', async () => {
    const game = await Game.create({
      gameId: '222000111',
      moves: {
        222001011: 5,
      },
    });

    const response = await post({
      path: getPath(),
      params: {
        won: false,
        games: { 222000111: '222001011' },
      },
    });

    await game.reload();

    expect(response.statusCode).toEqual(200);
    expect(game.moves[222001011]).toEqual(3);
  });
});
