import React from 'react';
import PropTypes from 'prop-types';

const InterfaceSettingsComponent = ({ toggle }) => {
    return (
        <div className="settings">
            <h1>Paramètres</h1>
            <h3>Volume</h3>
            <h3>Graphismes</h3>
            <h3 onClick={toggle}>Retour</h3>
        </div>
    );
};

InterfaceSettingsComponent.propTypes = {
    toggle: PropTypes.func,
};

export default InterfaceSettingsComponent;
