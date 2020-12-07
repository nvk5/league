import React from 'react';
import './video.css';

const Video = ({ source }) => {
    return (
        <video className="video" autoPlay muted loop playsInline src={source[0]}>
            {source.map((item, i) => {
                return (
                    <source key={i} src={item} type={`video/${item.endsWith('webm') ? 'webm' : 'mp4'}`} />
                )
            })}
        </video>
    )
}

export default Video;