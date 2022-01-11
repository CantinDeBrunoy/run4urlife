import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MenuPage from './pages/menu.page';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<MenuPage />} />
        </Routes>
    );
};

export default App;
