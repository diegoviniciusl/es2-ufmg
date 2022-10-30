import React from 'react';
import CellPiece from '../cell-piece/cell-piece';

function TableCell({
  cellPiece, cellId, selectedCell, highlightedCell, onClick,
}) {
  let backgroundColor = 'bg-slate-900';

  if (selectedCell) backgroundColor = 'bg-slate-700';
  if (highlightedCell) backgroundColor = 'bg-slate-600';

  return (
    <div
      onClick={() => onClick(cellId)}
      className={`flex justify-center items-center border-solid w-full h-full ${backgroundColor} cursor-pointer`}
    >
      <CellPiece cellPiece={cellPiece} />
    </div>
  );
}

export default TableCell;
