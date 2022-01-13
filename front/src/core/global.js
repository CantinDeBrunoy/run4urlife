export const Game = {
    grid: [],
    player: {},
    timer: {
        value: 0,
        startDate: null,
        nowDate: null,
    },
    difficulty: null,
    caseTypes: {
        Obstacle: 'Obstacle',
        Empty: 'Empty',
    },
    difficulties: {
        Easy: 0.2,
        Average: 0.4,
        Hard: 0.8,
        Impossible: 1.5,
    },
};
