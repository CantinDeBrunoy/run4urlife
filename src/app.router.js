import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GamePage from './pages/game.page';
import MenuPage from './pages/menu.page';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<MenuPage />} />
            <Route path="/game" element={<GamePage />} />
        </Routes>
    );
};

export default App;
