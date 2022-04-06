import React from 'react';
import PropTypes from 'prop-types';
import RadioComponent from '../radio.component';
import { useNavigate } from 'react-router-dom';
import { DifficultiesLabels } from '../../common/constant';
import { Game } from '../../core/global';
import { renderZoomOut } from '../../3d/background-scene.3d';

const InterfaceDiffilcultyComponent = ({ toggle }) => {
    const navigate = useNavigate();

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
                <div
                    onClick={() => {
                        if (!Game.state) navigate('/game');
                    }}
                >
                    <div>Lancer</div>
                </div>
                <div
                    onClick={() => {
                        toggle();
                        renderZoomOut();
                    }}
                >
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
