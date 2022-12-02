import TableService from '../../features/table/table-service';

describe('Table service unit test', () => {
  it('should return correct table grid from game id', async () => {
    const gameId = '222000111';

    const tableGrid = [['2', '2', '2'], ['0', '0', '0'], ['1', '1', '1']];

    expect(TableService.getTableGrid(gameId)).toEqual(tableGrid);
  });

  it('should return correct cell id from row and column', async () => {
    const row = 1;
    const column = 1;

    expect(TableService.getCellIdFromRowAndColumn(row, column)).toEqual(4);
  });
});
