import React from 'react';
import { BsFillCircleFill, BsFillTriangleFill } from 'react-icons/bs';
import { cellPieceType } from '../../shared/constants';

function CellPiece({ cellPiece }) {
  const cellPieces = {
    [cellPieceType.computer]: (
      <BsFillTriangleFill color="white" size="70px" />
    ),
    [cellPieceType.user]: (
      <BsFillCircleFill color="white" size="70px" />
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
