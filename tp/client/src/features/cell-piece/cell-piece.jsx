import React from 'react';
import { BsFillCircleFill, BsFillTriangleFill } from 'react-icons/bs';
import { cellPieceType, ROWS } from '../../shared/constants';

function CellPiece({ cellPiece }) {
  const size = (500 / ROWS) * 0.7;
  const cellPieces = {
    [cellPieceType.computer]: (
      <div data-testid="triangle-icon">
        <BsFillTriangleFill color="white" size={size} />
      </div>
    ),
    [cellPieceType.user]: (
      <div data-testid="circle-icon">
        <BsFillCircleFill color="white" size={size} />
      </div>
    ),
    [cellPieceType.blank]: <div data-testid="blank-space" />,
  };

  return (
    <div data-testid="cell-piece">
      {cellPieces[cellPiece]}
    </div>
  );
}

export default CellPiece;
