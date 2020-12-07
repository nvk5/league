import React from 'react';
import './track-details.css';

const TrackDetails = ({ currentSpell }) => {
    const { id, activeKey, name, description } = currentSpell;
    return (
        <div key={id} className="track-details">
            <span className="track-details__key">{activeKey}</span>
            <h3 className="track-details__name">{name}</h3>
            <p className="track-details__desc">{description}</p>
        </div>
    )
}

export default TrackDetails;