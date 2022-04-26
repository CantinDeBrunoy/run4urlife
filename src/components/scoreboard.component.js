import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ScoreboardComponent = ({ toggle }) => {
    const [highscores, setHighscores] = useState(JSON.parse(window.localStorage.getItem('highScore')) ?? {});

    return (
        <div className="scoreboard">
            <div>
                <div className="highscore">
                    <h3>Facile</h3>
                    <p>{highscores.easy ? Math.round(highscores.easy) : 0}</p>
                </div>
            </div>
            <div>
                <div className="highscore">
                    <h3>Moyen</h3>
                    <p>{highscores.average ? Math.round(highscores.average) : 0}</p>
                </div>
            </div>
            <div>
                <div className="highscore">
                    <h3>Difficile</h3>
                    <p>{highscores.hard ? Math.round(highscores.hard) : 0}</p>
                </div>
            </div>
            <div>
                <div className="highscore">
                    <h3>Impossible</h3>
                    <p>{highscores.impossible ? Math.round(highscores.impossible) : 0}</p>
                </div>
            </div>
            <span
                onClick={() => {
                    toggle();
                }}
            >
                <span className="space">Retour</span>
            </span>
        </div>
    );
};

ScoreboardComponent.propTypes = {
    toggle: PropTypes.func,
};

export default ScoreboardComponent;
