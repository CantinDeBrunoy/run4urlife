import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Characters } from '../../common/constant';
import { asyncTimeout, getRandomInt } from '../../common/helpers';

const TextRandomEffectComponent = ({ text }) => {
    const [stringArray, setStringArray] = useState([]);
    const [index, setIndex] = useState(0);
    const titleRef = useRef(null);

    const addLetter = async (letter, timeout = 100) => {
        if (letter) {
            await asyncTimeout(timeout);
            const span = document.createElement('span');

            if (letter === ' ') {
                span.innerText = '1';
            } else {
                span.innerText = letter;
            }

            titleRef.current.append(span);
        }
        if (index < stringArray.length) {
            setIndex(index + 1);
        } else {
            printText();
        }
    };

    const printText = async () => {
        const children = titleRef.current.children;

        for (let i = 0; i < stringArray.length; i++) {
            await asyncTimeout(50);

            if (stringArray[i] !== ' ') {
                children[i].innerText = stringArray[i];
            } else {
                children[i].innerText = 'A';
                children[i].classList.add('space');
            }

            for (let j = i + 1; j < children.length; j++) {
                children[j].innerText = Characters[getRandomInt(0, Characters.length - 1)];
            }
        }
    };

    useEffect(() => {
        setStringArray(text.split(''));
        let i = 0;
        const interval = setInterval(() => {
            const children = titleRef.current.children;

            for (let child of children) {
                child.innerText = Characters[getRandomInt(0, Characters.length - 1)];
            }
            i += 50;

            if (i === text.length * 100) {
                clearInterval(interval);
                return;
            }
        }, 50);
        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (stringArray.length) {
            addLetter(stringArray[index]);
        }
    }, [stringArray]);

    useEffect(() => {
        addLetter(stringArray[index]);
    }, [index]);

    return <div className="title" ref={titleRef}></div>;
};

TextRandomEffectComponent.propTypes = {
    text: PropTypes.string,
};

export default TextRandomEffectComponent;
