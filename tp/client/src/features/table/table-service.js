const getTableGrid = (gameId) => {
  const splittedGameId = gameId.split('');

  const firstRow = splittedGameId.splice(0, 3);
  const secondRow = splittedGameId.splice(0, 3);
  const thirdRow = splittedGameId.splice(0, 3);

  return [firstRow, secondRow, thirdRow];
};

const getCellIdFromRowAndColumn = (row, column) => row * 3 + column;

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
