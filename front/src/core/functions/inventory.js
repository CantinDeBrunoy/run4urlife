import { getRandomInt } from '../../common/helpers';
import { Game } from '../global';
import { ItemsFunctions } from './items';

const init = (size = 5) => {
    for (let i = 0; i < size; i++) {
        Game.player.inventory.blocks.push(null);
    }
    addRandomBlock();
    addRandomBlock();
    addRandomBlock();
};

const getFirstEmptyIndice = () => {
    for (const i in Game.player.inventory.blocks) {
        if (!Game.player.inventory.blocks[Number(i)]) {
            return Number(i);
        }
    }
    return null;
};

const addRandomBlock = () => {
    const emptyIndice = getFirstEmptyIndice();

    if (emptyIndice !== null) {
        const top = getRandomInt(0, 1);
        const right = getRandomInt(0, 1);
        const bottom = top + right < 1 ? 1 : getRandomInt(0, 1);
        const left = top + right + bottom <= 1 ? 1 : getRandomInt(0, 1);

        Game.player.inventory.blocks[emptyIndice] = ItemsFunctions.createBlock(top, right, bottom, left);
    }
};

const addBlock = (block) => {
    const emptyIndice = getFirstEmptyIndice();

    if (emptyIndice !== null) {
        Game.player.inventory.blocks[emptyIndice] = block;
    }
};

const deleteBlock = (indice) => {
    const inventory = Game.player.inventory;

    if (inventory.blocks[indice]) {
        for (let i = indice + 1; i < inventory.blocks.length; i++) {
            const copy = inventory.blocks[i] ? [...inventory.blocks[i]] : null;
            inventory.blocks[i - 1] = copy;
        }
        inventory.blocks[inventory.blocks.length - 1] = null;
    }
};

export const InventoryFunctions = {
    addRandomBlock,
    addBlock,
    deleteBlock,
    init,
};
