import * as THREE from 'three';
import { GameStep } from '../common/constant';
import { Game } from '../core/global';
import { BackgroundElements, GameElements } from './global.3d';

const initObstacle = (block, x, y) => {
    console.log(block, x, y);
    const geometry = new THREE.BoxGeometry(GameStep, GameStep, GameStep);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = (x - 1) * GameStep;
    cube.position.z = -y * GameStep;
    GameElements.scene.add(cube);
};

export const initBlocks = { initObstacle };
