import { Game, GlobalTypes } from '../global';
import { MapGenerationFunctions } from './map-generation';

const goForward = () => {
    if (Game.grid.length > 0 && Game.player.position.y + 1 <= Game.grid[Game.grid.length - 1].id) {
        if (MapGenerationFunctions.getGridCase(Game.player.position.x, Game.player.position.y + 1) !== GlobalTypes.caseTypes.obstacle) {
            Game.player.position.y++;
        }
    }
};

const goLeft = () => {
    if (Game.grid.length > 0 && Game.player.position.x - 1 >= 0) {
        if (MapGenerationFunctions.getGridCase(Game.player.position.x - 1, Game.player.position.y) !== GlobalTypes.caseTypes.obstacle) {
            Game.player.position.x--;
        }
    }
};

const goRight = () => {
    if (Game.grid.length > 0 && Game.player.position.x + 1 <= 2) {
        if (MapGenerationFunctions.getGridCase(Game.player.position.x + 1, Game.player.position.y) !== GlobalTypes.caseTypes.obstacle) {
            Game.player.position.x++;
        }
    }
};

const getFrontPosition = () => {
    return { x: Game.player.position.x - 1, y: -Game.player.position.y };
};

const getVision = () => {
    const x = Game.player.position.x;
    const y = Game.player.position.y;

    const vision = {};

    switch (x) {
        case 0:
            vision.left = false;
            if (MapGenerationFunctions.getGridCase(x + 1, y) !== GlobalTypes.caseTypes.obstacle) {
                vision.right = true;
            } else {
                vision.right = false;
            }
            if (MapGenerationFunctions.getGridCase(x, y + 1) !== GlobalTypes.caseTypes.obstacle) {
                vision.top = true;
            } else {
                vision.top = false;
            }
            break;
        case 1:
            if (
                MapGenerationFunctions.getGridCase(x + 1, y) !== GlobalTypes.caseTypes.obstacle &&
                MapGenerationFunctions.getGridCase(x + 1, y + 1) !== GlobalTypes.caseTypes.obstacle
            ) {
                vision.right = true;
            } else {
                vision.right = false;
            }
            if (
                MapGenerationFunctions.getGridCase(x - 1, y) !== GlobalTypes.caseTypes.obstacle &&
                MapGenerationFunctions.getGridCase(x - 1, y + 1) !== GlobalTypes.caseTypes.obstacle
            ) {
                vision.left = true;
            } else {
                vision.left = false;
            }
            if (MapGenerationFunctions.getGridCase(x, y + 1) !== GlobalTypes.caseTypes.obstacle) {
                vision.top = true;
            } else {
                vision.top = false;
            }
            break;
        case 2:
            vision.right = false;
            if (MapGenerationFunctions.getGridCase(x - 1, y) !== GlobalTypes.caseTypes.obstacle) {
                vision.left = true;
            } else {
                vision.left = false;
            }
            if (MapGenerationFunctions.getGridCase(x, y + 1) !== GlobalTypes.caseTypes.obstacle) {
                vision.top = true;
            } else {
                vision.top = false;
            }
            break;
        default:
            throw new Error('InvalidPlayerX');
    }
};

export const CharacterFunctions = {
    goForward,
    goLeft,
    goRight,
    getFrontPosition,
    getVision,
};
