import React, { useEffect, useState } from 'react';
import { Game } from '../core/global';
import InterfaceInventoryBlockComponent from './interface-inventory-block.component';

const InterfaceInventoryComponent = () => {
    const [inventory, setInventory] = useState([]);
    const [indexBlockActive, setIndexBlockActive] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setInventory(Game.player.inventory.blocks);
        }, 100);
    }, []);

    return (
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
    );
};

export default InterfaceInventoryComponent;
