import React, { useEffect, useState } from 'react';
import { Game, GlobalTypes } from '../core/global';
import { DateTime } from 'luxon';
import { GameConsumerHook } from '../store/game.store';
import { useNavigate } from 'react-router-dom';

const InterfaceGameOverComponent = () => {
    const navigate = useNavigate();
    const [gameStore, dispatch] = GameConsumerHook();
    const [timer, setTimer] = useState(Game.timer.value);
    const [active, setActive] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    useEffect(() => {
        if (active) {
            setTimer(Game.timer.value);
            setScore(Game.score);
            setHighScore(window.localStorage.getItem('highScore'));
        }
    }, [active]);

    useEffect(() => {
        if (gameStore.gameState === GlobalTypes.states.finished) setActive(true);
    }, [gameStore.gameState]);

    if (active) {
        return (
            <div className="gameover">
                <h2>GAME OVER</h2>
                <div className="container">
                    <span>Temps écoulé</span>
                    <span className="info">{DateTime.fromMillis(timer).setLocale('fr').toFormat('mm:ss')}</span>
                </div>
                <div className="container">
                    <span>Ton score</span>
                    <span className="info">{score}</span>
                    <span>Meilleur score</span>
                    <span className="info">{highScore}</span>
                </div>
                <div className="restart">
                    <div onClick={() => navigate('/')} className="button">
                        Retour
                    </div>
                    <div onClick={() => window.location.reload()} className="button">
                        Rejouer
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export default InterfaceGameOverComponent;
