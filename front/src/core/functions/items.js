const createBlock = (top, right, bottom, left) => {
    if (top + right + bottom + left > 1) {
        return [top, right, bottom, left];
    } else {
        throw new Error('invalid block');
    }
};

export const ItemsFunctions = {
    createBlock,
};
