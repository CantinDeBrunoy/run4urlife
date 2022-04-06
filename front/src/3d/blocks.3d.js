import * as THREE from 'three';
import { GameStep, VisionBlocksOpacity, VisionPlaneName } from '../common/constant';
import { CharacterFunctions } from '../core/functions/character';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GameElements } from './global.3d';
import VisionBlock from '../assets/models/blocks/visionblock.glb';
import Meteor from '../assets/models/meteor.glb';

const loadPlayerVision = () => {
    const vision = CharacterFunctions.getVision();
    const loader = new GLTFLoader();

    for (const [dir, value] of Object.entries(vision)) {
        if (value) {
            loader.load(VisionBlock, (gltf) => {
                const block = gltf.scene;
                block.scale.x = 1.7;
                block.scale.z = 1.7;
                block.children[0].material.transparent = true;
                block.children[0].material.opacity = VisionBlocksOpacity;

                const geometry = new THREE.BoxGeometry(2, 2, 4);
                const material = new THREE.MeshBasicMaterial({ color: 'yellow', opacity: 0, transparent: true });
                const cube = new THREE.Mesh(geometry, material);
                cube.name = VisionPlaneName + dir;

                switch (dir) {
                    case 'left':
                        cube.position.x = GameStep * (CharacterFunctions.getFrontPosition().x - 1) + GameStep / 2;
                        cube.position.z = GameStep * CharacterFunctions.getFrontPosition().y;
                        block.position.x = GameStep * (CharacterFunctions.getFrontPosition().x - 1);
                        block.position.z = GameStep * CharacterFunctions.getFrontPosition().y;
                        break;
                    case 'right':
                        cube.position.x = GameStep * (CharacterFunctions.getFrontPosition().x + 1) - GameStep / 2;
                        cube.position.z = GameStep * CharacterFunctions.getFrontPosition().y;
                        block.position.x = GameStep * (CharacterFunctions.getFrontPosition().x + 1);
                        block.position.z = GameStep * CharacterFunctions.getFrontPosition().y;
                        break;
                    case 'top':
                        cube.position.x = GameStep * CharacterFunctions.getFrontPosition().x;
                        cube.position.z = GameStep * (CharacterFunctions.getFrontPosition().y - 1);
                        block.position.x = GameStep * CharacterFunctions.getFrontPosition().x;
                        block.position.z = GameStep * (CharacterFunctions.getFrontPosition().y - 1);
                        break;
                    default:
                        break;
                }
                GameElements.blocks.vision.cubes.push(cube);
                GameElements.blocks.vision[dir] = block;
                GameElements.scene.add(cube);
                GameElements.scene.add(block);
            });
        }
    }
};

const resetHoverVisionBlocks = (direction = null) => {
    switch (direction) {
        case 'top':
            return (GameElements.blocks.vision.top.children[0].material.opacity = VisionBlocksOpacity);
        case 'left':
            return (GameElements.blocks.vision.left.children[0].material.opacity = VisionBlocksOpacity);
        case 'right':
            return (GameElements.blocks.vision.right.children[0].material.opacity = VisionBlocksOpacity);
        default:
            if (GameElements.blocks.vision.right) GameElements.blocks.vision.right.children[0].material.opacity = VisionBlocksOpacity;
            if (GameElements.blocks.vision.top) GameElements.blocks.vision.top.children[0].material.opacity = VisionBlocksOpacity;
            if (GameElements.blocks.vision.left) GameElements.blocks.vision.left.children[0].material.opacity = VisionBlocksOpacity;
            break;
    }
};

const getObstacle = (x, y) => {
    const loader = new GLTFLoader();
    return new Promise((resolve) => {
        loader.load(Meteor, (gltf) => {
            const meteor = gltf.scene;
            meteor.position.x = x * GameStep;
            meteor.position.z = y * GameStep;
            meteor.scale.set(0.6, 0.6, 0.6);

            resolve(meteor);
        });
    });
};

export const GameBlocks = { loadPlayerVision, getObstacle, resetHoverVisionBlocks };
