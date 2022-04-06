import React, { useEffect, useRef } from 'react';
// import { BackgroundScene } from '../3d/background-scene.3d';
import { GameActions } from '../common/constant';
import { Game, GlobalTypes } from '../core/global';
import { GameConsumerHook } from '../store/game.store';

const GameComponent = () => {
    const [gameStore, dispatch] = GameConsumerHook();
    const GameCanvasRef = useRef();
    // const BackgroundCanvasRef = useRef();

    useEffect(() => {
        dispatch({ type: GameActions.init, canvas: GameCanvasRef.current });
        console.log(Game);
    }, []);

    return (
        <div className="game-page">
            {/* <canvas ref={BackgroundCanvasRef} id="background" /> */}
            <canvas ref={GameCanvasRef} id="game" />
        </div>
    );
};

export default GameComponent;
