import React from 'react';
import BackgroundComponent from '../components/background.component';
import InterfaceMenuComponent from '../components/menu/interface-menu.component';
import { GameProvider } from '../store/game.store';

const MenuPage = () => {
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
