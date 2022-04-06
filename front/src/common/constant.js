export const TabTypes = {
    Settings: 'settings',
    difficulty: 'difficulty',
};

export const Direction = {
    up: 'up',
    left: 'left',
    right: 'right',
};

export const GameActions = {
    pause: 'pause',
    difficulty: 'difficulty',
    play: 'play',
    init: 'init',
    antialias: 'antialias',
    precision: 'precision',
    selectBlock: 'selectBlock',
    placeBlock: 'placeBlock',
    setVolume: 'setVolume',
};

export const PrecisionLabels = {
    High: 'élevé',
    Medium: 'moyen',
    Low: 'bas',
};

export const DifficultiesLabels = {
    Easy: 'facile',
    Average: 'moyen',
    Hard: 'difficile',
    Impossible: 'impossible',
};

export const DifficultiesDescription = {
    Easy: 'Recommandé pour débutant. Idéal pour se familiariser avec le jeu sans se prendre la tête.',
    Average: 'Difficulté adaptée pour les joueurs occasionnels.  ',
    Hard: 'Envie de vous dépasser ? Prouvez votre connaissances du jeu sur un niveau digne de vos capacités',
    Impossible: 'Ici on ne rigole plus, ici on fait du gaming, 谁播下风，谁收获旋风',
};

export const AntialiasLabel = 'Antialias';

export const Characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/?-#&@';

export const GameWidth = window.innerWidth / 3;

export const GameStep = 3.5;

export const GameCharacterSpeed = 0.3;
