import { ItemsFunctions } from '../core/functions/items';

test('[createBlock]: should create a valid block', () => {
    expect(() => {
        ItemsFunctions.createBlock(1, 0, 0, 0);
    }).toThrowError();
    expect(() => {
        ItemsFunctions.createBlock(0, 0, 0, 0);
    }).toThrowError();
    expect(ItemsFunctions.createBlock(1, 0, 1, 0)).toStrictEqual([1, 0, 1, 0]);
});
