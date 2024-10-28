import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MinesPlacement from '../MinesPlacement';

describe('MinesPlacement Component', () => {
    const mockOnMinesPlaced = jest.fn();

    const width = 3;
    const height = 3;
    const initialMines = 2;

    beforeEach(() => {
        mockOnMinesPlaced.mockClear();
    });

    test('renders correctly with the given width, height, and initial mines', () => {
        render(<MinesPlacement width={width} height={height} initialMines={initialMines} onMinesPlaced={mockOnMinesPlaced} />);

        expect(screen.getByText(`Place Your Mines (${initialMines} left)`)).toBeInTheDocument();

        const cells = screen.getAllByRole('button');
        expect(cells).toHaveLength(width * height);
    });

    test('toggles mine placement on cell click and updates mine count', () => {
        render(<MinesPlacement width={width} height={height} initialMines={initialMines} onMinesPlaced={mockOnMinesPlaced} />);

        const cells = screen.getAllByRole('button');

        fireEvent.click(cells[0]);
        expect(cells[0].textContent).toBe('💣');
        expect(screen.getByText(`Place Your Mines (${initialMines - 1} left)`)).toBeInTheDocument();

        fireEvent.click(cells[0]);
        expect(cells[0].textContent).toBe('');
        expect(screen.getByText(`Place Your Mines (${initialMines} left)`)).toBeInTheDocument();
    });

    test('calls onMinesPlaced callback with the correct mine placements', () => {
        render(<MinesPlacement width={width} height={height} initialMines={initialMines} onMinesPlaced={mockOnMinesPlaced} />);

        const cells = screen.getAllByRole('button');

        fireEvent.click(cells[0]);
        fireEvent.click(cells[1]);

        expect(mockOnMinesPlaced).toHaveBeenCalledTimes(2);
        expect(mockOnMinesPlaced).toHaveBeenLastCalledWith([[1, 1, 0], [0, 0, 0], [0, 0, 0]]);
    });

    test('prevents placing more mines than allowed', () => {
        render(<MinesPlacement width={width} height={height} initialMines={initialMines} onMinesPlaced={mockOnMinesPlaced} />);

        const cells = screen.getAllByRole('button');

        fireEvent.click(cells[0]);
        fireEvent.click(cells[1]);

        fireEvent.click(cells[2]);

        expect(cells[2].textContent).toBe('');
        expect(screen.getByText(`Place Your Mines (0 left)`)).toBeInTheDocument();
    });
});
