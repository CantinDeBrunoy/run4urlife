import { ContentCaseType } from '../global';
import { getRandomInt } from './helpers';

export const createLine = (grid) => {
    const newLine = {
        id: grid.length ? grid[grid.length - 1].id + 1 : 0,
        cases: [
            {
                type: ContentCaseType.Empty,
            },
            {
                type: ContentCaseType.Empty,
            },
            {
                type: ContentCaseType.Empty,
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
            newLine.cases[pos1].type = ContentCaseType.Obstacle;
            newLine.cases[pos2].type = ContentCaseType.Obstacle;
        } else if (randomNumber < 0.5) {
            const pos1 = getRandomInt(0, 2);
            newLine.cases[pos1].type = ContentCaseType.Obstacle;
        }
    }
    grid.push(newLine);
};

export const deleteFirstLine = (grid) => {
    grid.shift();
};

export const createGrid = () => {
    let grid = [];
    for (let line = 0; line < 5; line++) {
        createLine(grid);
    }
    return grid;
};
