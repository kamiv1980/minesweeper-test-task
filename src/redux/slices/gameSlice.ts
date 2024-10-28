import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState } from '../../types';
import { generateBoard, revealCell as revealCellLogic, toggleFlag as toggleFlagLogic } from '../../features/gameLogic';

export const initialState: GameState = {
    board: generateBoard(10, 10, 10, []),  // Default 10x10 board with 10 mines
    gameStatus: 'playing',
    width: 10,
    height: 10,
    mines: 10,
    flagsUsed: 0,
    minesArray: [],
    level: 'easy',
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        revealCell: (state, action: PayloadAction<{ row: number; col: number }>) => {
            // Delegate cell reveal logic
            revealCellLogic(state, action.payload);
        },
        toggleFlag: (state, action: PayloadAction<{ row: number; col: number }>) => {
            // Delegate flag toggle logic
            toggleFlagLogic(state, action.payload);
        },
        resetGame: (state) => {
            // Reset the game board and status with specified dimensions and mine count
            state.board = generateBoard(state.width, state.height, state.mines, state.minesArray);
            state.gameStatus = 'playing';
            state.flagsUsed = 0;
        },
        setParams: (state, action: PayloadAction<{ width: number; height: number; mines: number; minesArray: (0 | 1)[][] }>) => {
            // Set new dimensions and mine count
            state.board = generateBoard(action.payload.width, action.payload.height, action.payload.mines, action.payload.minesArray);
            state.gameStatus = 'playing';
            state.level = null;
            state.mines = action.payload.mines;
            state.width = action.payload.width;
            state.height = action.payload.height;
            state.flagsUsed = 0;
            state.minesArray = action.payload.minesArray; // Update minesArray
        },
        setLevel: (state, action: PayloadAction<{ level: 'easy'| 'medium'| 'hard' }>) => {
            // Set level
            const level = action.payload.level;
            state.level = level;
            state.minesArray = [];
            state.gameStatus = 'playing';
            state.flagsUsed = 0;

            if (level === 'easy'){
                state.mines = 10;
                state.width = 10;
                state.height = 10;
            }
            if (level === 'medium'){
                state.mines = 40;
                state.width = 16;
                state.height = 16;
            }
            if (level === 'hard'){
                state.mines = 99;
                state.width = 24;
                state.height = 24;
            }
            state.board = generateBoard(state.width, state.height, state.mines, state.minesArray);
        },
    },
});

export const { revealCell, toggleFlag, resetGame, setParams, setLevel } = gameSlice.actions;
export default gameSlice.reducer;

export const getLevel = (state: { game: { level: any; }; }) => state.game.level
