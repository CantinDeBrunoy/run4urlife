import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RadioComponent from '../radio.component';
import { useNavigate } from 'react-router-dom';
import { DifficultiesLabels, infosDescritpion, HelpLabels } from '../../common/constant';
import { Game } from '../../core/global';
import { renderZoomOut } from '../../3d/background-scene.3d';
import refresh from '../../assets/models/blocks/svg/refresh.svg';

const InterfaceHelpComponent = ({ toggle }) => {
    const navigate = useNavigate();
    const [help, setHelp] = useState();

    return (
        <div className="settings difficulty">
            <div className="difficulty_leftSide">
                <h3>Aides</h3>
                <div className="container">
                    <div onClick={() => setHelp('Lore')}>
                        <RadioComponent label={HelpLabels.Lore} />
                    </div>
                    <div onClick={() => setHelp('Keys')}>
                        <RadioComponent label={HelpLabels.Keys} />
                    </div>
                    <div onClick={() => setHelp('Goal')}>
                        <RadioComponent label={HelpLabels.Goal} />
                    </div>
                </div>
                <ul>
                    <div
                        onClick={() => {
                            toggle();
                            renderZoomOut();
                        }}
                    >
                        <div>Retour</div>
                    </div>
                </ul>
            </div>
            {help && (
                <div className="difficulty_rightSide">
                    {help != 'Keys' && <span>{infosDescritpion[`${help}`]}</span>}
                    {help === 'Keys' && (
                        <div>
                            <div>
                                <div>Touches</div>
                                <br />
                            </div>
                            <div>
                                <div>KEY-UP et Z</div>
                                <div>monter dans l inventaire</div>
                                <div>---------</div>
                            </div>
                            <div>
                                <div>KEY-DOWN et S</div>
                                <div>Descendre dans l inventaire</div>
                                <div>---------</div>
                            </div>
                            <div>
                                <div>CTRL et R</div>
                                <div>Rafraichir l inventaire</div>
                                <div>---------</div>
                            </div>
                            <div>
                                <div>ECHAP</div>
                                <div>Mettre en pause le jeu</div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

InterfaceHelpComponent.propTypes = {
    toggle: PropTypes.func,
};

export default InterfaceHelpComponent;
