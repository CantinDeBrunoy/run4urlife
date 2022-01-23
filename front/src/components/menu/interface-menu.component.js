import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TabTypes } from '../../common/constant';
import Toggle from '../animations/interface-animation-toggle.component';
import InterfaceSettingsComponent from './interface-settings.component';

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

    if (menu.isMain) {
        return (
            <div>
                <Toggle visible={open}>
                    <nav className="menu">
                        <ul>
                            <li>Démarrer une partie</li>
                            <li>Tableau des scores</li>
                            <li onClick={() => toggle(TabTypes.Settings)}>Paramètres</li>
                            <li>Aides</li>
                            <li>Crédits</li>
                        </ul>
                    </nav>
                </Toggle>
                <Toggle visible={!open}>{component}</Toggle>
            </div>
        );
    } else {
        return (
            <div>
                <nav className="menu">
                    <ul>
                        <li>Reprendre la partie</li>
                        <li>Paramètres</li>
                        <li>Aides</li>
                        <li>Quitter</li>
                    </ul>
                </nav>
            </div>
        );
    }
};

InterfaceMenuComponent.propTypes = {
    isMain: PropTypes.bool,
};

export default InterfaceMenuComponent;
