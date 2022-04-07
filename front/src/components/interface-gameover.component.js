import React, { useEffect, useState } from 'react';
import { Game, GlobalTypes } from '../core/global';
import { DateTime } from 'luxon';
import { GameConsumerHook } from '../store/game.store';

const InterfaceGameOverComponent = () => {
    const [gameStore, dispatch] = GameConsumerHook();
    const [timer, setTimer] = useState(Game.timer.value);
    const [active, setActive] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (active) {
            setTimer(Game.timer.value);
            setScore(Game.score);
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
                </div>
                <div className="restart">Rejouer</div>
            </div>
        );
    }
    return null;
};

export default InterfaceGameOverComponent;
