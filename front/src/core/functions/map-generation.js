import { Game } from '../global';
import { getRandomInt } from './helpers';

const createLine = () => {
    const newLine = {
        id: Game.grid.length ? Game.grid[Game.grid.length - 1].id + 1 : 0,
        cases: [
            {
                type: Game.caseTypes.Empty,
            },
            {
                type: Game.caseTypes.Empty,
            },
            {
                type: Game.caseTypes.Empty,
            },
        ],
    };

    if (newLine.id > 3 && newLine.id % 2 !== 0) {
        const randomNumber = Math.random();
        if (randomNumber < 0.2) {
            const pos1 = getRandomInt(0, 2);
            let pos2 = getRandomInt(0, 2);

            if (pos1 === pos2) {
                pos2 = pos2 + 1 > 2 ? pos2 - 1 : pos2 + 1;
            }
            newLine.cases[pos1].type = Game.caseTypes.Obstacle;
            newLine.cases[pos2].type = Game.caseTypes.Obstacle;
        } else if (randomNumber < 0.5) {
            const pos1 = getRandomInt(0, 2);
            newLine.cases[pos1].type = Game.caseTypes.Obstacle;
        }
    }
    Game.grid.push(newLine);
};

const deleteFirstLine = () => {
    // Verify if the player is on the current line
    if (Game.grid.length > 0) {
        Game.grid.shift();
    }
};

const createGrid = () => {
    for (let line = 0; line < 5; line++) {
        createLine(Game.grid);
    }
};

export const MapGeneration = {
    createGrid,
    createLine,
    deleteFirstLine,
};
