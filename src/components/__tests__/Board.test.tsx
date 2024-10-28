import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
// @ts-ignore
import configureStore from 'redux-mock-store';
import Board from '../Board';
import { Store, UnknownAction } from '@reduxjs/toolkit';

const mockStore = configureStore([]);

describe('Board Component', () => {
    let store: Store<unknown, UnknownAction, unknown>;

    beforeEach(() => {
        store = mockStore({
            game: {
                board: [
                    [
                        { isRevealed: false, isFlagged: false, hasMine: false, adjacentMines: 0 },
                        { isRevealed: false, isFlagged: false, hasMine: false, adjacentMines: 1 },
                    ],
                    [
                        { isRevealed: false, isFlagged: false, hasMine: true, adjacentMines: 1 },
                        { isRevealed: true, isFlagged: false, hasMine: false, adjacentMines: 0 },
                    ],
                ],
            },
        });
    });

    test('renders the board with the correct number of rows and cells', () => {
        render(
            <Provider store={store}>
                <Board />
            </Provider>
        );

        const cells = screen.getAllByTestId(/cell-\d+-\d+/);
        expect(cells.length).toBe(4);
    });

    test('renders each cell correctly based on its state', () => {
        render(
            <Provider store={store}>
                <Board />
            </Provider>
        );

        const cell00 = screen.getByTestId('cell-0-0');
        expect(cell00).toBeInTheDocument();
        expect(cell00).not.toHaveClass('revealed');
        expect(cell00).not.toHaveTextContent('💣');

        const cell01 = screen.getByTestId('cell-0-1');
        expect(cell01).toBeInTheDocument();
        expect(cell01).not.toHaveClass('revealed');
        expect(cell01).toHaveTextContent('');

        const cell10 = screen.getByTestId('cell-1-0');
        expect(cell10).toBeInTheDocument();
        expect(cell10).toHaveClass('cell');
        expect(cell10).toHaveTextContent('');

        const cell11 = screen.getByTestId('cell-1-1');
        expect(cell11).toBeInTheDocument();
        expect(cell11).toHaveClass('revealed');
        expect(cell11).not.toHaveTextContent('💣');
    });
});
