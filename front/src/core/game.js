import { asyncTimeout } from '../common/helpers';
import { InventoryFunctions } from './functions/inventory';
import { MapGenerationFunctions } from './functions/map-generation';
import { Game, GlobalTypes } from './global';

const mapDestructLoop = async () => {
    await asyncTimeout(getTimeout());
    if (Game.state === GlobalTypes.states.playing) {
        MapGenerationFunctions.deleteFirstLine();
        requestAnimationFrame(mapDestructLoop);
    }
};

const addInventoryLoop = async () => {
    await asyncTimeout(getTimeout());
    if (Game.state === GlobalTypes.states.playing) {
        InventoryFunctions.addRandomBlock();
        requestAnimationFrame(addInventoryLoop);
    }
};

const getTimeout = () => {
    let timeout = -Game.difficulty * (Game.timer.value / 1000) ** 2 + 3000;
    return timeout > 100 ? timeout : 100;
};

const startTimer = () => {
    const intervalID = setInterval(() => {
        if (Game.state === GlobalTypes.states.playing) {
            Game.timer.value += 100;
            if (Game.timer.value % 1000 === 0) {
                Game.score += Math.pow(Math.floor(Game.timer.value / 1000), 2);
            }
        } else {
            clearInterval(intervalID);
        }
    }, 100);
};

export const gameInit = () => {
    MapGenerationFunctions.createGrid();
    InventoryFunctions.init();
    Game.state = GlobalTypes.states.initialized;
    Game.timer.value = 0;
};

export const gameStart = () => {
    if (!Game.timer.startDate) Game.timer.startDate = new Date();
    Game.state = GlobalTypes.states.playing;
    startTimer();
    setTimeout(() => {
        mapDestructLoop();
    }, 10000);
    addInventoryLoop();
};

export const gameReset = () => {
    Game.state = null;
    Game.timer.startDate = null;
    Game.timer.value = 0;
};

export const gameFinish = () => {
    Game.state = GlobalTypes.states.finished;
};

export const gamePause = () => {
    Game.state = GlobalTypes.states.paused;
};
