import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import {store} from './redux/store'

describe('App Component', () => {
    test('renders Navbar', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        // Check if Navbar is rendered
        expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    test('renders Game page by default ("/" route)', () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        // Verify that the Game component renders by checking for unique content on the Game page
        expect(screen.getByText(/Status:/i)).toBeInTheDocument();
    });

    test('navigates to Editor page when "/editor" route is accessed', () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/editor']}>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        // Verify that the Editor component renders by checking for unique content on the Editor page
        expect(screen.getByText(/Editor/i)).toBeInTheDocument();
    });
});
