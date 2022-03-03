import React from 'react';
import BackgroundComponent from '../components/background.component';

import GameComponent from '../components/game.component';
import { GameProvider } from '../store/game.store';
import InterfaceInventoryComponent from '../components/interface-inventory.component';

const GamePage = () => {
    return (
        <div>
            <BackgroundComponent />
            <GameProvider>
                <GameComponent />
            </GameProvider>
            <InterfaceInventoryComponent />
        </div>
    );
};

export default GamePage;
