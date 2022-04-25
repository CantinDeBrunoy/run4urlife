import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Game, GlobalTypes } from '../core/global';

export const GameElements = {
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    helpers: null,
    stats: null,
    clock: null,
    characters: {
        alien: null,
        animations: {
            mixer: null,
        },
    },
    blocks: {
        map: [],
        vision: {
            cubes: [],
        },
    },
};

export const BackgroundElements = {
    scene: null,
    camera: null,
    renderer: null,
    items: {},
};

export const LoadManager = new THREE.LoadingManager(
    () => {
        document.getElementById('loader').classList.add('loaded');
        document.getElementById('loader').classList.remove('error');
    },
    (url, loaded, total) => {
        if (Game.state === GlobalTypes.states.initialized) {
            document.getElementById('loader').classList.remove('loaded');
            document.getElementById('loader').classList.remove('error');
        }
    },
    () => {
        document.getElementById('loader').classList.add('error');
    },
);

export const Loader = new GLTFLoader(LoadManager);
