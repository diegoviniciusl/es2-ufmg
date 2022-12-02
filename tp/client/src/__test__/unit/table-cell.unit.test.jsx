import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TableCell from '../../features/table-cell/table-cell';
import { cellPieceType } from '../../shared/constants';

describe('Table cell background color decision unit test', () => {
  it('should have background color bg-slate-900 when its not selected or highlighted', async () => {
    render(
      <TableCell cellPiece={cellPieceType.user} />,
    );

    const tableCell = screen.getByTestId('table-cell');

    expect(tableCell).toBeInTheDocument();

    expect(tableCell).not.toHaveClass('bg-slate-600');
    expect(tableCell).not.toHaveClass('bg-slate-700');
    expect(tableCell).toHaveClass('bg-slate-900');
  });

  it('should have background color bg-slate-700 when its selected', async () => {
    render(
      <TableCell cellPiece={cellPieceType.user} selectedCell />,
    );

    const tableCell = screen.getByTestId('table-cell');

    expect(tableCell).toBeInTheDocument();

    expect(tableCell).not.toHaveClass('bg-slate-600');
    expect(tableCell).toHaveClass('bg-slate-700');
    expect(tableCell).not.toHaveClass('bg-slate-900');
  });

  it('should have background color bg-slate-600 when its highlighted', async () => {
    render(
      <TableCell cellPiece={cellPieceType.user} highlightedCell />,
    );

    const tableCell = screen.getByTestId('table-cell');

    expect(tableCell).toBeInTheDocument();

    expect(tableCell).toHaveClass('bg-slate-600');
    expect(tableCell).not.toHaveClass('bg-slate-700');
    expect(tableCell).not.toHaveClass('bg-slate-900');
  });
});

describe('Table cell click test', () => {
  it('should call onClick function with its cellId when component its clicked', async () => {
    const cellId = 0;
    const onClickFunction = jest.fn();

    render(
      <TableCell cellPiece={cellPieceType.user} cellId={cellId} onClick={onClickFunction} />,
    );

    const tableCell = screen.getByTestId('table-cell');

    fireEvent.click(tableCell);

    expect(onClickFunction).toBeCalledTimes(1);
    expect(onClickFunction).toBeCalledWith(cellId);
  });
});

describe('Table cell content test', () => {
  it('should contain cell piece', async () => {
    render(
      <TableCell cellPiece={cellPieceType.user} />,
    );

    const cellPiece = screen.getByTestId('cell-piece');

    expect(cellPiece).toBeInTheDocument();
  });
});
