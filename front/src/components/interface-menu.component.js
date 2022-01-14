import React from 'react';
import PropTypes from 'prop-types';

const InterfaceMenuComponent = (menu) => {
    if (menu.isMain) {
        return (
            <div className="menu">
                <ul>
                    <li>Démarrer une partie</li>
                    <li>Tableau des scores</li>
                    <li>Paramètres</li>
                    <li>Aides</li>
                    <li>Crédits</li>
                </ul>
            </div>
        );
    } else {
        return (
            <div className="menu">
                <ul>
                    <li>Reprendre la partie</li>
                    <li>Paramètres</li>
                    <li>Aides</li>
                    <li>Quitter</li>
                </ul>
            </div>
        );
    }
};

InterfaceMenuComponent.propTypes = {
    isMain: PropTypes.bool,
};

export default InterfaceMenuComponent;
