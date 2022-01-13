import { asyncTimeout } from './functions/helpers';
import { deleteFirstLine } from './functions/map-generation';

const mapDestructLoop = async () => {
    await asyncTimeout(200);
    deleteFirstLine();
    requestAnimationFrame(mapDestructLoop);
};

export const gameInit = () => {};
