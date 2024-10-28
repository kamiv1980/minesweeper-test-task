import { Cell, GameState } from '../types';

export function generateBoard(
    width: number,
    height: number,
    mines: number,
    minesArray: (0 | 1)[][]
): Cell[][] {
    // Step 1: Initialize an empty board
    const board: Cell[][] = Array.from({ length: height }, () =>
        Array.from({ length: width }, () => ({
            hasMine: false,
            isRevealed: false,
            isFlagged: false,
            adjacentMines: 0,
        }))
    );

    // Step 2: Place mines based on the minesArray if it is provided
    if (minesArray.length > 0) {
        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                if (minesArray[row][col] === 1) {
                    board[row][col].hasMine = true;
                }
            }
        }
    } else {
        // If minesArray is empty, place mines randomly
        let placedMines = 0;
        while (placedMines < mines) {
            const row = Math.floor(Math.random() * height);
            const col = Math.floor(Math.random() * width);

            // Only place mine if there isn't one already
            if (!board[row][col].hasMine) {
                board[row][col].hasMine = true;
                placedMines++;
            }
        }
    }

    // Step 3: Calculate adjacent mines count for each cell
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            if (!board[row][col].hasMine) {
                board[row][col].adjacentMines = countAdjacentMines(board, row, col);
            }
        }
    }

    return board;
}

function countAdjacentMines(board: Cell[][], row: number, col: number): number {
    const directions = [
        { row: -1, col: -1 }, { row: -1, col: 0 }, { row: -1, col: 1 },
        { row: 0, col: -1 },                     { row: 0, col: 1 },
        { row: 1, col: -1 }, { row: 1, col: 0 }, { row: 1, col: 1 },
    ];

    let count = 0;

    for (const direction of directions) {
        const newRow = row + direction.row;
        const newCol = col + direction.col;

        if (newRow >= 0 && newRow < board.length && newCol >= 0 && newCol < board[0].length) {
            if (board[newRow][newCol].hasMine) {
                count++;
            }
        }
    }

    return count;
}

export function revealCell(state: GameState, { row, col }: { row: number; col: number }) {
    if (state.gameStatus !== 'playing') return;

    const cell = state.board[row][col];

    // Check if the cell is already revealed or flagged
    if (cell.isRevealed || cell.isFlagged) {
        return;
    }

    // If the cell has a mine, end the game and reveal all cells
    if (cell.hasMine) {
        gameOver(state);
        return;
    }

    // Reveal the cell
    cell.isRevealed = true;
    checkForWin(state); // Check if the player has won

    // If the cell has adjacent mines, don't reveal further
    if (cell.adjacentMines > 0) {
        return;
    }

    // Directions for revealing adjacent cells
    const directions = [
        { row: -1, col: -1 }, { row: -1, col: 0 }, { row: -1, col: 1 },
        { row: 0, col: -1 },                     { row: 0, col: 1 },
        { row: 1, col: -1 }, { row: 1, col: 0 }, { row: 1, col: 1 },
    ];

    // Recursively reveal all adjacent cells if there are no adjacent mines
    for (const direction of directions) {
        const newRow = row + direction.row;
        const newCol = col + direction.col;

        // Check if the new position is within bounds
        if (newRow >= 0 && newRow < state.board.length && newCol >= 0 && newCol < state.board[0].length) {
            revealCell(state, { row: newRow, col: newCol });
        }
    }
}

// Function to handle game over logic
function gameOver(state: GameState) {
    // Reveal all cells
    for (let row of state.board) {
        for (let cell of row) {
            cell.isRevealed = true;
        }
    }
    state.gameStatus = 'lost';
}

// Function to check for win logic
function checkForWin(state: GameState) {
    // Check if all non-mine cells are revealed
    const allCellsRevealed = state.board.every(row =>
        row.every(cell => cell.hasMine || cell.isRevealed)
    );

    if (allCellsRevealed) {
        state.gameStatus = 'won';
    }
}

export function toggleFlag(state: GameState, { row, col }: { row: number; col: number }) {
    const cell = state.board[row][col];
    if (!cell.isRevealed) {
        cell.isFlagged = !cell.isFlagged;
        state.flagsUsed += cell.isFlagged ? 1 : -1;
    }
}

export const countMines = (array: (0 | 1)[][]): number => {
    return array.reduce((total, row) => total + row.filter(cell => cell === 1).length, 0);
};
