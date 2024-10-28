import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import { resetGame } from '../redux/slices/gameSlice';
import '../styles/ControlPanel.css';

const ControlPanel: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const minesLeft = useSelector((state: RootState) => state.game.mines - state.game.flagsUsed);
    const gameStatus = useSelector((state: RootState) => state.game.gameStatus);

    const handleNewGame = () => {
        dispatch(resetGame());
    };

    return (
        <div className="control-panel">
            <button onClick={handleNewGame} className="new-game-button">
                New Game
            </button>
            <div className="mines-left">
                Mines Left: {minesLeft}
            </div>
            <div className="game-status">
                {'Status: '}
                <span className={`${gameStatus === 'playing' ? 'playing' : gameStatus === 'won' ? 'won' : 'lost'}`}>
                    {gameStatus === 'playing' ? 'In Progress' : gameStatus === 'won' ? 'You Won!' : 'Game Over'}
                </span>
            </div>
        </div>
    );
};

export default ControlPanel;
