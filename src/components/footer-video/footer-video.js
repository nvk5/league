import React from 'react';
import { Link } from 'react-router-dom';
import './footer-video.css';
import _1 from '../../media/ss2020_kaisa_1920x1080.mp4';
import _2 from '../../media/ss2020_kaisa_ez_1920x1080.mp4';
import _3 from '../../media/ss2020_sylas_garen_lux_1920x1080.mp4';
import _4 from '../../media/ss2020_urgot_vi_cait_1920x1080.mp4'
import _5 from '../../media/ss2020_galio_lux_1920x1080.mp4';
import Button from '../button';
import useRandom from '../useRandom/useRandom';

const videos = [_1, _2, _3, _4, _5];

const FooterVideo = ({ location: { pathname } }) => {
    const randomVideo = useRandom(videos, pathname, '')

    return (
        <div className="footer-video">
            <video className="footer-video__item" autoPlay loop muted playsInline src={randomVideo}>
                <source type="video/mp4" src={randomVideo} />
            </video>
            <div className="footer-video__btn">
                <Button>
                    <Link to="/champions">Play for free</Link>
                </Button>
            </div>
        </div>
    )
}

export default FooterVideo