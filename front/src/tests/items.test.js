import { ItemsFunctions } from '../core/functions/items';
import { MapGenerationFunctions } from '../core/functions/map-generation';
import { gameInit } from '../core/game';

test('[createBlock]: should create a valid block', () => {
    expect(() => {
        ItemsFunctions.createBlock(1, 0, 0, 0);
    }).toThrowError();
    expect(() => {
        ItemsFunctions.createBlock(0, 0, 0, 0);
    }).toThrowError();
    expect(ItemsFunctions.createBlock(1, 0, 1, 0)).toStrictEqual([1, 0, 1, 0]);
});

test('[placeBlock]: should place a valid block', () => {
    gameInit();
    expect(() => {
        ItemsFunctions.placeBlock(1, 1, 5);
    }).toThrowError();
    expect(() => {
        ItemsFunctions.placeBlock(1, 1, 3);
    }).toThrowError();
    ItemsFunctions.placeBlock(1, 1, 0);
    expect(MapGenerationFunctions.getGridCase(1, 1).length).toBe(4);
});
