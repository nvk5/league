import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import HeadlineSecondary from '../../../headline-secondary/';
import Button from '../../../button';
import './home-map.css';

import map from '../../../../media/map.png';

function checkVisibility(elem) {
    const windowScroll = window.pageYOffset;
    const windowScrollBottom = windowScroll + document.documentElement.clientHeight;
    const elemTop = elem.offsetTop + elem.offsetHeight / 3;
    const elemBottom = elemTop + elem.offsetHeight;

    return windowScrollBottom >= elemTop && windowScroll <= elemBottom
}

const Map = () => {
    const [mapBlockVisibility, setMapBlockVisibility] = useState(false);
    const mapBlock = useRef(null);
    const mapImage = useRef(null);

    useEffect(() => {
        window.addEventListener('scroll', showMap);

        return () => {
            window.removeEventListener('scroll', showMap);
        }
    }, [])

    const showMap = () => {
        if (checkVisibility(mapBlock.current)) {
            setMapBlockVisibility(true)
        } else {
            setMapBlockVisibility(false)
        }
    }

    const moveImage = event => {
        mapImage.current.style.transform = `translateX(${-event.clientX / 100 + 10}px)`
    }

    return (
        <section onMouseMove={moveImage} className="home-map">
        <div className="home-map__container">
            <div ref={mapBlock} className={mapBlockVisibility ? "home-map__item show" : "home-map__item"}>
                <img ref={mapImage} src={map} alt="map" />
            </div>
            <div className="home-map__header">
                <div className="home-map__headline">
                    <HeadlineSecondary
                        before="start your"
                        after="legend"
                        desc="New to League? Get a rundown on the basics for the most popular game mode."
                    />
                </div>
                <div className="home-map__btns">
                    <Button brown>
                        <Link to="/champions">get started</Link>
                    </Button>
                    <Button>
                        <Link to="/champions">Play for free</Link>
                    </Button>
                </div>
            </div>
        </div>
    </section>
    )
}

export default Map
