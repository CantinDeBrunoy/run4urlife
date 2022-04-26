import * as THREE from 'three';
import { Game, GlobalTypes } from '../core/global';
import { BackgroundElements } from './global.3d';
import { GamePlanet } from './planet.3d';

const init = (canvas, fov = 60) => {
    BackgroundElements.scene = new THREE.Scene();

    BackgroundElements.camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000);
    BackgroundElements.camera.position.set = [0, 0, 0];

    BackgroundElements.renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: Game.graphism.antialias ? Game.graphism.antialias : false,
        precision: Game.graphism.precision ? Game.graphism.precision : GlobalTypes.graphismPrecision.low,
    });

    BackgroundElements.renderer.setSize(window.innerWidth, window.innerHeight);
    BackgroundElements.renderer.setPixelRatio(window.devicePixelRatio, 2);

    document.body.appendChild(BackgroundElements.renderer.domElement);

    BackgroundElements.camera.position.z = 5;

    if (window.location.pathname === '/') {
        GamePlanet.loadPlanet();
    }
    GamePlanet.loadStars();
    GamePlanet.loadLights();
};

const render = () => {
    requestAnimationFrame(render);
    BackgroundElements.renderer.render(BackgroundElements.scene, BackgroundElements.camera);
    if (window.location.pathname === '/') {
        GamePlanet.animate();
    }
};

export const renderZoomIn = () => {
    const x = 0.02;
    const y = 0.0033;
    const z = 0.008;
    let vitesse = 1;
    if (BackgroundElements.camera.position.z > 2) {
        BackgroundElements.camera.position.z -= x * vitesse;
        BackgroundElements.camera.position.y += y * vitesse;
        BackgroundElements.camera.position.x -= z * vitesse;
        BackgroundElements.renderer.render(BackgroundElements.scene, BackgroundElements.camera);
        requestAnimationFrame(renderZoomIn);
    }
};

export const renderZoomOut = () => {
    const x = 0.02;
    const y = 0.0033;
    const z = 0.008;
    let vitesse = -1;
    if (BackgroundElements.camera.position.z < 5) {
        BackgroundElements.camera.position.z -= x * vitesse;
        BackgroundElements.camera.position.y += y * vitesse;
        BackgroundElements.camera.position.x -= z * vitesse;
        BackgroundElements.renderer.render(BackgroundElements.scene, BackgroundElements.camera);
        requestAnimationFrame(renderZoomOut);
    }
};

function onWindowResize() {
    BackgroundElements.camera.aspect = window.innerWidth / window.innerHeight;
    BackgroundElements.camera.updateProjectionMatrix();

    BackgroundElements.renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

export const BackgroundScene = { init, render };
