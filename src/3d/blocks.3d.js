import * as THREE from 'three';
import { BlockNames, GameStep, VisionBlocksOpacity, VisionPlaneName } from '../common/constant';
import { CharacterFunctions } from '../core/functions/character';
import { GameElements, Loader } from './global.3d';
import VisionBlock from '../assets/models/blocks/visionblock.glb';
import Meteor from '../assets/models/meteor.glb';
import { ItemsFunctions } from '../core/functions/items';
import Block21 from '../assets/models/blocks/block-2-1.glb';
import Block22 from '../assets/models/blocks/block-2-2.glb';
import Block31 from '../assets/models/blocks/block-3-1.glb';
import Block41 from '../assets/models/blocks/block-4-1.glb';
import { GlobalTypes } from '../core/global';

const loadPlayerVision = () => {
    const vision = CharacterFunctions.getVision();

    for (const [dir, value] of Object.entries(vision)) {
        if (value) {
            Loader.load(VisionBlock, (gltf) => {
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
                        switch (CharacterFunctions.getFrontPosition().x - 1) {
                            case -1:
                                cube.position.x = GameStep * (CharacterFunctions.getFrontPosition().x - 1) + GameStep / 2;
                                break;
                            case 0:
                                cube.position.x = GameStep * (CharacterFunctions.getFrontPosition().x - 1);
                                break;
                            case 1:
                                cube.position.x = GameStep * (CharacterFunctions.getFrontPosition().x - 1) - GameStep / 2;
                                break;
                            default:
                                break;
                        }
                        cube.position.z = GameStep * CharacterFunctions.getFrontPosition().y;
                        block.position.x = GameStep * (CharacterFunctions.getFrontPosition().x - 1);
                        block.position.z = GameStep * CharacterFunctions.getFrontPosition().y;
                        break;
                    case 'right':
                        switch (CharacterFunctions.getFrontPosition().x + 1) {
                            case -1:
                                cube.position.x = GameStep * (CharacterFunctions.getFrontPosition().x + 1) + GameStep / 2;
                                break;
                            case 0:
                                cube.position.x = GameStep * (CharacterFunctions.getFrontPosition().x + 1);
                                break;
                            case 1:
                                cube.position.x = GameStep * (CharacterFunctions.getFrontPosition().x + 1) - GameStep / 2;
                                break;
                            default:
                                break;
                        }
                        cube.position.z = GameStep * CharacterFunctions.getFrontPosition().y;
                        block.position.x = GameStep * (CharacterFunctions.getFrontPosition().x + 1);
                        block.position.z = GameStep * CharacterFunctions.getFrontPosition().y;
                        break;
                    case 'top':
                        switch (CharacterFunctions.getFrontPosition().x) {
                            case -1:
                                cube.position.x = GameStep * CharacterFunctions.getFrontPosition().x + GameStep / 2;
                                break;
                            case 0:
                                cube.position.x = GameStep * CharacterFunctions.getFrontPosition().x;
                                break;
                            case 1:
                                cube.position.x = GameStep * CharacterFunctions.getFrontPosition().x - GameStep / 2;
                                break;
                            default:
                                break;
                        }
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
            GameElements.blocks.vision.top.children[0].material.color = { r: 0.7688565850257874, g: 0.8000000715255737, b: 0 };
            return (GameElements.blocks.vision.top.children[0].material.opacity = VisionBlocksOpacity);
        case 'left':
            GameElements.blocks.vision.left.children[0].material.color = { r: 0.7688565850257874, g: 0.8000000715255737, b: 0 };
            return (GameElements.blocks.vision.left.children[0].material.opacity = VisionBlocksOpacity);
        case 'right':
            GameElements.blocks.vision.right.children[0].material.color = { r: 0.7688565850257874, g: 0.8000000715255737, b: 0 };
            return (GameElements.blocks.vision.right.children[0].material.opacity = VisionBlocksOpacity);
        default:
            for (const dir of ['top', 'left', 'right']) {
                if (GameElements.blocks.vision[dir]) {
                    GameElements.blocks.vision[dir].children[0].material.opacity = VisionBlocksOpacity;
                    GameElements.blocks.vision[dir].children[0].material.color = { r: 0.7688565850257874, g: 0.8000000715255737, b: 0 };
                }
            }
            break;
    }
};

const getObstacle = (x, y) => {
    return new Promise((resolve) => {
        Loader.load(Meteor, (gltf) => {
            const meteor = gltf.scene;
            meteor.position.x = x * GameStep;
            meteor.position.z = y * GameStep;
            meteor.scale.set(0.6, 0.6, 0.6);

            meteor.type = GlobalTypes.caseTypes.obstacle;
            meteor.speedRotation = Math.random() * (0.02 - 0.001) + 0.001;
            meteor.directionRotation = Math.random() > 0.5 ? 'x' : 'y';

            resolve(meteor);
        });
    });
};

const removeBlockVision = () => {
    for (const blockVision of GameElements.blocks.vision.cubes) {
        GameElements.scene.remove(blockVision);
    }
    if (GameElements.blocks.vision.right) {
        GameElements.scene.remove(GameElements.blocks.vision.right);
        GameElements.blocks.vision.right = null;
    }
    if (GameElements.blocks.vision.top) {
        GameElements.scene.remove(GameElements.blocks.vision.top);
        GameElements.blocks.vision.top = null;
    }
    if (GameElements.blocks.vision.left) {
        GameElements.scene.remove(GameElements.blocks.vision.left);
        GameElements.blocks.vision.left = null;
    }
    GameElements.blocks.vision.cubes = [];
};

const placeBlock = (block, x, y) => {
    const blockInfo = ItemsFunctions.getFileNameAndRotation(block);
    let fileBlock = '';

    switch (blockInfo.fileName) {
        case BlockNames.block21:
            fileBlock = Block21;
            break;
        case BlockNames.block22:
            fileBlock = Block22;
            break;
        case BlockNames.block31:
            fileBlock = Block31;
            break;
        case BlockNames.block41:
            fileBlock = Block41;
            break;
        default:
            break;
    }

    Loader.load(fileBlock, (gltf) => {
        const block = gltf.scene;
        block.position.x = x * GameStep;
        block.position.z = y * GameStep;
        block.scale.set(1.2, 1.2, 1.2);

        block.position.y -= 5;

        block.rotateY(-blockInfo.rotation * (Math.PI / 180));

        block.type = GlobalTypes.caseTypes.block;

        for (const line of GameElements.blocks.map) {
            if (line.id === -y) {
                line.cases[x + 1] = block;
                GameElements.scene.add(block);
            }
        }
    });
};

export const GameBlocks = { loadPlayerVision, getObstacle, resetHoverVisionBlocks, placeBlock, removeBlockVision };
