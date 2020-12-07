import React from 'react';
import styled from 'styled-components';

const Dif = styled.div`
    .dif {
        width: 100%;
        display: flex;
    }

    .dif__item {
        width: ${props => props.size === 'sm' ? '20px' : '35%'};
        height: 15px;
        transform: skew(-45deg);
        background: rgb(8, 215, 247);
        padding: 0 10px;
        margin: 0 5px;
        opacity: 1;
    }

    .dif__item:nth-child(2) {
        opacity: ${props => props.dif === 'low' ? '.2' : '1'}
    }
    .dif__item:nth-child(3) {
        opacity: ${props => props.dif === 'low' || props.dif === 'moderate' ? '.2' : '1'}
    }
`

const Difficulty = ({ difficulty, size }) => (
    <Dif dif={difficulty} size={size}>
        <div className="dif">
            <span className="dif__item"></span>
            <span className="dif__item"></span>
            <span className="dif__item"></span>
        </div>
    </Dif>
)

export default Difficulty;