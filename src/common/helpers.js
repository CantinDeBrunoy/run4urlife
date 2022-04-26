export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const asyncTimeout = (timeout) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
};

export const weightFadeIn = (action, max, step) => {
    const interval = setInterval(() => {
        if (action.weight >= max) {
            action.weight = max;
            return clearInterval(interval);
        }
        action.weight += step;
    }, 10);
    return interval;
};

export const weightFadeOut = (action, min, step) => {
    const interval = setInterval(() => {
        if (action.weight <= min) {
            action.weight = min;
            return clearInterval(interval);
        }
        action.weight -= step;
    }, 10);
    return interval;
};
