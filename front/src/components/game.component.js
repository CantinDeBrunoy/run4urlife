import React, { useEffect, useRef } from 'react';
import { GameActions } from '../common/constant';
import { Game, GlobalTypes } from '../core/global';
import { GameConsumerHook } from '../store/game.store';

const GameComponent = () => {
    const [gameStore, dispatch] = GameConsumerHook();
    const GameCanvasRef = useRef();

    useEffect(() => {
        dispatch({ type: GameActions.init, canvas: GameCanvasRef.current });
        console.log(Game);

        const interval = setInterval(() => {
            switch (Game.state) {
                case GlobalTypes.states.playing:
                    if (gameStore.gameState !== GlobalTypes.states.playing) {
                        dispatch({ type: GameActions.play });
                    }
                    break;
                case GlobalTypes.states.finished:
                    if (gameStore.gameState !== GlobalTypes.states.finished) {
                        dispatch({ type: GameActions.finish });
                    }
                    break;
                case GlobalTypes.states.paused:
                    if (gameStore.gameState !== GlobalTypes.states.paused) {
                        dispatch({ type: GameActions.pause });
                    }
                    break;
                default:
                    break;
            }
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="game-page">
            <canvas ref={GameCanvasRef} id="game" />
        </div>
    );
};

export default GameComponent;
