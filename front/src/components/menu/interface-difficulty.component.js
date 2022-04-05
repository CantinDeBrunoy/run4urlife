import React from 'react';
import PropTypes from 'prop-types';
import RadioComponent from '../radio.component';
import { AntialiasLabel, GameActions, DifficultiesLabels } from '../../common/constant';
import { GameConsumerHook } from '../../store/game.store';

const InterfaceDiffilcultyComponent = ({ toggle }) => {
    const [GameStore, dispatch] = GameConsumerHook();

    const handleVolumeClick = (e) => {
        dispatch({ type: GameActions.setVolume, volume: ((e.clientX - e.target.offsetLeft) * 100) / 150 });
    };

    return (
        <div className="settings">
            <h3>Difficulté</h3>
            <div className="container">
                <RadioComponent label={DifficultiesLabels.Easy} />
                <RadioComponent label={DifficultiesLabels.Average} />
                <RadioComponent label={DifficultiesLabels.Hard} />
                <RadioComponent label={DifficultiesLabels.Impossible} />
            </div>
            <ul>
                <div onClick={toggle}>
                    <div>Lancer</div>
                </div>
                <div onClick={toggle}>
                    <div>Retour</div>
                </div>
            </ul>
        </div>
    );
};

InterfaceDiffilcultyComponent.propTypes = {
    toggle: PropTypes.func,
};

export default InterfaceDiffilcultyComponent;
