import React, { useEffect, useState } from 'react';
import { gameStart } from '../core/game';
import { Game } from '../core/global';
import InterfaceInventoryBlockComponent from './interface-inventory-block.component';
import refreshImg from '../assets/models/blocks/svg/refresh.svg';
import { DateTime } from 'luxon';
import { InventoryFunctions } from '../core/functions/inventory';

const InterfaceInventoryComponent = () => {
    const [inventory, setInventory] = useState([]);
    const [indexBlockActive, setIndexBlockActive] = useState(0);
    //const [rotation, setRotation] = useState(false);
    const [active, setActive] = useState(true);
    const [time, setTime] = useState(5000);

    const handleClickRefresh = () => {
        setActive(false);
        InventoryFunctions.init();
        let tmp = time;
        const interval = setInterval(() => {
            if (tmp === 0) {
                setActive(true);
                clearInterval(interval);
                setTime(5000);
                return;
            }
            tmp -= 1000;
            setTime(tmp);
        }, 1000);
    };

    useEffect(() => {
        setInterval(() => {
            setInventory([...Game.player.inventory.blocks]);
        }, 1000);
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
            <div className="container">
                <img src={refreshImg} className={` refreshButton ${active ? 'active' : ''}`} onClick={handleClickRefresh} />
                <span style={{ color: 'white' }}>{DateTime.fromMillis(time).setLocale('fr').toFormat('s')}</span>
            </div>
        </div>
    );
};

export default InterfaceInventoryComponent;
