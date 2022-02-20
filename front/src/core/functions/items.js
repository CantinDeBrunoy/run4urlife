import { Game } from '../global';
import { InventoryFunctions } from './inventory';

const createBlock = (top, right, bottom, left) => {
    if (top + right + bottom + left > 1) {
        return [top, right, bottom, left];
    } else {
        throw new Error('invalid block');
    }
};

const placeBlock = (x, y, indice) => {
    if (Game.player.inventory.blocks[indice].length !== 4) {
        throw new Error('invalid block');
    }

    for (const gridCase of Game.grid) {
        if (gridCase.id === y) {
            gridCase.cases[x] = Game.player.inventory.blocks[indice];
            InventoryFunctions.deleteBlock(indice);
        }
    }
};

export const ItemsFunctions = {
    createBlock,
    placeBlock,
};
