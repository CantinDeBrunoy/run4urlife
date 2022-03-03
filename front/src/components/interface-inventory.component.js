import React, { useEffect, useState } from 'react';
import { Game } from '../core/global';
import InterfaceInventoryBlockComponent from './interface-inventory-block.component';

const InterfaceInventoryComponent = () => {
    const inventaire = Game.player.inventory.blocks;
    const [inventory, setInventory] = useState(inventaire);
    useEffect(() => {
        inventory.map((block) => {
            console.log(block);
        });
    }, []);

    return (
        <div className="inventory">
            {inventory.map((block) => (
                <InterfaceInventoryBlockComponent key={block} />
            ))}
        </div>
    );
};

export default InterfaceInventoryComponent;
