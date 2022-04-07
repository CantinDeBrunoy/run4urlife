import React, { useState, useEffect } from 'react';
import gear from '../assets/img/gear.svg';
import InterfaceSettingsComponent from './menu/interface-settings.component';
import Toggle from './animations/interface-animation-toggle.component';
import { GameConsumerHook } from '../store/game.store';
import { GameActions } from '../common/constant';
import { GlobalTypes } from '../core/global';

const InterfaceSettingsButtonComponent = () => {
    const [GameStore, dispatch] = GameConsumerHook();

    const toggle = () => {
        if (GameStore.isSettingsActive) {
            dispatch({ type: GameActions.closeSettings });
        } else {
            dispatch({ type: GameActions.openSettings });
        }
    };

    useEffect(() => {
        window.localStorage.setItem(
            'settings',
            JSON.stringify({
                antialias: GameStore.antialias,
                precision: GameStore.precision,
                volume: GameStore.volume,
                difficulty: GameStore.difficulty,
            }),
        );
    }, [GameStore]);

    if (GameStore.gameState !== GlobalTypes.states.finished) {
        return (
            <div>
                <Toggle visible={!GameStore.isSettingsActive}>
                    <div className="settingsButton" onClick={toggle}>
                        <img src={gear} className="settingsButtonImg" />
                    </div>
                </Toggle>
                <div>
                    <Toggle visible={GameStore.isSettingsActive}>
                        <InterfaceSettingsComponent toggle={toggle} />
                    </Toggle>
                </div>
            </div>
        );
    }
    return null;
};

export default InterfaceSettingsButtonComponent;
