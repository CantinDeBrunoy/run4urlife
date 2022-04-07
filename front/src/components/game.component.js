import React, { useEffect, useRef } from 'react';
import { GameActions } from '../common/constant';
import { Game, GlobalTypes } from '../core/global';
import { GameConsumerHook } from '../store/game.store';

const GameComponent = () => {
    const [gameStore, dispatch] = GameConsumerHook();
    const GameCanvasRef = useRef();

    useEffect(() => {
        dispatch({ type: GameActions.init, canvas: GameCanvasRef.current });
        dispatch({ type: GameActions.play });
        console.log(Game);
    }, []);

    return (
        <div className="game-page">
            <canvas ref={GameCanvasRef} id="game" />
        </div>
    );
};

export default GameComponent;
