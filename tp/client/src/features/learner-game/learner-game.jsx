import React, { useState } from 'react';
import Table from '../table/table';
import LearnerGameService from './learner-game-service';
import { cellPieceType, players, ROWS } from '../../shared/constants';

function LearnerGame() {
  const [gameId, setGameId] = useState(LearnerGameService.getInitialGame());
  const [isMoveDisabled, setIsMoveDisabled] = useState(false);
  const [winner, setWinner] = useState(null);
  const [games, setGames] = useState({});

  const handleMakeMove = async (fromCellId, toCellId) => {
    setIsMoveDisabled(true);

    const gameIdAfterPlayerMove = LearnerGameService.getNewGameFromMove(gameId, fromCellId, toCellId);
    setGameId(gameIdAfterPlayerMove);
    if (LearnerGameService.didPlayerWin(gameIdAfterPlayerMove, cellPieceType.user)) {
      setWinner(players.user);
      await LearnerGameService.makeComputerLearn({ won: false, games });
      return;
    }

    const gameIdAfterComputerMove = await LearnerGameService.getGameAfterComputerMove(gameIdAfterPlayerMove);
    await (new Promise((resolve) => setTimeout(resolve, 500)));
    if (gameIdAfterComputerMove?.length !== (ROWS * ROWS)) return;
    setGameId(gameIdAfterComputerMove);

    setGames({
      ...games,
      [gameIdAfterPlayerMove]: gameIdAfterComputerMove,
    });

    if (LearnerGameService.didPlayerWin(gameIdAfterComputerMove, cellPieceType.computer)) {
      setWinner(players.computer);
      await LearnerGameService.makeComputerLearn({ won: true, games });
      return;
    }

    setIsMoveDisabled(false);
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-slate-300 relative">
      <div className="display-flex justify-center absolute top-25">
        {winner && (
          <h1 className="text-5xl">
            {winner === players.user ? 'User ' : 'Computer '}
            won
          </h1>
        )}
      </div>
      <Table gameId={gameId} makeMove={handleMakeMove} isMoveDisabled={isMoveDisabled} />
    </div>
  );
}

export default LearnerGame;
