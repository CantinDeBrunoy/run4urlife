import React from 'react';
import BackgroundComponent from '../components/background.component';

import GameComponent from '../components/game.component';
import { GameProvider } from '../store/game.store';

const GamePage = () => {
    return (
        <div>
            <BackgroundComponent />
            <GameProvider>
                <GameComponent />
            </GameProvider>
        </div>
    );
};

export default GamePage;
