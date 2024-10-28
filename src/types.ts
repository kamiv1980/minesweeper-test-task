export type Cell = {
    hasMine: boolean;
    isRevealed: boolean;
    isFlagged: boolean;
    adjacentMines: number;
};

export type GameState = {
    board: Cell[][];
    gameStatus: 'playing' | 'won' | 'lost';
    width: number,
    height: number,
    mines: number;
    flagsUsed: number;
    minesArray: (0 | 1)[][];
    level: 'easy'| 'medium'| 'hard'| null
};
