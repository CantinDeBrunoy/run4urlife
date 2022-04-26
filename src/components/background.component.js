import React, { useEffect, useRef } from 'react';
import { BackgroundScene, renderZoomOut } from '../3d/background-scene.3d';
import { BackgroundElements, GameElements } from '../3d/global.3d';

const BackgroundComponent = () => {
    const BackgroundCanvasRef = useRef();

    useEffect(() => {
        const element = BackgroundCanvasRef.current;
        if (!BackgroundElements.scene) {
            BackgroundScene.init(BackgroundCanvasRef.current);
            BackgroundScene.render();
        } else {
            BackgroundScene.init(BackgroundCanvasRef.current);
        }
        if (window.location.pathname === '/') GameElements.reset();
        renderZoomOut();

        return () => {
            element.remove();
        };
    }, []);
    return (
        <div className="BackGround">
            <canvas ref={BackgroundCanvasRef} id="background" />
        </div>
    );
};

export default BackgroundComponent;
