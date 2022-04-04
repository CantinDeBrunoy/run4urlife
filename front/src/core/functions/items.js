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

const getFileNameAndRotation = (block) => {
    if (block === null || block === undefined) return null;
    if (!isBlock(block)) throw new Error('InvalidBlock');
    // console.log(block);
    let numberDoor = 0;
    block.map((door) => {
        if (door === 1) {
            numberDoor += 1;
        }
    });
    // pour 4 portes
    if (numberDoor === 4) {
        return { rotation: 0, fileName: 'Block-4-1' };
    }
    // pour 3 portes
    else if (numberDoor === 3) {
        if (numberDoor[3] === 0) {
            return { rotation: 0, fileName: 'Block-3-1' };
        } else if (numberDoor[1] === 0) {
            return { rotation: 180, fileName: 'Block-3-1' };
        } else if (numberDoor[2] === 0) {
            return { rotation: 270, fileName: 'Block-3-1' };
        }
    }
    // pour 2 portes
    // else if(numberDoor === 2){

    // }
    console.log(numberDoor);
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
    getFileNameAndRotation,
    translateBlock,
    isBlock,
};
