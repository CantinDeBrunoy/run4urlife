import React from 'react';
import PropTypes from 'prop-types';
import RadioComponent from '../radio.component';
import { AntialiasLabel, GameActions, PrecisionLabels } from '../../common/constant';
import { GameConsumerHook } from '../../store/game.store';

const InterfaceSettingsComponent = ({ toggle }) => {
    const [GameStore, dispatch] = GameConsumerHook();

    const handleVolumeClick = (e) => {
        dispatch({ type: GameActions.setVolume, volume: ((e.clientX - e.target.offsetLeft) * 100) / 150 });
    };

    return (
        <div className="settings">
            <h2>Paramètres</h2>
            <div className="volume">
                <h3>Volume</h3>
                <div onClick={handleVolumeClick} className="container">
                    <div style={{ width: `${GameStore.volume}%` }} className="juice"></div>
                </div>
            </div>
            <div className="graphism">
                <h3>Graphismes</h3>
                <div className="container">
                    <RadioComponent label={PrecisionLabels.Low} />
                    <RadioComponent label={PrecisionLabels.Medium} />
                    <RadioComponent label={PrecisionLabels.High} />
                </div>
                <RadioComponent label={AntialiasLabel} />
            </div>
            <ul>
                <div onClick={toggle}>
                    <div>Retour</div>
                </div>
            </ul>
        </div>
    );
};

InterfaceSettingsComponent.propTypes = {
    toggle: PropTypes.func,
};

export default InterfaceSettingsComponent;
