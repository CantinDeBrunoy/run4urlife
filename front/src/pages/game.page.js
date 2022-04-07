import React from 'react';
import BackgroundComponent from '../components/background.component';

import GameComponent from '../components/game.component';
import { GameProvider } from '../store/game.store';
import InterfaceInventoryComponent from '../components/interface-inventory.component';
import InterfaceTimerComponent from '../components/interface-timer.component';

const GamePage = () => {
    return (
        <div>
            <BackgroundComponent />
            <InterfaceTimerComponent />
            <GameProvider>
                <GameComponent />
                <InterfaceInventoryComponent />
            </GameProvider>
        </div>
    );
};

export default GamePage;
