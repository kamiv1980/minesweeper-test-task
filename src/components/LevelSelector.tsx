import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getLevel, setLevel} from '../redux/slices/gameSlice';
import '../styles/LevelSelector.css';

const levels = ['easy', 'medium', 'hard'];

const LevelSelector: React.FC = () => {
    const dispatch = useDispatch();
    const currentLevel = useSelector(getLevel)

    const handleLevelChange = (level: any) => {
        dispatch(setLevel({level}));
    };

    return (
        <div className="level-selector">
            <h2>Select Level</h2>
            <div className="level-options">
                {levels.map((level) => (
                    <button
                        key={level}
                        onClick={() => handleLevelChange(level)}
                        className={`level-button ${currentLevel === level ? "level-active" : ""}`}
                    >
                        {level}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LevelSelector;
