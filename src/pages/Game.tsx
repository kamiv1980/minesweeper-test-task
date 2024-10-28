import React from 'react';
import Board from '../components/Board';
import ControlPanel from '../components/ControlPanel';

const Game: React.FC = () => {
    return (
        <div>
            <ControlPanel />
            <Board />
        </div>
    );
};

export default Game;
