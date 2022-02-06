import * as THREE from 'three';
import MainCharacter from '../assets/models/mainCharacter3.glb';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GameElements } from './global.3d';

const loadCharacter = () => {
    const loader = new GLTFLoader();

    loader.load(
        MainCharacter,
        (gltf) => {
            GameElements.scene.add(gltf.scene);
            GameElements.characters.alien = gltf.scene;
            gltf.scene.castShadow = true;
            gltf.scene.traverse((node) => {
                if (node.isMesh) {
                    node.castShadow = true;
                    //node.receiveShadow = true;
                }
            });
        },
        undefined,
        (error) => {
            console.error(error);
        },
    );
};

export const GameCharacters = { loadCharacter };
