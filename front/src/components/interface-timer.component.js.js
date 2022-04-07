import React, { useEffect, useState } from 'react';
import { Game, GlobalTypes } from '../core/global';
import { DateTime } from 'luxon';

const InterfaceTimerComponent = () => {
    const [timer, setTimer] = useState('');
    const [score, setScore] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            const dt = DateTime.fromMillis(Game.timer.value).setLocale('fr').toFormat('mm:ss');
            const scoreTmp = Game.score;
            setTimer(dt);
            setScore(Game.score);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <div className="HUD">
            <span className="timer">{timer}</span>
            <span className="score">{score}</span>
        </div>
    );
};

export default InterfaceTimerComponent;
