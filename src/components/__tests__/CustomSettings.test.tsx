import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import CustomSettings from '../CustomSettings';
import {store} from '../../redux/store';

describe('CustomSettings component', () => {
    test('renders input fields and buttons', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <CustomSettings />
                </MemoryRouter>
            </Provider>
        );
        expect(screen.getByPlaceholderText(/Width/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Height/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Mines/i)).toBeInTheDocument();
    });

    test('shows alert when the number of mines exceeds total cells', () => {

        window.alert = jest.fn();

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <CustomSettings />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.change(screen.getByPlaceholderText(/Width/i), { target: { value: 5 } });
        fireEvent.change(screen.getByPlaceholderText(/Height/i), { target: { value: 5 } });
        fireEvent.change(screen.getByPlaceholderText(/Mines/i), { target: { value: 30 } });

        fireEvent.click(screen.getByText(/Save settings/i));

        expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/Number of mines must be less than the total number of cells!/i));
    });
});

