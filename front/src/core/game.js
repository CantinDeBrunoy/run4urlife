import { asyncTimeout } from '../common/helpers';
import { InventoryFunctions } from './functions/inventory';
import { MapGenerationFunctions } from './functions/map-generation';
import { Game, GlobalTypes } from './global';

const mapDestructLoop = async () => {
    await asyncTimeout(getTimeout());
    MapGenerationFunctions.deleteFirstLine();
    requestAnimationFrame(mapDestructLoop);
};

const addInventoryLoop = async () => {
    await asyncTimeout(getTimeout());
    InventoryFunctions.addRandomBlock();
    requestAnimationFrame(addInventoryLoop);
};

const getTimeout = () => {
    let timeout = Game.difficulty.value * (Game.timer.value / 1000) ** 2 + 3000;
    return timeout > 100 ? timeout : 100;
};

const startTimer = () => {
    setInterval(() => {
        Game.timer.nowDate = new Date();
        Game.timer.value = Game.timer.nowDate.getTime() - Game.timer.startDate.getTime();
    }, 100);
};

export const gameInit = () => {
    MapGenerationFunctions.createGrid();
    InventoryFunctions.init();
    Game.state = GlobalTypes.states.initialized;
    Game.difficulty = GlobalTypes.difficulties.impossible;
};

export const gameStart = () => {
    Game.timer.startDate = new Date();
    Game.state = GlobalTypes.states.playing;
    startTimer();
    mapDestructLoop();
    addInventoryLoop();
};
