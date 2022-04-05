import React, { useEffect, useRef, useState } from 'react';
import { Game } from '../core/global';
//
import { GameConsumerHook } from '../store/game.store';
import PropTypes from 'prop-types';
import { GameActions } from '../common/constant';
import { ItemsFunctions } from '../core/functions/items';
import blockImg41 from '../assets/models/blocks/svg/Block-4-1.svg';
import blockImg31 from '../assets/models/blocks/svg/Block-3-1.svg';
import blockImg22 from '../assets/models/blocks/svg/Block-2-2.svg';
import blockImg21 from '../assets/models/blocks/svg/Block-2-1.svg';

const InterfaceInventoryBlockComponent = ({ block, index }) => {
    const [blockImg, setBlockImg] = useState();
    const [blockRotation, setBlockRotation] = useState();
    const [gameStore, dispatch] = GameConsumerHook();

    useEffect(() => {
        if (!ItemsFunctions.isBlock(block)) return;
        const blockTypes = ItemsFunctions.getFileNameAndRotation(block);
        //trouver le bon block
        if (blockTypes.fileName === 'Block-2-1') {
            setBlockImg(blockImg21);
        } else if (blockTypes.fileName === 'Block-2-2') {
            setBlockImg(blockImg22);
        } else if (blockTypes.fileName === 'Block-3-1') {
            setBlockImg(blockImg31);
        } else if (blockTypes.fileName === 'Block-4-1') {
            setBlockImg(blockImg41);
        }
        //trouver la bonne rotation
        setBlockRotation(blockTypes.rotation);
    }, [block]);

    if (ItemsFunctions.isBlock(block)) {
        return (
            <div
                className={`block ${gameStore.selectedBlock === index ? 'active' : ''}`}
                onClick={() => dispatch({ type: GameActions.selectBlock, index })}
            >
                <img src={blockImg} className={`rotation` + blockRotation} />
            </div>
        );
    }
    return <div></div>;
};

InterfaceInventoryBlockComponent.propTypes = {
    index: PropTypes.number,
    block: PropTypes.array,
};

export default InterfaceInventoryBlockComponent;
