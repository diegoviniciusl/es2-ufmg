import React from 'react';
import { render, screen } from '@testing-library/react';
import CellPiece from '../../features/cell-piece/cell-piece';
import { cellPieceType } from '../../shared/constants';

describe('Cell piece rendering unit test', () => {
  it('should render triangle when cell piece is computer', async () => {
    render(
      <CellPiece cellPiece={cellPieceType.computer} />,
    );

    const triangleIcon = screen.getByTestId('triangle-icon');

    expect(triangleIcon).toBeInTheDocument();
  });

  it('should render circle when cell piece is user', async () => {
    render(
      <CellPiece cellPiece={cellPieceType.user} />,
    );

    const triangleIcon = screen.getByTestId('circle-icon');

    expect(triangleIcon).toBeInTheDocument();
  });

  it('should render blacnk space when cell piece is blank', async () => {
    render(
      <CellPiece cellPiece={cellPieceType.blank} />,
    );

    const triangleIcon = screen.getByTestId('blank-space');

    expect(triangleIcon).toBeInTheDocument();
  });
});
