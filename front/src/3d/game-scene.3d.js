import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GameElements } from './global.3d';
import Stats from 'three/examples/jsm/libs/stats.module';
import { Game, GlobalTypes } from '../core/global';
import { Direction, GameCharacterSpeed, GameStep, GameWidth, VisionPlaneName } from '../common/constant';
import { GameCharacters } from './characters.3d';
import { GameLight } from './light.3d';
import { CharacterFunctions } from '../core/functions/character';
import { GameBlocks } from './blocks.3d';
import { PlayerFunctions } from '../core/functions/player';
import { gameStart } from '../core/game';

const Map3D = [];

const init = (canvas, fov = 35) => {
    GameElements.scene = new THREE.Scene();

    GameElements.camera = new THREE.PerspectiveCamera(fov, GameWidth / window.innerHeight, 0.1, 1000);
    GameElements.camera.position.set = [0, 0, 0];

    GameElements.renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: Game.graphism.antialias,
        precision: Game.graphism.precision ? Game.graphism.precision : GlobalTypes.graphismPrecision.low,
        alpha: true,
    });

    GameElements.renderer.setSize(GameWidth, window.innerHeight);
    GameElements.renderer.setPixelRatio(window.devicePixelRatio, 2);

    document.body.appendChild(GameElements.renderer.domElement);
    GameCharacters.loadCharacter();
    GameElements.renderer.shadowMap.enabled = true;
    GameLight.addDirectionalLight();
    GameLight.addHemisphereLight();
    GameElements.camera.position.y = 10;

    GameBlocks.loadPlayerVision();

    handleMouseMove();
    handleMouseClick();
};
const addHelpers = () => {
    GameElements.controls = new OrbitControls(GameElements.camera, GameElements.renderer.domElement);

    GameElements.stats = Stats();
    document.body.appendChild(GameElements.stats.dom);

    GameElements.helpers = new THREE.AxesHelper(500).rotateY(Math.PI);
    GameElements.scene.add(GameElements.helpers);
};

const compareAndReplaceMap = async () => {
    const tmpMap = [...GameElements.blocks.map];

    for (const line of Game.grid) {
        if (GameElements.blocks.map.filter((line3D) => line3D.id === line.id).length === 0) {
            GameElements.blocks.map.push({ id: line.id, cases: [] });
            let i = 0;
            for (const block of line.cases) {
                switch (block.type) {
                    case GlobalTypes.caseTypes.obstacle:
                        const obstacle = await GameBlocks.getObstacle(i - 1, -line.id);
                        GameElements.scene.add(obstacle);
                        GameElements.blocks.map[GameElements.blocks.map.length - 1].cases.push(obstacle);
                        break;

                    default:
                        GameElements.blocks.map[GameElements.blocks.map.length - 1].cases.push(null);
                        break;
                }
                i++;
            }
        }
    }
    for (const line3D of tmpMap) {
        if (Game.grid.filter((line) => line3D.id === line.id).length === 0) {
            for (const block of line3D.cases) {
                if (block) GameElements.scene.remove(block);
            }
            GameElements.blocks.map.splice(
                GameElements.blocks.map.findIndex((val) => val.id === line3D.id),
                1,
            );
        }
    }
};

let time = null,
    delay = 1000 / 45,
    frame = -1;

const render = (timestamp) => {
    if (time === null) time = timestamp;
    let seg = Math.floor((timestamp - time) / delay);
    if (seg > frame) {
        frame = seg;
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
        if (GameElements.characters.alien) {
            let character = GameElements.characters.alien;
            let inMove = false;

            const { x, y } = CharacterFunctions.getFrontPosition();

            if (character.position.z > y * GameStep) {
                inMove = Direction.up;
            }
            if (character.position.x > x * GameStep) {
                inMove = Direction.left;
            } else if (character.position.x < x * GameStep) {
                inMove = Direction.right;
            }

            switch (inMove) {
                case Direction.up:
                    if (character.rotation.y !== 0) character.rotation.y = 0;
                    character.position.z -= GameCharacterSpeed;
                    if (character.position.z < y * GameStep) {
                        character.position.z = y * GameStep;
                    }
                    break;
                case Direction.left:
                    if (character.rotation.y !== Math.PI / 2) character.rotation.y = Math.PI / 2;
                    character.position.x -= GameCharacterSpeed;
                    if (character.position.x < x * GameStep) {
                        character.position.x = x * GameStep;
                    }
                    break;
                case Direction.right:
                    if (character.rotation.y !== -(Math.PI / 2)) character.rotation.y = -(Math.PI / 2);
                    character.position.x += GameCharacterSpeed;
                    if (character.position.x > x * GameStep) {
                        character.position.x = x * GameStep;
                    }
                    break;
                default:
                    break;
            }

            const cameraOffset = new THREE.Vector3(-character.position.x, 45.0, 0.0);
            const objectPosition = new THREE.Vector3();
            GameElements.characters.alien.getWorldPosition(objectPosition);
            GameElements.camera.position.copy(objectPosition).add(cameraOffset);
            GameElements.camera.lookAt(new THREE.Vector3(0, GameElements.characters.alien.position.y, GameElements.characters.alien.position.z - 10));
        }
        for (const line of GameElements.blocks.map) {
            for (const block of line.cases) {
                if (block) {
                    switch (block.type) {
                        case GlobalTypes.caseTypes.obstacle:
                            block.rotation[block.directionRotation] += block.speedRotation;
                            block.rotation.z += block.speedRotation;
                            break;

                        default:
                            break;
                    }
                }
            }
        }
        compareAndReplaceMap();
        GameElements.renderer.render(GameElements.scene, GameElements.camera);
    }
    requestAnimationFrame(render);
};

const handleMouseMove = () => {
    const raycaster = new THREE.Raycaster();
    const mouseClick = new THREE.Vector2();

    window.addEventListener('mousemove', (event) => {
        if (Game.state === GlobalTypes.states.paused || Game.state === GlobalTypes.states.finished) return;
        mouseClick.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);

        raycaster.setFromCamera(mouseClick, GameElements.camera);
        const intersects = raycaster.intersectObjects(GameElements.scene.children, false);

        if (intersects.length === 0) GameBlocks.resetHoverVisionBlocks();

        for (const item of intersects) {
            if (item.object && item.object.name.includes(VisionPlaneName)) {
                switch (item.object.name) {
                    case VisionPlaneName + 'top':
                        if (
                            (Game.player.inventory.selected || Game.player.inventory.selected === 0) &&
                            Game.player.inventory.blocks[Game.player.inventory.selected][2]
                        ) {
                            GameElements.blocks.vision.top.children[0].material.opacity = 1;
                        } else {
                            GameElements.blocks.vision.top.children[0].material.color = { r: 1, g: 0, b: 0 };
                            GameElements.blocks.vision.top.children[0].material.opacity = 1;
                        }
                        break;
                    case VisionPlaneName + 'right':
                        if (
                            (Game.player.inventory.selected || Game.player.inventory.selected === 0) &&
                            Game.player.inventory.blocks[Game.player.inventory.selected][3]
                        ) {
                            GameElements.blocks.vision.right.children[0].material.opacity = 1;
                        } else {
                            GameElements.blocks.vision.right.children[0].material.color = { r: 1, g: 0, b: 0 };
                            GameElements.blocks.vision.right.children[0].material.opacity = 1;
                        }
                        break;
                    case VisionPlaneName + 'left':
                        if (
                            (Game.player.inventory.selected || Game.player.inventory.selected === 0) &&
                            Game.player.inventory.blocks[Game.player.inventory.selected][1]
                        ) {
                            GameElements.blocks.vision.left.children[0].material.opacity = 1;
                        } else {
                            GameElements.blocks.vision.left.children[0].material.color = { r: 1, g: 0, b: 0 };
                            GameElements.blocks.vision.left.children[0].material.opacity = 1;
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    });
};

const handleMouseClick = () => {
    const raycaster = new THREE.Raycaster();
    const mouseClick = new THREE.Vector2();

    window.addEventListener('click', (event) => {
        if (Game.state === GlobalTypes.states.paused || Game.state === GlobalTypes.states.finished) return;

        mouseClick.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);

        raycaster.setFromCamera(mouseClick, GameElements.camera);
        const intersects = raycaster.intersectObjects(GameElements.scene.children, false);

        if (Game.player.inventory.selected !== null) {
            for (const item of intersects) {
                if (item.object && item.object.name.includes(VisionPlaneName)) {
                    switch (item.object.name) {
                        case VisionPlaneName + 'top':
                            if (
                                (Game.player.inventory.selected || Game.player.inventory.selected === 0) &&
                                Game.player.inventory.blocks[Game.player.inventory.selected][2]
                            ) {
                                GameBlocks.placeBlock(
                                    Game.player.inventory.blocks[Game.player.inventory.selected],
                                    CharacterFunctions.getFrontPosition().x,
                                    CharacterFunctions.getFrontPosition().y - 1,
                                );
                                GameBlocks.removeBlockVision();
                                PlayerFunctions.placeBlock(Game.player.position.x, Game.player.position.y + 1, Game.player.inventory.selected);
                                GameBlocks.loadPlayerVision();
                                if (Game.state === GlobalTypes.states.initialized) gameStart();
                            }
                            break;
                        case VisionPlaneName + 'right':
                            if (
                                (Game.player.inventory.selected || Game.player.inventory.selected === 0) &&
                                Game.player.inventory.blocks[Game.player.inventory.selected][3]
                            ) {
                                GameBlocks.placeBlock(
                                    Game.player.inventory.blocks[Game.player.inventory.selected],
                                    CharacterFunctions.getFrontPosition().x + 1,
                                    CharacterFunctions.getFrontPosition().y,
                                );
                                GameBlocks.removeBlockVision();
                                PlayerFunctions.placeBlock(Game.player.position.x + 1, Game.player.position.y, Game.player.inventory.selected);
                                GameBlocks.loadPlayerVision();
                                if (Game.state === GlobalTypes.states.initialized) gameStart();
                            }
                            break;
                        case VisionPlaneName + 'left':
                            if (
                                (Game.player.inventory.selected || Game.player.inventory.selected === 0) &&
                                Game.player.inventory.blocks[Game.player.inventory.selected][1]
                            ) {
                                GameBlocks.placeBlock(
                                    Game.player.inventory.blocks[Game.player.inventory.selected],
                                    CharacterFunctions.getFrontPosition().x - 1,
                                    CharacterFunctions.getFrontPosition().y,
                                );
                                GameBlocks.removeBlockVision();
                                PlayerFunctions.placeBlock(Game.player.position.x - 1, Game.player.position.y, Game.player.inventory.selected);
                                GameBlocks.loadPlayerVision();
                                if (Game.state === GlobalTypes.states.initialized) gameStart();
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    });
};

export const GameScene = { init, render, addHelpers, handleMouseClick };
