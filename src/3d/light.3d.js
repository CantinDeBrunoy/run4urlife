import * as THREE from 'three';
import { GameElements } from './global.3d';

const addDirectionalLight = () => {
    const dirLight = new THREE.DirectionalLight(0xffffff, 4);
    dirLight.position.set(2000, 2000, -3000);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 2;
    dirLight.shadow.camera.bottom = -2;
    dirLight.shadow.camera.left = -2;
    dirLight.shadow.camera.right = 2;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 500;
    GameElements.scene.add(dirLight);
};

const addHemisphereLight = () => {
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.8);
    hemiLight.position.set(20, 20, 10);
    GameElements.scene.add(hemiLight);
};

const addAmbientLight = () => {
    const ambientlight = new THREE.AmbientLight(0xffffff, 0.9);
    GameElements.scene.add(ambientlight);
};

export const GameLight = { addDirectionalLight, addHemisphereLight, addAmbientLight };
