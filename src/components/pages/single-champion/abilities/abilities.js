import React, { useState } from 'react';
import Track from '../../../track';
import TrackVideo from '../../../track/track-video';
import TrackDetails from '../../../track/track-details';

import './abilities.css';

const Abilities = ({ champion: { spells } }) => {
    const [currentTrack, setCurrentTrack] = useState(0);

    const setTrack = (current = 0) => setCurrentTrack(current)

    return (
        <section className="abilities">
            <div className="abilities__block abilities__block--details">
                <h2 className="abilities__headline">Abilities</h2>
                <div className="abilities__track">
                    <Track data={spells} setCurrentTrack={setTrack} />
                </div>
                <div className="abilities__details">
                    <TrackDetails currentSpell={spells[currentTrack]} />
                </div>
            </div>
            <div className="abilities__block abilities__block--video">
                <TrackVideo data={spells} currentTrack={currentTrack} />
            </div>
        </section>
    )
}

export default Abilities;