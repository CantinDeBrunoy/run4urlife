import React, { useEffect, useRef } from 'react';
// import { BackgroundScene } from '../3d/background-scene.3d';
import { GameScene } from '../3d/game-scene.3d';
import { GameElements } from '../3d/global.3d';
import { gameInit } from '../core/game';
import { Game } from '../core/global';

const GameComponent = () => {
    const GameCanvasRef = useRef();
    // const BackgroundCanvasRef = useRef();

    useEffect(() => {
        gameInit();
        // BackgroundScene.init(BackgroundCanvasRef.current);
        // BackgroundScene.render();

        GameScene.init(GameCanvasRef.current);
        GameScene.addHelpers();
        GameScene.render();
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
