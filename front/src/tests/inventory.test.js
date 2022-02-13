import { InventoryFunctions } from '../core/functions/inventory';
import { Game } from '../core/global';

test('[InventoryFunctions]: should init inventory, add and delete blocks', () => {
    InventoryFunctions.init();

    expect(Game.player.inventory.blocks[0] && Game.player.inventory.blocks[1] && Game.player.inventory.blocks[2]).toBeTruthy();

    InventoryFunctions.addRandomBlock();
    InventoryFunctions.addRandomBlock();

    expect(Game.player.inventory.blocks[0] && Game.player.inventory.blocks[1]).toBeTruthy();
    expect(Game.player.inventory.blocks[1].length).toBe(4);

    InventoryFunctions.deleteBlock(0);
    InventoryFunctions.deleteBlock(0);

    expect(Game.player.inventory.blocks[3]).toBeNull();

    InventoryFunctions.deleteBlock(0);
    InventoryFunctions.deleteBlock(0);
    InventoryFunctions.deleteBlock(0);
    expect(Game.player.inventory.blocks).toStrictEqual([null, null, null, null, null]);
});
