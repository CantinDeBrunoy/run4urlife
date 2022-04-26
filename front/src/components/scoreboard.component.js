import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ScoreboardComponent = ({ toggle }) => {
    const [highscores, setHighscores] = useState(JSON.parse(window.localStorage.getItem('highScore')) ?? {});

    return (
        <div className="scoreboard">
            {Object.entries(highscores).map((score, i) => (
                <div key={i}>
                    <div className="highscore">
                        <h3>{score[0]}</h3>
                        <p>{Math.round(score[1])}</p>
                    </div>
                </div>
            ))}
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
