import React from 'react';
import { BsFillCircleFill, BsFillTriangleFill } from 'react-icons/bs';
import { cellPieceType, ROWS } from '../../shared/constants';

function CellPiece({ cellPiece }) {
  const size = (500 / ROWS) * 0.7;
  const cellPieces = {
    [cellPieceType.computer]: (
      <BsFillTriangleFill color="white" size={size} />
    ),
    [cellPieceType.user]: (
      <BsFillCircleFill color="white" size={size} />
    ),
    [cellPieceType.blank]: null,
  };

  return (
    <div>
      {cellPieces[cellPiece]}
    </div>
  );
}

export default CellPiece;
