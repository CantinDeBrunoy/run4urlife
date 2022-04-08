import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { GameConsumerHook } from '../store/game.store';
import { AntialiasLabel, GameActions, PrecisionLabels, DifficultiesLabels, HelpLabels } from '../common/constant';
import { GlobalTypes } from '../core/global';

const RadioComponent = ({ label }) => {
    const [GameStore, dispatch] = GameConsumerHook();
    const [active, setActive] = useState(false);

    const toggle = () => {
        switch (label) {
            case DifficultiesLabels.Easy:
                return dispatch({ type: GameActions.difficulty, difficulty: GlobalTypes.difficulties.easy });
            case DifficultiesLabels.Average:
                return dispatch({ type: GameActions.difficulty, difficulty: GlobalTypes.difficulties.average });
            case DifficultiesLabels.Hard:
                return dispatch({ type: GameActions.difficulty, difficulty: GlobalTypes.difficulties.hard });
            case DifficultiesLabels.Impossible:
                return dispatch({ type: GameActions.difficulty, difficulty: GlobalTypes.difficulties.impossible });

            case HelpLabels.Lore:
                return dispatch({ type: GameActions.help, help: GlobalTypes.infos.Lore });
            case HelpLabels.Keys:
                return dispatch({ type: GameActions.help, help: GlobalTypes.infos.Keys });
            case HelpLabels.Goal:
                return dispatch({ type: GameActions.help, help: GlobalTypes.infos.Goal });

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
            case DifficultiesLabels.Easy:
                if (GameStore.difficulty === GlobalTypes.difficulties.easy) return setActive(true);
                return setActive(false);
            case DifficultiesLabels.Average:
                if (GameStore.difficulty === GlobalTypes.difficulties.average) return setActive(true);
                return setActive(false);
            case DifficultiesLabels.Hard:
                if (GameStore.difficulty === GlobalTypes.difficulties.hard) return setActive(true);
                return setActive(false);
            case DifficultiesLabels.Impossible:
                if (GameStore.difficulty === GlobalTypes.difficulties.impossible) return setActive(true);
                return setActive(false);

            case HelpLabels.Lore:
                if (GameStore.help === GlobalTypes.infos.Lore) return setActive(true);
                return setActive(false);
            case HelpLabels.Keys:
                if (GameStore.help === GlobalTypes.infos.Keys) return setActive(true);
                return setActive(false);
            case HelpLabels.Goal:
                if (GameStore.help === GlobalTypes.infos.Goal) return setActive(true);
                return setActive(false);

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
