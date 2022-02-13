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
    return { x: -(Game.player.position.x - 1), y: -Game.player.position.y };
};

export const CharacterFunctions = {
    goForward,
    goLeft,
    goRight,
    getFrontPosition,
};
