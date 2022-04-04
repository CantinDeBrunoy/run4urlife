import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { GameConsumerHook } from '../store/game.store';
import { AntialiasLabel, GameActions, PrecisionLabels } from '../common/constant';
import { GlobalTypes } from '../core/global';

const RadioComponent = ({ label }) => {
    const [GameStore, dispatch] = GameConsumerHook();
    const [active, setActive] = useState(false);

    const toggle = () => {
        switch (label) {
            case PrecisionLabels.High:
                return dispatch({ type: GameActions.precision, precision: GlobalTypes.graphismPrecision.high });
            case PrecisionLabels.Medium:
                return dispatch({ type: GameActions.precision, precision: GlobalTypes.graphismPrecision.medium });
            case PrecisionLabels.Low:
                return dispatch({ type: GameActions.precision, precision: GlobalTypes.graphismPrecision.low });
            case AntialiasLabel:
                return dispatch({ type: GameActions.antialias });
            default:
                break;
        }
    };

    useEffect(() => {
        switch (label) {
            case PrecisionLabels.High:
                if (GameStore.precision === GlobalTypes.graphismPrecision.high) return setActive(true);
                return setActive(false);
            case PrecisionLabels.Medium:
                if (GameStore.precision === GlobalTypes.graphismPrecision.medium) return setActive(true);
                return setActive(false);
            case PrecisionLabels.Low:
                if (GameStore.precision === GlobalTypes.graphismPrecision.low) return setActive(true);
                return setActive(false);
            case AntialiasLabel:
                return setActive(GameStore.antialias);
            default:
                break;
        }
    }, [GameStore]);

    return (
        <div className={`radio ${active ? 'active' : ''}`}>
            <div onClick={toggle} className="case"></div>
            <span>{label}</span>
        </div>
    );
};

RadioComponent.propTypes = {
    label: PropTypes.string,
};

export default RadioComponent;
