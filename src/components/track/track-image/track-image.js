import React from 'react';
import './track-image.css';
import { trackImageData } from '../../../service/fakeData';
import useRandom from '../../useRandom/useRandom';

const classes = [
    'track-image-animate_1',
    'track-image-animate_2',
    'track-image-animate_3',
    'track-image-animate_4'
];

const TrackImage = ({ currentTrack }) => {
    const animation = useRandom(classes, currentTrack, '');

    return (
        <div className="track-image">
            {trackImageData.map(({ link, name, description, id }, index) => {
                return (
                    <div key={id} className={index === currentTrack ? "track-image__wrap show" : "track-image__wrap"}>
                        <div className={index === currentTrack ? `track-image__overlay ${animation}` : `track-image__overlay`}></div>
                        <figure>
                            <img src={link} alt={name} />
                            <figcaption className="track-image__label">
                                <span className="track-image__name">{name}</span>
                                <span className="track-image__desc">{description}</span>
                            </figcaption>
                        </figure>
                    </div>
                )
            })}
        </div>
    )
}

export default TrackImage