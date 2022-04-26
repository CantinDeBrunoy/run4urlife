import React, { useEffect } from 'react';
import { BackgroundElements } from '../3d/global.3d';
import BackgroundComponent from '../components/background.component';
import InterfaceMenuComponent from '../components/menu/interface-menu.component';
import { GameProvider } from '../store/game.store';

const MenuPage = () => {
    useEffect(() => {
        const game = document.getElementById('game');
        game && game.remove();
        BackgroundElements.reset();
    }, []);
    return (
        <div>
            <BackgroundComponent />
            <GameProvider>
                <InterfaceMenuComponent />
            </GameProvider>
        </div>
    );
};

export default MenuPage;
