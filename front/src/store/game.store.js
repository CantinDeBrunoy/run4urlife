import React, { createContext, useContext, useReducer } from 'react';
import { GameScene } from '../3d/game-scene.3d';
import { GameActions } from '../common/constant';
import { PlayerFunctions } from '../core/functions/player';
import { gameInit, gamePause, gameStart } from '../core/game';
import { Game, GlobalTypes } from '../core/global';

const initialState = {
    gameState: null,
    selectedBlock: null,
    antialias: false,
    precision: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case GameActions.init:
            gameInit();
            GameScene.init(action.canvas);
            GameScene.addHelpers();
            GameScene.render();
            return {
                ...state,
                precision: Game.graphism.precision,
                antialias: Game.graphism.antialias,
                gameState: GlobalTypes.states.initialized,
            };
        case GameActions.pause:
            gamePause();
            return {
                ...state,
                gameState: GlobalTypes.states.paused,
            };
        case GameActions.play:
            gameStart();
            return {
                ...state,
                gameState: GlobalTypes.states.playing,
            };
        case GameActions.antialias:
            Game.graphism.antialias = !state.antialias;
            return {
                ...state,
                antialias: !state.antialias,
            };
        case GameActions.precision:
            Game.graphism.precision = action.precision;
            return {
                ...state,
                precision: action.precision,
            };
        case GameActions.selectBlock:
            return {
                ...state,
                selectedBlock: action.index,
            };
        case GameActions.placeBlock:
            PlayerFunctions.placeBlock(action.x, action.y, state.selectedBlock);
            return {
                ...state,
                selectedBlock: null,
            };
        default:
            break;
    }
};

const GameContext = createContext();
export const GameConsumerHook = () => useContext(GameContext);
// eslint-disable-next-line react/prop-types
export const GameProvider = ({ children }) => <GameContext.Provider value={useReducer(reducer, initialState)}>{children}</GameContext.Provider>;
