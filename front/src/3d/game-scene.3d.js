import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GameElements } from './global.3d';
import Stats from 'three/examples/jsm/libs/stats.module';
import { Game } from '../core/global';
import { GameWidth } from '../common/constant';

const init = (canvas, fov = 60) => {
    GameElements.scene = new THREE.Scene();

    GameElements.camera = new THREE.PerspectiveCamera(fov, GameWidth / window.innerHeight, 0.1, 1000);
    GameElements.camera.position.set = [0, 0, 0];

    GameElements.renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: Game.graphism.antialias,
        precision: Game.graphism.precision ? Game.graphism.precision : 'mediump',
        alpha: true,
    });

    GameElements.renderer.setSize(GameWidth, window.innerHeight);
    GameElements.renderer.setPixelRatio(window.devicePixelRatio, 2);

    document.body.appendChild(GameElements.renderer.domElement);

    GameElements.camera.position.y = 5;

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    GameElements.cube = new THREE.Mesh(geometry, material);
    GameElements.scene.add(GameElements.cube);
};

const addHelpers = () => {
    //GameElements.controls = new OrbitControls(GameElements.camera, GameElements.renderer.domElement);

    GameElements.stats = Stats();
    document.body.appendChild(GameElements.stats.dom);

    GameElements.helpers = new THREE.AxesHelper();
    GameElements.scene.add(GameElements.helpers);
};

const render = () => {
    requestAnimationFrame(render);
    let delta;
    if (GameElements.controls) {
        GameElements.controls.update();
    }
    if (GameElements.stats) {
        GameElements.stats.update();
    }
    if (GameElements.clock) {
        delta = GameElements.clock.getDelta();
    }

    const cameraOffset = new THREE.Vector3(0.0, 5.0, -0.0);

    const objectPosition = new THREE.Vector3();
    GameElements.cube.getWorldPosition(objectPosition);

    GameElements.camera.position.copy(objectPosition).add(cameraOffset);

    GameElements.renderer.render(GameElements.scene, GameElements.camera);
    GameElements.camera.lookAt(GameElements.cube.position);
};

export const GameScene = { init, render, addHelpers };
