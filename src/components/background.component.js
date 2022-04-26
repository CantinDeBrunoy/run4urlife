import React, { useEffect, useRef } from 'react';
import { BackgroundScene, renderZoomOut } from '../3d/background-scene.3d';
import { BackgroundElements, GameElements } from '../3d/global.3d';

const BackgroundComponent = () => {
    const BackgroundCanvasRef = useRef();

    useEffect(() => {
        BackgroundScene.init(BackgroundCanvasRef.current);
        BackgroundScene.render();
        GameElements.reset();
        renderZoomOut();
    }, []);
    return (
        <div className="BackGround">
            <canvas ref={BackgroundCanvasRef} id="background" />
        </div>
    );
};

export default BackgroundComponent;
