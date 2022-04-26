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
            GameElements.characters.animations.mixerPlayer = new THREE.AnimationMixer(gltf.scene);
            GameElements.characters.animations.player.push(gltf.animations[1]);
        },
        undefined,
        (error) => {
            console.error(error);
        },
    );
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

export const GameCharacters = { loadCharacter, loadRoberto };
