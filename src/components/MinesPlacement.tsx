import React, { useEffect, useState } from 'react';
import '../styles/MinesPlacement.css'

interface MinesPlacementProps {
    width: number;
    height: number;
    initialMines: number;
    onMinesPlaced: (minesArray: (0 | 1)[][]) => void;
}

const MinesPlacement: React.FC<MinesPlacementProps> = ({ width, height, initialMines, onMinesPlaced }) => {
    const [minesArray, setMinesArray] = useState<(0 | 1)[][]>([]);
    const [minesCount, setMinesCount] = useState(initialMines);

    useEffect(() => {
        const arr = Array.from({ length: height }, () => Array(width).fill(0));
        setMinesArray(arr);
        setMinesCount(initialMines);
    }, [width, height, initialMines]);

    const toggleMine = (row: number, col: number) => {
        if (minesArray[row][col] === 1) {
            minesArray[row][col] = 0;
            setMinesCount(minesCount + 1);
        } else if (minesCount > 0) {
            minesArray[row][col] = 1;
            setMinesCount(minesCount - 1);
        }
        setMinesArray([...minesArray]);
        onMinesPlaced(minesArray);
    };

    return (
        <div>
            <h3>Place Your Mines ({minesCount} left)</h3>
            <div
                className="mines-grid"
                style={{gridTemplateColumns: `repeat(${width}, 1fr)`,}}
            >
                {minesArray.map((row, rowIndex) => (
                    <div key={rowIndex} className="mine-row">
                        {row.map((cell, colIndex) => (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                onClick={() => toggleMine(rowIndex, colIndex)}
                                className="mine-cell"
                                role="button"
                                style={{backgroundColor: cell === 1 ? 'red' : 'white'}}
                            >
                                {cell === 1 ? '💣' : ''}
                            </div>))}
                    </div>
                ))}

            </div>
        </div>
    );
};

export default MinesPlacement;
