import React from 'react';
import PropTypes from 'prop-types';

const Toggle = ({ visible, children }) => {
    let className = 'toggle';
    if (!visible) {
        className += ' out';
    }
    return <div className={className}>{children}</div>;
};

Toggle.propTypes = {
    visible: PropTypes.bool,
    children: PropTypes.element,
};

export default Toggle;
