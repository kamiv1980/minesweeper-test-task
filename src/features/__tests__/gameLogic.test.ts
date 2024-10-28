import { generateBoard, countMines } from '../gameLogic';

describe('Game Logic', () => {
    it('should generate a board with correct dimensions', () => {
        const board = generateBoard(5, 5, 3, []);
        expect(board.length).toBe(5);
        expect(board[0].length).toBe(5);
    });

    it('should count the correct number of mines', () => {
        const mineArray: (0 | 1)[][] = [
            [0, 1],
            [1, 0],
        ];
        const mineCount = countMines(mineArray);
        expect(mineCount).toBe(2);
    });

    it('should handle custom mine placements', () => {
        const customMines: (0 | 1)[][] = [
            [0, 1, 0],
            [0, 0, 0],
            [1, 0, 1],
        ];
        const board = generateBoard(3, 3, 0, customMines);
        expect(board[0][1].hasMine).toBe(true);
        expect(board[2][2].hasMine).toBe(true);
    });
});
