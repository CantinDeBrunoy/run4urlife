import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GameComponent from './components/game.component';
import MenuPage from './pages/menu.page';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<MenuPage />} />
            <Route path="/game" element={<GameComponent />} />
        </Routes>
    );
};

export default App;
