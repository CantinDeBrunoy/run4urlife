import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Game, GlobalTypes } from '../core/global';
import Roberto from '../assets/models/MonsterRun4UrLife.glb';
import { Loader } from '../3d/global.3d';
import LoaderComponent from '../components/loader.component';

const BonusPage = () => {
    const canvasRef = useRef();

    useEffect(() => {
        const element = canvasRef.current;
        const scene = new THREE.Scene();
        let mixer, animation, model;
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 2);

        const clock = new THREE.Clock();

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: Game.graphism.antialias ? Game.graphism.antialias : false,
            precision: Game.graphism.precision ? Game.graphism.precision : GlobalTypes.graphismPrecision.low,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio, 2);

        const light = new THREE.DirectionalLight(0xffffff, 5);
        light.castShadow = true;

        scene.add(light);

        Loader.load(Roberto, (gltf) => {
            model = gltf.scene;

            model.position.z = -50;

            mixer = new THREE.AnimationMixer(model);
            animation = mixer.clipAction(gltf.animations[0]);

            animation.play();
            console.log(model);

            scene.add(model);
        });

        document.body.appendChild(renderer.domElement);

        const interval = setInterval(() => {
            const delta = clock.getDelta();
            if (mixer) mixer.update(delta / 2);

            if (model) {
                if (model.position.z < -10) model.position.z += 0.05;
                light.lookAt(new THREE.Vector3(model.position.x, model.position.y, model.position.z));
            }

            renderer.render(scene, camera);
        }, 1000 / 60);

        return () => {
            element.remove();
            clearInterval(interval);
        };
    }, []);
    return (
        <div>
            <canvas ref={canvasRef} id="bonus" />
            <LoaderComponent />
        </div>
    );
};

export default BonusPage;
