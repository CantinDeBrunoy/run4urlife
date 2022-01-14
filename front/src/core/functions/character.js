import { Game } from '../global';

const goForward = () => {
    Game.player.position.y++;
};

const goLeft = () => {
    Game.player.position.x--;
};

const goRight = () => {
    Game.player.position.x++;
};

export const CharacterFunctions = {
    goForward,
    goLeft,
    goRight,
};
