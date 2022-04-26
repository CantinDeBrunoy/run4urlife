import * as THREE from 'three';
import galaxyTexture from '../assets/models/planetTexture/galaxy.png';
import cloudsTexture from '../assets/models/planetTexture/earthCloud.png';
import planetTexture from '../assets/models/planetTexture/marsmap.jpg';
import { BackgroundElements } from './global.3d.js';

const loadPlanet = () => {
    // earth geometry
    const earthGeometry = new THREE.SphereGeometry(1, 64, 64);

    // earth material
    const earthMaterial = new THREE.MeshPhongMaterial({
        roughness: 1,
        metalness: 0,
        map: THREE.ImageUtils.loadTexture(planetTexture),
        bumpScale: 0.3,
    });

    // earth mesh
    BackgroundElements.items.earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    BackgroundElements.scene.add(BackgroundElements.items.earthMesh);

    // cloud Geometry
    const cloudGeometry = new THREE.SphereGeometry(1.06, 64, 64);

    // cloud metarial
    const cloudMetarial = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture(cloudsTexture),
        transparent: true,
    });

    // cloud mesh
    BackgroundElements.items.cloudMesh = new THREE.Mesh(cloudGeometry, cloudMetarial);
    BackgroundElements.scene.add(BackgroundElements.items.cloudMesh);
};

const loadStars = () => {
    // galaxy geometry
    const starGeometry = new THREE.SphereGeometry(80, 64, 64);

    // galaxy material
    const starMaterial = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture(galaxyTexture),
        side: THREE.BackSide,
    });

    // galaxy mesh
    BackgroundElements.items.starMesh = new THREE.Mesh(starGeometry, starMaterial);
    BackgroundElements.scene.add(BackgroundElements.items.starMesh);
};

const animate = () => {
    if (BackgroundElements.items.starMesh) BackgroundElements.items.starMesh.rotation.y -= 0.0005;
    if (BackgroundElements.items.earthMesh) BackgroundElements.items.earthMesh.rotation.y -= 0.00035;
    if (BackgroundElements.items.cloudMesh) BackgroundElements.items.cloudMesh.rotation.y -= 0.0005;
};

const loadLights = () => {
    const ambientlight = new THREE.AmbientLight(0xffffff, 0.9);
    BackgroundElements.scene.add(ambientlight);
};

export const GamePlanet = { loadPlanet, loadStars, animate, loadLights };
