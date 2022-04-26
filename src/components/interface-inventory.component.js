import React, { useEffect, useState } from 'react';
import { Game, GlobalTypes } from '../core/global';
import InterfaceInventoryBlockComponent from './interface-inventory-block.component';
import refreshImg from '../assets/models/blocks/svg/refresh.svg';
import { InventoryFunctions } from '../core/functions/inventory';
import { GameConsumerHook } from '../store/game.store';
import { GameActions } from '../common/constant';

const InterfaceInventoryComponent = () => {
    const [gameStore, dispatch] = GameConsumerHook();
    const [inventory, setInventory] = useState([]);
    const [indexBlockActive, setIndexBlockActive] = useState(0);

    const handleClickRefresh = () => {
        if (Game.state === GlobalTypes.states.playing) {
            dispatch({ type: GameActions.refreshInventory });
            InventoryFunctions.init();
            let tmp = gameStore.inventoryRefreshCooldown;
            const interval = setInterval(() => {
                if (tmp === 0) {
                    dispatch({ type: GameActions.activeRefreshInventory });
                    clearInterval(interval);
                    dispatch({ type: GameActions.setInventoryRefreshCooldown, time: 5 });
                    return;
                }
                if (Game.state === GlobalTypes.states.playing) {
                    tmp -= 1;
                    dispatch({ type: GameActions.setInventoryRefreshCooldown, time: tmp });
                }
            }, 1000);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setInventory([...Game.player.inventory.blocks]);
        }, 200);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="inventoryContainer">
            <div className="inventory">
                {inventory.map((block, i) => (
                    <InterfaceInventoryBlockComponent
                        key={i}
                        index={i}
                        block={block}
                        indexBlockActive={indexBlockActive}
                        setIndexBlockActive={setIndexBlockActive}
                    />
                ))}
            </div>
            <div onClick={handleClickRefresh} className={`container ${gameStore.isInventoryRefresh ? 'active' : ''}`}>
                <img src={refreshImg} className="refreshButton" />
                <span>{gameStore.inventoryRefreshCooldown}</span>
            </div>
        </div>
    );
};

export default InterfaceInventoryComponent;
