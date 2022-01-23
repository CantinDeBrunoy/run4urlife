import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Game } from '../../core/global';
import { TabTypes } from '../../common/constant';
import Toggle from '../animations/interface-animation-toggle.component';
import InterfaceSettingsComponent from './interface-settings.component';
import TextRandomEffectComponent from '../animations/text-random-animation.component';

const InterfaceMenuComponent = (menu) => {
    const [open, setOpen] = useState(true);
    const [component, setComponent] = useState();

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
    return (
        <div>
            <Toggle visible={open}>
                <nav className="menu">
                    <ul>
                        <div>
                            <TextRandomEffectComponent text={`${Game.state ? 'Reprendre la partie' : 'Démarrer une partie'}`} />
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
