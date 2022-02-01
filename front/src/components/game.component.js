import React, { useEffect, useRef } from 'react';
import scene3d from '../3d/scene.3d';

const GameComponent = () => {
    const canvas = useRef();
    useEffect(() => {
        scene3d.init(canvas.current);
        scene3d.addHelpers();
        scene3d.render();
    }, []);
    return (
        <div>
            <canvas ref={canvas} id="game" />
        </div>
    );
};

export default GameComponent;
