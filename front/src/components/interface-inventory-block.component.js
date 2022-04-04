import React, { useEffect, useRef } from 'react';
import { Game } from '../core/global';
import block from '../assets/models/blocks/svg/Block-3-1.svg';
import { GameConsumerHook } from '../store/game.store';
import PropTypes from 'prop-types';
import { GameActions } from '../common/constant';

const InterfaceInventoryBlockComponent = ({ index }) => {
    const [gameStore, dispatch] = GameConsumerHook();

    return (
        <div
            className={`block ${gameStore.selectedBlock === index ? 'active' : ''}`}
            onClick={() => dispatch({ type: GameActions.selectBlock, index })}
        >
            <img src={block} />
        </div>
    );
};

InterfaceInventoryBlockComponent.propTypes = {
    index: PropTypes.number,
};

export default InterfaceInventoryBlockComponent;
