import React, { useEffect, useState } from 'react';
import { TabTypes } from '../../common/constant';
import Toggle from '../animations/interface-animation-toggle.component';
import InterfaceSettingsComponent from './interface-settings.component';
import InterfacedifficultyComponent from './interface-difficulty.component';
import TextRandomEffectComponent from '../animations/text-random-animation.component';
import { gameReset } from '../../core/game';
import { GameConsumerHook } from '../../store/game.store';
import { renderZoomIn } from '../../3d/background-scene.3d';

const InterfaceMenuComponent = () => {
    const [GameStore, dispatch] = GameConsumerHook();
    const [open, setOpen] = useState(true);
    const [component, setComponent] = useState();

    const toggle = (tab = '') => {
        switch (tab) {
            case TabTypes.Settings:
                setComponent(<InterfaceSettingsComponent toggle={toggle} />);
                break;
            case TabTypes.difficulty:
                setComponent(<InterfacedifficultyComponent toggle={toggle} />);
                break;
            default:
                break;
        }
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
        if (window.location.pathname === '/') gameReset();
    }, []);
    return (
        <div>
            <Toggle visible={open}>
                <nav className="menu">
                    <ul>
                        <div
                            onClick={() => {
                                toggle(TabTypes.difficulty);
                                renderZoomIn();
                            }}
                        >
                            <TextRandomEffectComponent text={`${window.location.pathname === '/' ? 'Démarrer une partie' : 'Reprendre la partie'}`} />
                        </div>
                        <div>
                            <TextRandomEffectComponent text="Tableau des scores" />
                        </div>
                        <div onClick={() => toggle(TabTypes.Settings)}>
                            <TextRandomEffectComponent text="Paramètres" />
                        </div>
                        <div>
                            <TextRandomEffectComponent text="Aides" />
                        </div>
                        <div>
                            <TextRandomEffectComponent text="Crédits" />
                        </div>
                        <div>
                            <TextRandomEffectComponent text="Quitter" />
                        </div>
                    </ul>
                </nav>
            </Toggle>
            <Toggle visible={!open}>{component}</Toggle>
        </div>
    );
};

export default InterfaceMenuComponent;
