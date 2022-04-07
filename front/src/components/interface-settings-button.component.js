import React, { useState, useEffect } from 'react';
import gear from '../assets/img/gear.svg';
import InterfaceSettingsComponent from './menu/interface-settings.component';
import Toggle from './animations/interface-animation-toggle.component';
import { GameConsumerHook } from '../store/game.store';
import { GameActions } from '../common/constant';
import { Game, GlobalTypes } from '../core/global';

const InterfaceSettingsButtonComponent = () => {
    const [GameStore, dispatch] = GameConsumerHook();
    const [component, setComponent] = useState();
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setComponent(<InterfaceSettingsComponent toggle={toggle} />);
        setOpen((open) => !open);
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

    useEffect(() => {
        if (open) {
            dispatch({ type: GameActions.pause });
        } else if (Game.timer.value) {
            dispatch({ type: GameActions.play });
        } else {
            dispatch({ type: GameActions.init });
        }
    }, [open]);

    if (GameStore.gameState !== GlobalTypes.states.finished) {
        return (
            <div>
                <Toggle visible={!open}>
                    <div className="settingsButton" onClick={toggle}>
                        <img src={gear} className="settingsButtonImg" />
                    </div>
                </Toggle>
                <div>
                    <Toggle visible={open}>{component}</Toggle>
                </div>
            </div>
        );
    }
    return null;
};

export default InterfaceSettingsButtonComponent;
