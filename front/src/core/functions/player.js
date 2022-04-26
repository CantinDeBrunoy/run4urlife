import { Game } from '../global';
import { CharacterFunctions } from './character';
import { ItemsFunctions } from './items';
import { MapGenerationFunctions } from './map-generation';

const placeBlock = (x, y, indice) => {
    const vision = CharacterFunctions.getVision();
    const currentX = Game.player.position.x;

    if (currentX === x) {
        // top
        if (vision.top) {
            ItemsFunctions.placeBlock(x, y, indice);
            CharacterFunctions.goForward();
            MapGenerationFunctions.createLine();
        }
    } else if (currentX === x - 1) {
        // right
        if (vision.right) {
            ItemsFunctions.placeBlock(x, y, indice);
            CharacterFunctions.goRight();
        }
    } else if (currentX === x + 1) {
        // left
        if (vision.left) {
            ItemsFunctions.placeBlock(x, y, indice);
            CharacterFunctions.goLeft();
        }
    }
};

export const PlayerFunctions = {
    placeBlock,
};
