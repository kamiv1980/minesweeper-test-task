import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
// @ts-ignore
import configureStore from 'redux-mock-store';
import LevelSelector from '../LevelSelector';
import { setLevel } from '../../redux/slices/gameSlice';

const mockStore = configureStore([]);

describe('LevelSelector Component', () => {
    let store: any;

    beforeEach(() => {
        store = mockStore({
            game: {
                level: 'easy',
            },
        });
    });

    test('renders level buttons', () => {
        render(
            <Provider store={store}>
                <LevelSelector />
            </Provider>
        );

        expect(screen.getByText(/Select Level/i)).toBeInTheDocument();
        expect(screen.getByText(/easy/i)).toBeInTheDocument();
        expect(screen.getByText(/medium/i)).toBeInTheDocument();
        expect(screen.getByText(/hard/i)).toBeInTheDocument();
    });

    test('dispatches setLevel action on button click', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch');

        render(
            <Provider store={store}>
                <LevelSelector />
            </Provider>
        );

        fireEvent.click(screen.getByText(/medium/i));

        expect(dispatchSpy).toHaveBeenCalledWith(setLevel({ level: 'medium' }));
    });

    test('highlights the active level button', () => {
        render(
            <Provider store={store}>
                <LevelSelector />
            </Provider>
        );

        expect(screen.getByText(/easy/i)).toHaveClass('level-active');
        expect(screen.getByText(/medium/i)).not.toHaveClass('level-active');
        expect(screen.getByText(/hard/i)).not.toHaveClass('level-active');
    });

    test('updates active level when changed', () => {
        store = mockStore({
            game: {
                level: 'medium',
            },
        });

        render(
            <Provider store={store}>
                <LevelSelector />
            </Provider>
        );

        expect(screen.getByText(/medium/i)).toHaveClass('level-active');
        expect(screen.getByText(/easy/i)).not.toHaveClass('level-active');
        expect(screen.getByText(/hard/i)).not.toHaveClass('level-active');
    });
});
