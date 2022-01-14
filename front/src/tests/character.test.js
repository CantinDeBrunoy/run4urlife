import { CharacterFunctions } from '../core/functions/character';
import { Game } from '../core/global';

test('[CharactersMovesFunctions]: should move character in map', () => {
    CharacterFunctions.goForward();
    expect(Game.player.position.y).toBe(2);
    CharacterFunctions.goLeft();
    expect(Game.player.position.x).toBe(0);
    CharacterFunctions.goRight();
    expect(Game.player.position.x).toBe(1);
});
