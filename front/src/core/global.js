export const Game = {
    state: null,
    grid: [],
    player: {
        position: {
            x: 1,
            y: 1,
        },
        inventory: {
            blocks: [],
        },
    },
    timer: {
        value: 0,
        startDate: null,
        nowDate: null,
    },
    difficulty: null,
    graphism: {
        antialias: true,
        precision: null,
    },
};

export const GlobalTypes = {
    caseTypes: {
        obstacle: 'Obstacle',
        empty: 'Empty',
    },
    difficulties: {
        easy: 0.2,
        average: 0.4,
        hard: 0.8,
        impossible: 1.5,
    },
    states: {
        finished: 'finished',
        playing: 'playing',
        paused: 'paused',
    },
    graphismPrecision: {
        low: 'lowp',
        medium: 'mediump',
        high: 'highp',
    },
};
