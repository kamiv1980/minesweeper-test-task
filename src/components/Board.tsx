import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Cell from './Cell';
import '../styles/Board.css'

const Board: React.FC = () => {
    const board = useSelector((state: RootState) => state.game.board);

    return (
        <div className="wrapper">
            <div className="board">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((cell, colIndex) => (
                            <Cell key={colIndex} cell={cell} row={rowIndex} col={colIndex} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Board;
