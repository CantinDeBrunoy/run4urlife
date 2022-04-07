import React, { useEffect, useState } from 'react';
import { GameConsumerHook } from '../store/game.store';
import { GlobalTypes } from '../core/global';

const InterfaceBackgroundScreenComponent = () => {
    const [GameStore, dispatch] = GameConsumerHook();

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (GameStore.gameState === GlobalTypes.states.paused || GameStore.gameState === GlobalTypes.states.finished) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [GameStore]);

    if (open) return <div className="backgroundScreen"></div>;
    return null;
};

export default InterfaceBackgroundScreenComponent;
