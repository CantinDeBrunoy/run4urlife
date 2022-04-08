import { getRandomInt } from '../../common/helpers';
import { Game, GlobalTypes } from '../global';

const createLine = () => {
    const newLine = {
        id: Game.grid.length ? Game.grid[Game.grid.length - 1].id + 1 : 0,
        cases: [
            {
                type: GlobalTypes.caseTypes.empty,
            },
            {
                type: GlobalTypes.caseTypes.empty,
            },
            {
                type: GlobalTypes.caseTypes.empty,
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
            newLine.cases[pos1].type = GlobalTypes.caseTypes.obstacle;
            newLine.cases[pos2].type = GlobalTypes.caseTypes.obstacle;
        } else if (randomNumber < 0.5) {
            const pos1 = getRandomInt(0, 2);
            newLine.cases[pos1].type = GlobalTypes.caseTypes.obstacle;
        }
    }
    Game.grid.push(newLine);
};

const deleteFirstLine = () => {
    if (Game.player.position.y === Game.grid[0].id) {
        Game.state = GlobalTypes.states.finished;
        const highScore = window.localStorage.getItem('highScore');
        if (highScore == null || Game.score > highScore) {
            window.localStorage.setItem('highScore', Game.score);
        }
        console.log('finish');
        return;
    }
    if (Game.grid.length > 0) {
        Game.grid.shift();
    }
};

const createGrid = () => {
    Game.grid = [];
    for (let line = 0; line < 8; line++) {
        createLine(Game.grid);
    }
};

const getGridCase = (x, y) => {
    for (const gridCase of Game.grid) {
        if (gridCase.id === y) {
            return gridCase.cases[x];
        }
    }
};

export const MapGenerationFunctions = {
    createGrid,
    createLine,
    deleteFirstLine,
    getGridCase,
};
