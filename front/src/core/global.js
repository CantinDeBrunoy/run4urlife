const cacheSettings = JSON.parse(window.localStorage.getItem('settings'));

export const GlobalTypes = {
    caseTypes: {
        obstacle: 'Obstacle',
        empty: 'Empty',
        block: 'Block',
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
        initialized: 'initialized',
    },
    graphismPrecision: {
        low: 'lowp',
        medium: 'mediump',
        high: 'highp',
    },
};

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
            selected: null,
        },
    },
    timer: {
        value: 0,
        startDate: null,
    },
    score: 0,
    difficulty: cacheSettings && cacheSettings.difficulty ? cacheSettings.difficulty : GlobalTypes.difficulties.average,
    graphism: {
        antialias: cacheSettings && cacheSettings.antialias ? true : false,
        precision: cacheSettings && cacheSettings.precision ? cacheSettings.precision : GlobalTypes.graphismPrecision.low,
    },
};
