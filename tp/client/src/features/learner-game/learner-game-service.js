import axios from 'axios';
import { cellPieceType, LEARNER_API, ROWS } from '../../shared/constants';

const getInitialGame = () => {
  let initialGameId = '';

  Array(ROWS).fill().forEach(() => { initialGameId += cellPieceType.computer; });
  Array(ROWS * (ROWS - 2)).fill().forEach(() => { initialGameId += cellPieceType.blank; });
  Array(ROWS).fill().forEach(() => { initialGameId += cellPieceType.user; });

  return initialGameId;
};

const makeComputerLearn = async ({ won, games }) => {
  await axios.post(`${LEARNER_API}/game/learn`, {
    won,
    games,
  });
};

const getGameAfterComputerMove = async (gameId) => {
  const response = await axios.get(`${LEARNER_API}/game/${gameId}/next-move`);
  return response.data?.newGame;
};

const getNewGameFromMove = (gameId, fromCellId, toCellId) => {
  const newGameId = gameId.split('');
  const fromPiece = newGameId[fromCellId];

  newGameId[fromCellId] = cellPieceType.blank;
  newGameId[toCellId] = fromPiece;

  return newGameId.join('');
};

const getOpponentPieceType = (playerCellPieceType) => (playerCellPieceType === cellPieceType.user ? cellPieceType.computer : cellPieceType.user);

const getRowFromCellId = (cellId) => parseInt(cellId / ROWS, 10);

const getPossibleCellIdMoves = (gameId, cellId) => {
  const multiplier = gameId[cellId] === cellPieceType.user ? -1 : 1;
  const opponentCellPieceType = getOpponentPieceType(gameId[cellId]);

  const row = getRowFromCellId(cellId);
  const gameIdList = gameId.split('');

  const diagonalLeftCellId = cellId + ((ROWS - 1) * multiplier);
  const diagonalLeftPiece = gameIdList[diagonalLeftCellId];
  const frontCellId = cellId + ((ROWS) * multiplier);
  const frontPiece = gameIdList[frontCellId];
  const diagonalRightCellId = cellId + ((ROWS + 1) * multiplier);
  const diagonalRightPiece = gameIdList[diagonalRightCellId];

  const moves = [];
  if (diagonalLeftPiece === opponentCellPieceType && row + multiplier === getRowFromCellId(diagonalLeftCellId)) {
    moves.push(diagonalLeftCellId);
  }
  if (frontPiece === cellPieceType.blank && row + multiplier === getRowFromCellId(frontCellId)) {
    moves.push(frontCellId);
  }
  if (diagonalRightPiece === opponentCellPieceType && row + multiplier === getRowFromCellId(diagonalRightCellId)) {
    moves.push(diagonalRightCellId);
  }

  return moves;
};

const isPlayerAtTheEndline = (gameId, playerCellPieceType) => Array(ROWS).fill().some((_, cellId) => {
  if (playerCellPieceType === cellPieceType.user) return gameId[cellId] === playerCellPieceType;
  return gameId[(ROWS * ROWS) - 1 - cellId] === playerCellPieceType;
});

const didPlayerAteAllOpponentPieces = (gameId, playerCellPieceType) => {
  const opponentCellPieceType = getOpponentPieceType(playerCellPieceType);
  const splittedGameId = gameId.split('');

  return splittedGameId.every((piece) => piece !== opponentCellPieceType);
};

const didPlayerLetOpponentMoveless = (gameId, playerCellPieceType) => {
  const opponentCellPieceType = getOpponentPieceType(playerCellPieceType);
  const splittedGameId = gameId.split('');

  return splittedGameId.every((piece, cellId) => piece !== opponentCellPieceType || getPossibleCellIdMoves(gameId, cellId).length === 0);
};

const didPlayerWin = (gameId, playerCellPieceType) => {
  if (isPlayerAtTheEndline(gameId, playerCellPieceType)) return true;
  if (didPlayerAteAllOpponentPieces(gameId, playerCellPieceType)) return true;
  if (didPlayerLetOpponentMoveless(gameId, playerCellPieceType)) return true;
  return false;
};

export default {
  getPossibleCellIdMoves,
  getNewGameFromMove,
  getGameAfterComputerMove,
  didPlayerWin,
  makeComputerLearn,
  getInitialGame,
};
