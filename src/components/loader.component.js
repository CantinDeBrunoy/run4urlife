import React, { useEffect, useRef } from 'react';

const LoaderComponent = () => {
    const spanRef = useRef();
    useEffect(() => {
        const interval = setInterval(() => {
            if (spanRef.current.innerText === '...') {
                spanRef.current.innerText = '';
            } else {
                spanRef.current.innerText += '.';
            }
        }, 500);

        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <div id="loader">
            <div>
                <span>Loading</span>
                <span ref={spanRef}></span>
            </div>
        </div>
    );
};

export default LoaderComponent;
