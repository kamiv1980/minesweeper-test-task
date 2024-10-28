import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setParams } from '../redux/slices/gameSlice';
import MinesPlacement from './MinesPlacement';
import { countMines } from "../features/gameLogic";
import '../styles/CustomSettings.css'

const CustomSettings: React.FC = () => {
    const dispatch = useDispatch();

    const [width, setWidth] = useState<number>(10);
    const [height, setHeight] = useState<number>(10);
    const [mines, setMines] = useState<number>(10);
    const [minesArray, setMinesArray] = useState<(0 | 1)[][]>([]); // Holds the mine placements

    const saveParameters = () => {
        if (mines >= width * height) {
            alert("Number of mines must be less than the total number of cells!");
            return;
        }

        const placedMines = countMines(minesArray);
        if (placedMines !== mines) {
            alert(`Please place exactly ${mines} mines. Currently placed: ${placedMines}`);
            return;
        }
        alert('The field parameters have been changed!');
        dispatch(setParams({ width, height, mines, minesArray }));
    };

    const handleMinesPlaced = (minesArray: (0 | 1)[][]) => {
        setMinesArray(minesArray);
    };

    return (
        <div className="settings-container">
            <h2>Custom Settings</h2>
            <div className="input-section">
                <label>
                    Width
                    <input
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(Number(e.target.value))}
                        placeholder="Width"
                        min={5}
                        max={24}
                    />
                </label>
                <label>
                    Height
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(Number(e.target.value))}
                        placeholder="Height"
                        min={5}
                        max={24}
                    />
                </label>
                <label>
                    Mines
                    <input
                        type="number"
                        value={mines}
                        onChange={(e) => setMines(Number(e.target.value))}
                        placeholder="Mines"
                        min={5}
                        max={99}
                    />
                </label>
            </div>

            <MinesPlacement width={width} height={height} initialMines={mines} onMinesPlaced={handleMinesPlaced} />
            <button onClick={saveParameters} className="save-button">Save settings</button>

        </div>
    );
};

export default CustomSettings;
