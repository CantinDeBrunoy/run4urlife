import React, { useEffect, useRef } from 'react';
import { GameActions } from '../common/constant';
import { InventoryFunctions } from '../core/functions/inventory';
import { Game, GlobalTypes } from '../core/global';
import { GameConsumerHook } from '../store/game.store';

const GameComponent = () => {
    const [gameStore, dispatch] = GameConsumerHook();
    const GameCanvasRef = useRef();
    let isInventoryRefresh = true;

    const handleKeyDown = (e) => {
        console.log(e.key);
        let index;
        switch (e.key) {
            case 's':
            case 'ArrowDown':
                if (Number.isInteger(InventoryFunctions.getFirstEmptyIndice())) {
                    index =
                        Game.player.inventory.selected + 1 > InventoryFunctions.getFirstEmptyIndice() - 1 ? 0 : Game.player.inventory.selected + 1;
                } else {
                    index = Game.player.inventory.selected + 1 > Game.player.inventory.blocks.length - 1 ? 0 : Game.player.inventory.selected + 1;
                }
                dispatch({ type: GameActions.selectBlock, index });
                break;
            case 'z':
            case 'ArrowUp':
                if (Number.isInteger(InventoryFunctions.getFirstEmptyIndice())) {
                    index =
                        Game.player.inventory.selected - 1 < 0 ? InventoryFunctions.getFirstEmptyIndice() - 1 : Game.player.inventory.selected - 1;
                } else {
                    index = Game.player.inventory.selected - 1 < 0 ? Game.player.inventory.blocks.length - 1 : Game.player.inventory.selected - 1;
                }
                dispatch({ type: GameActions.selectBlock, index });
                break;
            case 'r':
            case 'Control':
                if (isInventoryRefresh && Game.state === GlobalTypes.states.playing) {
                    isInventoryRefresh = false;
                    dispatch({ type: GameActions.refreshInventory });
                    InventoryFunctions.init();
                    let tmp = gameStore.inventoryRefreshCooldown;
                    const interval = setInterval(() => {
                        if (tmp === 0) {
                            isInventoryRefresh = true;
                            dispatch({ type: GameActions.activeRefreshInventory });
                            clearInterval(interval);
                            dispatch({ type: GameActions.setInventoryRefreshCooldown, time: 5 });
                            return;
                        }
                        if (Game.state === GlobalTypes.states.playing) {
                            tmp -= 1;
                            dispatch({ type: GameActions.setInventoryRefreshCooldown, time: tmp });
                        }
                    }, 1000);
                }
                break;
            default:
                break;
        }
    };

    const handleKeyUp = (e) => {
        switch (e.key) {
            case 'Escape':
                if (Game.state === GlobalTypes.states.paused) {
                    dispatch({ type: GameActions.closeSettings });
                } else {
                    dispatch({ type: GameActions.openSettings });
                }
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        dispatch({ type: GameActions.init, canvas: GameCanvasRef.current });
        console.log(Game);

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

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
            window.removeEventListener('keyup', handleKeyUp);
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="game-page">
            <span className={`game-info ${gameStore.gameState === GlobalTypes.states.initialized ? 'active' : ''}`}>
                Place une case pour commencer
            </span>
            <canvas ref={GameCanvasRef} id="game" />
        </div>
    );
};

export default GameComponent;
