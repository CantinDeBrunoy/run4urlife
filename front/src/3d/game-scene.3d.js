import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GameElements } from './global.3d';
import Stats from 'three/examples/jsm/libs/stats.module';
import { Game } from '../core/global';
import { Direction, GameCharacterSpeed, GameStep, GameWidth } from '../common/constant';
import { GameCharacters } from './characters.3d';
import { GameLight } from './light.3d';

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
    GameCharacters.loadCharacter();
    GameElements.renderer.shadowMap.enabled = true;
    GameLight.addDirectionalLight();
    GameLight.addHemisphereLight();
    GameElements.camera.position.y = 10;
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

        if (character.position.z > -Game.player.position.y * GameStep) {
            inMove = Direction.up;
        }
        if (character.position.x > -Game.player.position.x * GameStep) {
            inMove = Direction.left;
        } else if (character.position.x < -Game.player.position.x * GameStep) {
            inMove = Direction.right;
        }

        switch (inMove) {
            case Direction.up:
                if (character.rotation.y !== 0) character.rotation.y = 0;
                character.position.z -= GameCharacterSpeed;
                if (character.position.z < -Game.player.position.y * GameStep) {
                    character.position.z = -Game.player.position.y * GameStep;
                }
                break;
            case Direction.left:
                if (character.rotation.y !== Math.PI / 2) character.rotation.y = Math.PI / 2;
                character.position.x -= GameCharacterSpeed;
                if (character.position.x < -Game.player.position.x * GameStep) {
                    character.position.x = -Game.player.position.x * GameStep;
                }
                break;
            case Direction.right:
                if (character.rotation.y !== -(Math.PI / 2)) character.rotation.y = -(Math.PI / 2);
                character.position.x += GameCharacterSpeed;
                if (character.position.x > -Game.player.position.x * GameStep) {
                    character.position.x = -Game.player.position.x * GameStep;
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
    GameElements.renderer.render(GameElements.scene, GameElements.camera);
};

export const GameScene = { init, render, addHelpers };
