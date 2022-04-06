import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RadioComponent from '../radio.component';
import { useNavigate } from 'react-router-dom';
import { DifficultiesLabels, DifficultiesDescription } from '../../common/constant';
import { Game } from '../../core/global';
import { renderZoomOut } from '../../3d/background-scene.3d';

const InterfaceDiffilcultyComponent = ({ toggle }) => {
    const navigate = useNavigate();
    const [description, setDescription] = useState('Average');

    console.log(description);

    return (
        <div className="settings difficulty">
            <div className="difficulty_leftSide">
                <h3>Difficulté</h3>
                <div className="container">
                    <div onClick={() => setDescription('Easy')}>
                        <RadioComponent label={DifficultiesLabels.Easy} />
                    </div>
                    <div onClick={() => setDescription('Average')}>
                        <RadioComponent label={DifficultiesLabels.Average} />
                    </div>
                    <div onClick={() => setDescription('Hard')}>
                        <RadioComponent label={DifficultiesLabels.Hard} />
                    </div>
                    <div onClick={() => setDescription('Impossible')}>
                        <RadioComponent label={DifficultiesLabels.Impossible} />
                    </div>
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
            <div className="difficulty_rightSide">
                <span>{DifficultiesDescription[`${description}`]}</span>
            </div>
        </div>
    );
};

InterfaceDiffilcultyComponent.propTypes = {
    toggle: PropTypes.func,
};

export default InterfaceDiffilcultyComponent;
