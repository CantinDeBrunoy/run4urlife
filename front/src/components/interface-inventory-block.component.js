import React, { useEffect, useRef } from 'react';
import { Game } from '../core/global';
import blockImg from '../assets/models/blocks/svg/Block-3-1.svg';
import { GameConsumerHook } from '../store/game.store';
import PropTypes from 'prop-types';
import { GameActions } from '../common/constant';
import { ItemsFunctions } from '../core/functions/items';

const InterfaceInventoryBlockComponent = ({ block, index }) => {
    const [gameStore, dispatch] = GameConsumerHook();
    useEffect(() => {
        ItemsFunctions.getFileNameAndRotation(block);
    }, []);
    return (
        <div
            className={`block ${gameStore.selectedBlock === index ? 'active' : ''}`}
            onClick={() => dispatch({ type: GameActions.selectBlock, index })}
        >
            <img src={blockImg} />
        </div>
    );
};

InterfaceInventoryBlockComponent.propTypes = {
    index: PropTypes.number,
    block: PropTypes.array,
};

export default InterfaceInventoryBlockComponent;
