import React, { useEffect, useRef } from 'react';
import { BackgroundScene } from '../3d/background-scene.3d';

const BackgroundComponent = () => {
    const BackgroundCanvasRef = useRef();

    useEffect(() => {
        BackgroundScene.init(BackgroundCanvasRef.current);
        BackgroundScene.render();
    }, []);
    return (
        <div className="BackGround">
            <canvas ref={BackgroundCanvasRef} id="background" />
        </div>
    );
};

export default BackgroundComponent;
