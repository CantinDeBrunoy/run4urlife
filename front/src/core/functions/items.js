import { Game, GlobalTypes } from '../global';
import { InventoryFunctions } from './inventory';

const createBlock = (top, right, bottom, left) => {
    if (top + right + bottom + left > 1) {
        return [top, right, bottom, left];
    } else {
        throw new Error('InvalidBlock');
    }
};

const translateBlock = (block) => {
    if (isBlock(block)) return { top: block[0], right: block[1], bottom: block[2], left: block[3] };
    throw new Error('InvalidBlock');
};

const isBlock = (block) => {
    return Array.isArray(block) && block.length === 4 && block.filter((val) => val === 1 || val === 0).length === 4;
};

const placeBlock = (x, y, indice) => {
    if (Game.player.inventory.blocks[indice].length !== 4) {
        throw new Error('InvalidBlock');
    }

    for (const gridCase of Game.grid) {
        if (gridCase.id === y) {
            gridCase.cases[x] = { block: Game.player.inventory.blocks[indice], type: GlobalTypes.caseTypes.block };
            InventoryFunctions.deleteBlock(indice);
        }
    }
};

export const ItemsFunctions = {
    createBlock,
    placeBlock,
    translateBlock,
    isBlock,
};
