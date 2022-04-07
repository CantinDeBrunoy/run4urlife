import React from 'react';
import BackgroundComponent from '../components/background.component';
import GameComponent from '../components/game.component';
import { GameProvider } from '../store/game.store';
import InterfaceInventoryComponent from '../components/interface-inventory.component';
import InterfaceTimerComponent from '../components/interface-timer.component.js';
import InterfaceBackgroundScreenComponent from '../components/interface-background-screen.component';
import InterfaceGameOverComponent from '../components/interface-gameover.component';
import InterfaceSettingsButtonComponent from '../components/interface-settings-button.component';

const GamePage = () => {
    return (
        <div>
            <BackgroundComponent />
            <InterfaceTimerComponent />
            <GameProvider>
                <GameComponent />
                <InterfaceInventoryComponent />
                <InterfaceSettingsButtonComponent />
                <InterfaceBackgroundScreenComponent />
                <InterfaceGameOverComponent />
            </GameProvider>
        </div>
    );
};

export default GamePage;
