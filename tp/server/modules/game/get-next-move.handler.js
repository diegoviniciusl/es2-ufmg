const { Game } = require('../../models');
const { cellPieceType } = require('../../helpers/constants');

const getRowFromCellId = (cellId) => parseInt(cellId / 3, 10);

const getPossibleMovesForCell = (gameId, cellId) => {
  const row = getRowFromCellId(cellId);
  const gameIdList = gameId.split('');

  const diagonalLeftCellId = cellId + 2;
  const diagonalLeftPiece = gameIdList[diagonalLeftCellId];
  const frontCellId = cellId + 3;
  const frontPiece = gameIdList[frontCellId];
  const diagonalRightCellId = cellId + 4;
  const diagonalRightPiece = gameIdList[diagonalRightCellId];

  const moves = [];
  if (diagonalLeftPiece === cellPieceType.user && row + 1 === getRowFromCellId(diagonalLeftCellId)) {
    moves.push(diagonalLeftCellId);
  }
  if (frontPiece === cellPieceType.blank && row + 1 === getRowFromCellId(frontCellId)) {
    moves.push(frontCellId);
  }
  if (diagonalRightPiece === cellPieceType.user && row + 1 === getRowFromCellId(diagonalRightCellId)) {
    moves.push(diagonalRightCellId);
  }

  return moves;
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
  getPossibleMoves(gameId).forEach((move) => { moves[move] = 1; });
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
