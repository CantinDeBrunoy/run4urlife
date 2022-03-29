import { asyncTimeout } from '../common/helpers';
import { InventoryFunctions } from './functions/inventory';
import { MapGenerationFunctions } from './functions/map-generation';
import { Game, GlobalTypes } from './global';

const mapDestructLoop = async () => {
    await asyncTimeout(getTimeout());
    MapGenerationFunctions.deleteFirstLine();
    if (Game.state === GlobalTypes.states.playing) requestAnimationFrame(mapDestructLoop);
};

const addInventoryLoop = async () => {
    await asyncTimeout(getTimeout());
    InventoryFunctions.addRandomBlock();
    if (Game.state === GlobalTypes.states.playing) requestAnimationFrame(addInventoryLoop);
};

const getTimeout = () => {
    let timeout = Game.difficulty.value * (Game.timer.value / 1000) ** 2 + 3000;
    return timeout > 100 ? timeout : 100;
};

const startTimer = () => {
    const intervalID = setInterval(() => {
        if (Game.state === GlobalTypes.states.playing) {
            Game.timer.value += 100;
        } else {
            clearInterval(intervalID);
        }
    }, 100);
};

export const gameInit = () => {
    MapGenerationFunctions.createGrid();
    InventoryFunctions.init();
    Game.state = GlobalTypes.states.initialized;
    Game.difficulty = GlobalTypes.difficulties.impossible;
};

export const gameStart = () => {
    if (!Game.timer.startDate) Game.timer.startDate = new Date();
    Game.state = GlobalTypes.states.playing;
    startTimer();
    mapDestructLoop();
    addInventoryLoop();
};

export const gameFinish = () => {
    Game.state = GlobalTypes.states.finished;
};

export const gamePause = () => {
    Game.state = GlobalTypes.states.paused;
};
