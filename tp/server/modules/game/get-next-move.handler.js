const { Game } = require('../../models');
const { cellPieceType } = require('../../helpers/constants');

const ROWS = Number(process.env.ROWS || 3);

const getRowFromCellId = (cellId) => Math.floor(cellId / ROWS);

const getMoves = ({ gameId, cellId }, data) => {
  const row = getRowFromCellId(cellId);
  return data.filter((value) => gameId[value.cellId] === value.comparisonPiece && row + 1 === getRowFromCellId(value.cellId)).map((value) => value.cellId);
};

const getPossibleMovesForCell = (gameId, cellId) => {
  const data = [];
  data.push({
    cellId: cellId + ROWS - 1,
    comparisonPiece: cellPieceType.user,
  });
  data.push({
    cellId: cellId + ROWS,
    comparisonPiece: cellPieceType.blank,
  });
  data.push({
    cellId: cellId + ROWS + 1,
    comparisonPiece: cellPieceType.user,
  });

  return getMoves({ gameId, cellId }, data);
};

const getNewGameFromMove = (gameId, fromCellId, toCellId) => {
  const newGameId = gameId.split('');
  newGameId[fromCellId] = cellPieceType.blank;
  newGameId[toCellId] = cellPieceType.computer;
  return newGameId.join('');
};

const getPossibleMoves = (gameId) => {
  const games = [];
  gameId.split('').forEach((cellPiece, cellId) => {
    if (cellPiece !== cellPieceType.computer) return;
    const possibleMovesCellIds = getPossibleMovesForCell(gameId, cellId);
    possibleMovesCellIds.forEach((possibleMoveCellId) => games.push(getNewGameFromMove(gameId, cellId, possibleMoveCellId)));
  });
  return games;
};

const createNewGame = async (gameId) => {
  const moves = {};
  getPossibleMoves(gameId).forEach((move) => { moves[move] = 5; });
  return Game.create({ gameId, moves });
};

const getNewGame = (game) => {
  const games = [];
  Object.entries(game.moves).forEach(([newGame, times]) => {
    Array(times).fill().forEach(() => {
      games.push(newGame);
    });
  });
  return games[Math.floor(Math.random() * games.length)];
};

const handler = async (req, res) => {
  const { params } = req;

  if (!params?.gameId) {
    return res.status(404).json();
  }

  const { gameId } = params;
  let game = await Game.findByPk(gameId);

  if (!game) {
    game = await createNewGame(gameId);
  }

  const newGame = getNewGame(game);

  return res.status(200).json({ newGame });
};

module.exports = {
  handler,
};
