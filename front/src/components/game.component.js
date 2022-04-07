import React, { useEffect, useRef } from 'react';
import { GameActions } from '../common/constant';
import { InventoryFunctions } from '../core/functions/inventory';
import { Game, GlobalTypes } from '../core/global';
import { GameConsumerHook } from '../store/game.store';

const GameComponent = () => {
    const [gameStore, dispatch] = GameConsumerHook();
    const GameCanvasRef = useRef();

    const handleKeyDown = (e) => {
        console.log(e.key);
        let index;
        switch (e.key) {
            case 'ArrowDown':
                if (Number.isInteger(InventoryFunctions.getFirstEmptyIndice())) {
                    index =
                        Game.player.inventory.selected + 1 > InventoryFunctions.getFirstEmptyIndice() - 1 ? 0 : Game.player.inventory.selected + 1;
                } else {
                    index = Game.player.inventory.selected + 1 > Game.player.inventory.blocks.length - 1 ? 0 : Game.player.inventory.selected + 1;
                }
                dispatch({ type: GameActions.selectBlock, index });
                break;
            case 'ArrowUp':
                if (Number.isInteger(InventoryFunctions.getFirstEmptyIndice())) {
                    index =
                        Game.player.inventory.selected - 1 < 0 ? InventoryFunctions.getFirstEmptyIndice() - 1 : Game.player.inventory.selected - 1;
                } else {
                    index = Game.player.inventory.selected - 1 < 0 ? Game.player.inventory.blocks.length - 1 : Game.player.inventory.selected - 1;
                }
                dispatch({ type: GameActions.selectBlock, index });
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        dispatch({ type: GameActions.init, canvas: GameCanvasRef.current });
        console.log(Game);

        window.addEventListener('keydown', handleKeyDown);

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
            window.removeEventListener('keydown', handleKeyDown);
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
