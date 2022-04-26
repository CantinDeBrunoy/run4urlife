import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Game, GlobalTypes } from '../core/global';
import { DateTime } from 'luxon';

const InterfaceDevComponent = ({ name, img, link }) => {
    useEffect(() => {}, []);
    return (
        <div className="dev" onClick={() => (window.location.href = `${link}`)}>
            <img src={img} className="devImg" placeholder="img" />
            <span className="devName">{name}</span>
        </div>
    );
};

InterfaceDevComponent.propTypes = {
    name: PropTypes.string,
    img: PropTypes.string,
    link: PropTypes.string,
};

export default InterfaceDevComponent;
