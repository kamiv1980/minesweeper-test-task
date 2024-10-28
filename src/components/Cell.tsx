import React from 'react';
import { useDispatch } from 'react-redux';
import { revealCell, toggleFlag } from '../redux/slices/gameSlice';
import { Cell as CellType } from '../types';
import '../styles/Cell.css';

type CellProps = {
    cell: CellType;
    row: number;
    col: number;
};

const Cell: React.FC<CellProps> = ({ cell, row, col }) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        if (!cell.isRevealed && !cell.isFlagged) {
            dispatch(revealCell({ row, col }));
        }
    };

    const handleRightClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!cell.isRevealed) {
            dispatch(toggleFlag({ row, col }));
        }
    };

    return (
        <div
            className={`cell ${cell.isRevealed ? 'revealed' : ''} ${cell.isFlagged ? 'flagged' : ''}`}
            onClick={handleClick}
            onContextMenu={handleRightClick}
            data-mines={cell.isRevealed && cell.adjacentMines > 0 ? cell.adjacentMines : undefined}
            data-testid={`cell-${row}-${col}`}
        >
            {cell.isRevealed
                ? (cell.hasMine ? '💣' : cell.adjacentMines || '')
                : (cell.isFlagged ? '🏴' : '')
            }
        </div>
    );
};

export default Cell;
