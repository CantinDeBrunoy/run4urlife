import * as THREE from 'three';
import MainCharacter from '../assets/models/mainCharacter.glb';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { GameElements } from './global.3d';
import Roberto from '../assets/models/MonsterRun4UrLife.glb';
import { GameStep } from '../common/constant';

const loadCharacter = () => {
    const loader = new GLTFLoader();

    loader.load(
        MainCharacter,
        (gltf) => {
            window.addEventListener('keyup', startAnim);
            GameElements.scene.add(gltf.scene);
            GameElements.characters.alien = gltf.scene;
            gltf.scene.castShadow = true;
            gltf.scene.traverse((node) => {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
            });
        },
        undefined,
        (error) => {
            console.error(error);
        },
    );
};

const startAnim = (e) => {
    switch (e.keyCode) {
        case 32:
            console.log('space pressed');
    }
};

const loadRoberto = () => {
    const loader = new GLTFLoader();

    loader.load(Roberto, (gltf) => {
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
        console.log(gltf);
        GameElements.characters.animations.mixer = new THREE.AnimationMixer(gltf.scene);
        gltf.animations.forEach((clip) => {
            GameElements.characters.animations.mixer.clipAction(clip).play();
        });
    });
};

export const GameCharacters = { loadCharacter, loadRoberto };
