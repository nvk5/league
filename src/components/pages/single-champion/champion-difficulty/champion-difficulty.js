import React from 'react';
import Difficulty from '../../../difficulty';
import './champion-difficulty.css';

const ChampDifficulty = ({ difficulty }) => {
    return (
        <div className="champion-difficulty">
            <Difficulty difficulty={difficulty} size="sm" />
            <div className="champion-difficulty__title-wrap">
                <span>difficulty</span>
                <span className="champion-difficulty__title">{difficulty}</span>
            </div>
        </div>
    )
}

export default ChampDifficulty;