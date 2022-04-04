import * as THREE from 'three';
import { GameStep } from '../common/constant';
import { CharacterFunctions } from '../core/functions/character';
import { GameElements } from './global.3d';

const loadPlayerVision = () => {
    const vision = CharacterFunctions.getVision();

    for (const [dir, value] of Object.entries(vision)) {
        if (value) {
            const geometry = new THREE.PlaneGeometry(GameStep, GameStep);
            const edgesGeometry = new THREE.EdgesGeometry(geometry);
            const material = new THREE.LineBasicMaterial({ color: 'yellow' });
            const edges = new THREE.LineSegments(edgesGeometry, material);

            edges.rotateX(Math.PI / 2);

            switch (dir) {
                case 'left':
                    edges.position.x = -GameStep;
                    edges.position.z = GameStep * CharacterFunctions.getFrontPosition().y;
                    break;
                case 'right':
                    edges.position.x = GameStep;
                    edges.position.z = GameStep * CharacterFunctions.getFrontPosition().y;
                    break;
                case 'top':
                    edges.position.x = CharacterFunctions.getFrontPosition().x;
                    edges.position.z = GameStep * (CharacterFunctions.getFrontPosition().y - 1);
                    break;
                default:
                    break;
            }
            GameElements.blocks.vision[dir] = edges;
            GameElements.scene.add(edges);
        }
    }
};

export const GameBlocks = { loadPlayerVision };
