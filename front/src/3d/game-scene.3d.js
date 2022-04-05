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

const init = (canvas, fov = 60) => {
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
};
const addHelpers = () => {
    GameElements.controls = new OrbitControls(GameElements.camera, GameElements.renderer.domElement);

    GameElements.stats = Stats();
    document.body.appendChild(GameElements.stats.dom);

    GameElements.helpers = new THREE.AxesHelper(500).rotateY(Math.PI);
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

        const cameraOffset = new THREE.Vector3(-character.position.x, 25.0, 0.0);
        const objectPosition = new THREE.Vector3();
        GameElements.characters.alien.getWorldPosition(objectPosition);
        GameElements.camera.position.copy(objectPosition).add(cameraOffset);
        GameElements.camera.lookAt(new THREE.Vector3(0, GameElements.characters.alien.position.y, GameElements.characters.alien.position.z - 10));
    }
    for (const obstacle of GameElements.blocks.obstacles) {
        obstacle.rotation.x += 0.005;
        obstacle.rotation.y += 0.001;
    }
    GameElements.renderer.render(GameElements.scene, GameElements.camera);
};

const raycaster = new THREE.Raycaster();
const mouseClick = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
    mouseClick.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseClick.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouseClick, GameElements.camera);
    const intersects = raycaster.intersectObjects(GameElements.scene.children);

    for (const item of intersects) {
        if (item.object && item.object.name.includes(VisionPlaneName)) {
            switch (item.object.name) {
                case 'top':
                    GameElements.blocks.vision.top.children[0].material.opacity = 1;
                    break;

                case 'right':
                    GameElements.blocks.vision.right.children[0].material.opacity = 1;
                    break;

                case 'left':
                    GameElements.blocks.vision.left.children[0].material.opacity = 1;
                    break;

                default:
                    break;
            }
        }
    }
    console.log(intersects);
});

export const GameScene = { init, render, addHelpers };
