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
            player: {},
            mixer: null,
            mixerPlayer: null,
        },
    },
    blocks: {
        map: [],
        vision: {
            cubes: [],
        },
    },
    lastMove: new Date().getTime(),
    reset: function () {
        if (this.scene) {
            while (this.scene.children.length > 0) {
                this.scene.remove(this.scene.children[0]);
            }
            this.renderer.render(this.scene, this.camera);
        }
    },
};

export const BackgroundElements = {
    scene: null,
    camera: null,
    renderer: null,
    items: {},
    reset: function () {
        this.scene.add(this.items.earthMesh);
        this.scene.add(this.items.cloudMesh);
    },
    remove: function () {
        this.scene.remove(this.items.earthMesh, this.items.cloudMesh);
    },
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
