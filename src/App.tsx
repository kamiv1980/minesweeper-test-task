import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Game from './pages/Game';
import Editor from './pages/Editor';
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
      <>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/editor" element={<Editor />} />
        </Routes>
      </>
  );
};

export default App;
