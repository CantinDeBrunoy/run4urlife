import { asyncTimeout } from './functions/helpers';
import { MapGenerationFunctions } from './functions/map-generation';
import { Game, GlobalTypes } from './global';

const mapDestructLoop = async () => {
    await asyncTimeout(getTimeout());
    MapGenerationFunctions.deleteFirstLine();
    MapGenerationFunctions.createLine();
    requestAnimationFrame(mapDestructLoop);
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
    Game.timer.startDate = new Date();
    Game.state = GlobalTypes.states.playing;
    Game.difficulty = GlobalTypes.difficulties.impossible;
    startTimer();
    mapDestructLoop();
};
