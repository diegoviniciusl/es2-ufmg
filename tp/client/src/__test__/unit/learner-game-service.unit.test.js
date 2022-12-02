import { cellPieceType } from '../../shared/constants';
import LearnerGameService from '../../features/learner-game/learner-game-service';

describe('Learner game service unit test', () => {
  it('should return corrent initial game id', async () => {
    const gameId = '222000111';

    expect(LearnerGameService.getInitialGame()).toEqual(gameId);
  });

  it('should make move and update game id', async () => {
    const initialGameId = '222000111';
    const gameIdAfterMove = '222010101';

    const fromCellId = 7;
    const toCellId = 4;

    expect(LearnerGameService.getNewGameFromMove(initialGameId, fromCellId, toCellId)).toEqual(gameIdAfterMove);
  });

  it('should return that player wins if user is in the end of the board', async () => {
    const gameId = '221002011';

    expect(LearnerGameService.didPlayerWin(gameId, cellPieceType.user)).toBe(true);
  });

  it('should return that player wins if there are only user tables at the board', async () => {
    const gameId = '001001001';

    expect(LearnerGameService.didPlayerWin(gameId, cellPieceType.user)).toBe(true);
  });

  it('should return that player wins if there are no more movements from the computer', async () => {
    const gameId = '200100000';

    expect(LearnerGameService.didPlayerWin(gameId, cellPieceType.user)).toBe(true);
  });

  it('should return false that player wins if user is not in the end of the board, and there are possible computer moves', async () => {
    const gameId = '222000111';

    expect(LearnerGameService.didPlayerWin(gameId, cellPieceType.user)).toBe(false);
  });
});
