import React from 'react';
import BackgroundComponent from '../components/background.component';
import InterfaceMenuComponent from '../components/menu/interface-menu.component';

const MenuPage = () => {
    return (
        <div>
            <BackgroundComponent />
            <InterfaceMenuComponent isMain />
        </div>
    );
};

export default MenuPage;
