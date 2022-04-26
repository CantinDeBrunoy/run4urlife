import * as THREE from 'three';
import MainCharacter from '../assets/models/mainCharacter.glb';
import { GameElements, Loader, LoadManager } from './global.3d';
import Roberto from '../assets/models/MonsterRun4UrLife.glb';

const loadCharacter = () => {
    Loader.load(
        MainCharacter,
        (gltf) => {
            GameElements.scene.add(gltf.scene);
            GameElements.characters.alien = gltf.scene;
            gltf.scene.castShadow = true;
            gltf.scene.traverse((node) => {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
            });
            console.log(gltf.animations);
            GameElements.characters.animations.mixerPlayer = new THREE.AnimationMixer(gltf.scene);
            gltf.animations.forEach((clip) => {
                GameElements.characters.animations.player[clip.name] = GameElements.characters.animations.mixerPlayer.clipAction(clip);

                switch (clip.name) {
                    case 'run':
                        GameElements.characters.animations.player[clip.name].weight = 0;
                        break;
                    case 'standBy':
                        GameElements.characters.animations.player[clip.name].weight = 0;
                        break;
                    case 'standBy2':
                        GameElements.characters.animations.player[clip.name].weight = 1;
                        break;
                    default:
                        break;
                }

                GameElements.characters.animations.player[clip.name].play();
            });
            console.log(GameElements.characters.animations.player);
        },
        undefined,
        (error) => {
            console.error(error);
        },
    );
};

const animateRun = () => {
    for (const animation of Object.values(GameElements.characters.animations.player)) {
        animation.paused = false;
    }

    GameElements.characters.animations.player.run.time = 0;
    GameElements.characters.animations.player.run.weight = 1;
    GameElements.characters.animations.player.standBy2.weight = 1;
};

const animateStandBy = () => {
    for (const animation of Object.values(GameElements.characters.animations.player)) {
        animation.paused = false;
    }
    GameElements.characters.animations.player.standBy2.time = 0;
    GameElements.characters.animations.player.run.weight = 0;
    GameElements.characters.animations.player.standBy2.weight = 1;
};

const loadRoberto = () => {
    Loader.load(Roberto, (gltf) => {
        GameElements.scene.add(gltf.scene);
        GameElements.characters.roberto = gltf.scene;
        gltf.scene.castShadow = true;
        gltf.scene.position.z = 0.5;
        gltf.scene.position.y = 4;
        gltf.scene.scale.set(1.2, 1.2, 1.2);
        gltf.scene.rotateY(Math.PI);
        gltf.scene.traverse((node) => {
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        GameElements.characters.animations.mixer = new THREE.AnimationMixer(gltf.scene);
        gltf.animations.forEach((clip) => {
            GameElements.characters.animations.mixer.clipAction(clip).play();
        });
    });
};

export const GameCharacters = { loadCharacter, loadRoberto, animateRun, animateStandBy };
