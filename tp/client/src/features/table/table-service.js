import { ROWS } from '../../shared/constants';

const getTableGrid = (gameId) => {
  const splittedGameId = gameId.split('');

  return Array(ROWS).fill().map(() => (splittedGameId.splice(0, ROWS)));
};

const getCellIdFromRowAndColumn = (row, column) => row * ROWS + column;

const getInitialCellStatesFromGameId = (gameId) => {
  const splittedGameId = gameId.split('');

  return splittedGameId.map((piece) => ({
    piece,
    isSelected: false,
    isHighlighted: false,
  }));
};

export default {
  getTableGrid,
  getCellIdFromRowAndColumn,
  getInitialCellStatesFromGameId,
};
