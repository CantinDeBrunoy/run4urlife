import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const TextAppearComponent = ({ text, nameClass, duration, index }) => {
    const [stringArray, setStringArray] = useState([]);

    useEffect(() => {
        console.log(text);
        setStringArray(text.split(''));
    }, [text]);

    return (
        <div className={nameClass}>
            {stringArray.map((letter, i) => (
                <motion.span
                    key={`${index}-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{
                        duration: duration ? duration : 5,
                        times: [0, 0.05, 0.95, 1],
                        delay: i * 0.1,
                    }}
                >
                    {letter}
                </motion.span>
            ))}
        </div>
    );
};

TextAppearComponent.propTypes = {
    text: PropTypes.string,
    nameClass: PropTypes.string,
    duration: PropTypes.number,
    index: PropTypes.number,
};

export default TextAppearComponent;
