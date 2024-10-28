import React from 'react';
import LevelSelector from '../components/LevelSelector';
import CustomSettings from '../components/CustomSettings';

const Editor: React.FC = () => {
    return (
        <div>
            <LevelSelector />
            <CustomSettings />
        </div>
    );
};

export default Editor;
