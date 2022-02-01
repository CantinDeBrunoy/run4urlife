import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Global3dItems } from './global.3d';
import Stats from 'three/examples/jsm/libs/stats.module';

const init = (canvas, fov = 60) => {
    Global3dItems.scene = new THREE.Scene();

    Global3dItems.camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000);
    Global3dItems.camera.position.set = [0, 0, 0];

    Global3dItems.renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
    });

    Global3dItems.renderer.setSize(window.innerWidth, window.innerHeight);
    Global3dItems.renderer.setPixelRatio(window.devicePixelRatio, 2);

    document.body.appendChild(Global3dItems.renderer.domElement);

    Global3dItems.camera.position.z = 5;
};

const addHelpers = () => {
    Global3dItems.controls = new OrbitControls(Global3dItems.camera, Global3dItems.renderer.domElement);

    Global3dItems.stats = Stats();
    document.body.appendChild(Global3dItems.stats.dom);

    Global3dItems.helpers = new THREE.AxesHelper();
    Global3dItems.scene.add(Global3dItems.helpers);
};

const render = () => {
    requestAnimationFrame(render);
    let delta;
    if (Global3dItems.controls) {
        Global3dItems.controls.update();
    }
    if (Global3dItems.stats) {
        Global3dItems.stats.update();
    }
    if (Global3dItems.clock) {
        delta = Global3dItems.clock.getDelta();
    }
    Global3dItems.renderer.render(Global3dItems.scene, Global3dItems.camera);
};

export default { init, render, addHelpers };
