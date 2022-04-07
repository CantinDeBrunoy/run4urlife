import React, { useEffect, useState } from 'react';
import { Game, GlobalTypes } from '../core/global';
import { DateTime } from 'luxon';

const InterfaceTimerComponent = () => {
    const [timer, setTimer] = useState('');
    useEffect(() => {
        const interval = setInterval(() => {
            const dt = DateTime.fromMillis(Game.timer.value).setLocale('fr').toFormat('mm:ss');
            setTimer(dt);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <div className="timer">
            <span>{timer}</span>
        </div>
    );
};

export default InterfaceTimerComponent;
