import * as THREE from 'three';
import { GameStep } from '../common/constant';
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
                block.children[0].material.opacity = 0.5;
                switch (dir) {
                    case 'left':
                        block.position.x = -GameStep;
                        block.position.z = GameStep * CharacterFunctions.getFrontPosition().y;
                        break;
                    case 'right':
                        block.position.x = GameStep;
                        block.position.z = GameStep * CharacterFunctions.getFrontPosition().y;
                        break;
                    case 'top':
                        block.position.x = CharacterFunctions.getFrontPosition().x;
                        block.position.z = GameStep * (CharacterFunctions.getFrontPosition().y - 1);
                        break;
                    default:
                        break;
                }
                GameElements.blocks.vision[dir] = block;
                GameElements.scene.add(block);
            });
        }
    }
};

const loadObstacle = (x, y) => {
    const loader = new GLTFLoader();

    loader.load(Meteor, (gltf) => {
        const meteor = gltf.scene;
        meteor.position.x = x * GameStep;
        meteor.position.z = y * GameStep;
        meteor.scale.set(0.6, 0.6, 0.6);

        GameElements.blocks.obstacles.push(meteor);
        GameElements.scene.add(meteor);
        console.log(meteor);
    });
};

export const GameBlocks = { loadPlayerVision, loadObstacle };
