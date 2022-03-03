import React from 'react';
import BackgroundComponent from '../components/background.component';

import GameComponent from '../components/game.component';
import InterfaceInventoryComponent from '../components/interface-inventory.component';

const GamePage = () => {
    return (
        <div>
            <BackgroundComponent />
            <GameComponent />
            <InterfaceInventoryComponent />
        </div>
    );
};

export default GamePage;
