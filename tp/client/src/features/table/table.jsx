import React, { useState, useEffect } from 'react';
import TableCell from '../table-cell/table-cell';
import TableService from './table-service';
import LearnerGameService from '../learner-game/learner-game-service';
import { cellPieceType, ROWS } from '../../shared/constants';

function Table({ gameId, makeMove, isMoveDisabled }) {
  const [cellsStates, setCellsStates] = useState(TableService.getInitialCellStatesFromGameId(gameId));
  const [fromCellId, setFromCellId] = useState(null);

  const tableGrid = TableService.getTableGrid(gameId);

  useEffect(() => {
    setCellsStates(TableService.getInitialCellStatesFromGameId(gameId));
  }, [gameId, setCellsStates]);

  const handleTableCellClick = async (cellId) => {
    if (isMoveDisabled) return;

    if (cellsStates[cellId].piece === cellPieceType.user) {
      const possibleCellIdMoves = LearnerGameService.getPossibleCellIdMoves(gameId, cellId);

      const newCellsStates = TableService.getInitialCellStatesFromGameId(gameId);
      newCellsStates[cellId].isSelected = true;

      possibleCellIdMoves.forEach((possibleCellIdMove) => {
        newCellsStates[possibleCellIdMove].isHighlighted = true;
      });

      setCellsStates(newCellsStates);
      setFromCellId(cellId);

      return;
    }

    if (fromCellId !== null) {
      const possibleCellIdMoves = LearnerGameService.getPossibleCellIdMoves(gameId, fromCellId);

      if (possibleCellIdMoves.includes(cellId)) {
        setFromCellId(null);
        await makeMove(fromCellId, cellId);
      }
    }
  };

  return (
    <div className="flex flex-col w-300 h-300 border-solid border-8 bg-slate-500 border-neutral-900">
      {tableGrid.map((piecesRow, row) => (
        <div className="flex flex-row w-full" style={{ height: `${100 / ROWS}%` }} key={piecesRow.concat([row])}>
          {piecesRow.map((piece, column) => {
            const cellId = TableService.getCellIdFromRowAndColumn(row, column);
            return (
              <div className="h-full flex justify-center items-center p-2" style={{ width: `${100 / ROWS}%` }} key={cellId}>
                <TableCell
                  cellPiece={piece}
                  cellId={cellId}
                  selectedCell={cellsStates[cellId].isSelected}
                  highlightedCell={cellsStates[cellId].isHighlighted}
                  onClick={handleTableCellClick}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Table;
