import { asyncTimeout } from './functions/helpers';
import { MapGeneration } from './functions/map-generation';
import { Game } from './global';

const mapDestructLoop = async () => {
    await asyncTimeout(getTimeout());
    MapGeneration.deleteFirstLine();
    MapGeneration.createLine();
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
    MapGeneration.createGrid();
    Game.timer.startDate = new Date();
    Game.difficulty = Game.difficulties.Impossible;
    startTimer();
    mapDestructLoop();
};
