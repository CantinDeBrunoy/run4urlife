import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Game, GlobalTypes } from '../../core/global';
import { GameActions, TabTypes } from '../../common/constant';
import { useNavigate } from 'react-router-dom';
import Toggle from '../animations/interface-animation-toggle.component';
import InterfaceSettingsComponent from './interface-settings.component';
import TextRandomEffectComponent from '../animations/text-random-animation.component';
import { gameReset } from '../../core/game';
import { GameConsumerHook } from '../../store/game.store';

const InterfaceMenuComponent = (menu) => {
    const [GameStore, dispatch] = GameConsumerHook();
    const [open, setOpen] = useState(true);
    const [component, setComponent] = useState();

    const navigate = useNavigate();

    const toggle = (tab = '') => {
        switch (tab) {
            case TabTypes.Settings:
                setComponent(<InterfaceSettingsComponent toggle={toggle} />);
                break;
            default:
                break;
        }
        setOpen((open) => !open);
    };

    useEffect(() => {
        window.localStorage.setItem(
            'settings',
            JSON.stringify({ antialias: GameStore.antialias, precision: GameStore.precision, volume: GameStore.volume }),
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
                                if (!Game.state) navigate('/game');
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

InterfaceMenuComponent.propTypes = {
    isMain: PropTypes.bool,
};

export default InterfaceMenuComponent;
