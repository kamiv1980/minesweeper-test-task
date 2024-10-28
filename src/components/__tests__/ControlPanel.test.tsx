import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
// @ts-ignore
import configureStore from 'redux-mock-store';
import ControlPanel from '../ControlPanel';
import { resetGame } from '../../redux/slices/gameSlice';
import { Store, UnknownAction } from '@reduxjs/toolkit';

const mockStore = configureStore([]);

describe('ControlPanel Component', () => {
    let store: Store<unknown, UnknownAction, unknown>;

    beforeEach(() => {
        store = mockStore({
            game: {
                mines: 10,
                flagsUsed: 2,
                gameStatus: 'playing',
            },
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders ControlPanel correctly', () => {
        render(
            <Provider store={store}>
                <ControlPanel />
            </Provider>
        );

        expect(screen.getByText(/New Game/i)).toBeInTheDocument();
        expect(screen.getByText(/Mines Left: 8/i)).toBeInTheDocument();
        expect(screen.getByText(/In Progress/i)).toBeInTheDocument();
    });

    test('dispatches resetGame action on button click', () => {
        render(
            <Provider store={store}>
                <ControlPanel />
            </Provider>
        );

        fireEvent.click(screen.getByText(/New Game/i));

        // @ts-ignore
        const actions = store.getActions();
        expect(actions).toEqual([{ type: resetGame.type }]);
    });

    test('displays game status correctly based on state', () => {
        store = mockStore({
            game: {
                mines: 10,
                flagsUsed: 2,
                gameStatus: 'won',
            },
        });

        render(
            <Provider store={store}>
                <ControlPanel />
            </Provider>
        );

        expect(screen.getByText(/You Won!/i)).toBeInTheDocument();

        store = mockStore({
            game: {
                mines: 10,
                flagsUsed: 2,
                gameStatus: 'lost',
            },
        });

        render(
            <Provider store={store}>
                <ControlPanel />
            </Provider>
        );

        expect(screen.getByText(/Game Over/i)).toBeInTheDocument();
    });
});
