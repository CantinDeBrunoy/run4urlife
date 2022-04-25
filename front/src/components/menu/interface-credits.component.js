import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RadioComponent from '../radio.component';
import { useNavigate } from 'react-router-dom';
import { DifficultiesLabels, infosDescritpion, HelpLabels } from '../../common/constant';
import clement from '../../assets/models/blocks/svg/clement.jpg';
import cantin from '../../assets/models/blocks/svg/cantin.png';
import PierreC from '../../assets/models/blocks/svg/PierreC.jpg';
import PierreH from '../../assets/models/blocks/svg/PierreH.jpg';
import tom from '../../assets/models/blocks/svg/tom.jpg';

import github from '../../assets/models/blocks/svg/git.svg';

import { renderZoomOut } from '../../3d/background-scene.3d';
import InterfaceDevComponent from '../interface-credits-dev.component';

const InterfaceCreditComponent = ({ toggle }) => {
    const navigate = useNavigate();

    return (
        <div className="credits">
            <div>Run4urLife</div>
            <div>{`Eleves en LP dev web et mobile à l'université de CYU. Voici notre second projet de l'année visant à faire un jeu sur navigateur.`}</div>
            <div className="github" onClick={() => (window.location.href = 'https://github.com/CantinDeBrunoy/run4urlife')}>
                <img className="githubImg" src={github} />
                <span>GitHub</span>
            </div>
            <div>{`L'équipe :`}</div>
            <div className="devTeam">
                <InterfaceDevComponent name="Cantin" img={cantin} link="https://github.com/CantinDeBrunoy/" />
                <InterfaceDevComponent name="Clement" img={clement} link="https://github.com/goodfoodtruck" />
                <InterfaceDevComponent name="Pierre C" img={PierreC} link="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
                <InterfaceDevComponent name="Pierre H" img={PierreH} link="https://github.com/PierreHervelin" />
                <InterfaceDevComponent name="Tom" img={tom} link="https://github.com/TomBagiau" />
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
    );
};

InterfaceCreditComponent.propTypes = {
    toggle: PropTypes.func,
};

export default InterfaceCreditComponent;
