import React, { useEffect, useRef, useState } from 'react';
import './skins.css';

import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';

const Skins = ({ champion: { skins } }) => {
    const [isSmScreen, setCheckSmScreen] = useState(false);
    const slider = useRef(null);

    useEffect(() => {
        checkDeviceWidth();
        window.addEventListener('resize', checkDeviceWidth);

        new Glide(slider.current, {
            type: 'carousel',
            perView: 1,
            animationDuration: 100,
            dragDistance: false
        }).mount()

        return () => {
            window.removeEventListener('resize', checkDeviceWidth);
        }
    }, [])

    const checkDeviceWidth = () => {
        if (window.matchMedia('(max-width: 991.98px)').matches) {
            setCheckSmScreen(true);
        } else {
            setCheckSmScreen(false);
        }
    }

    return (
        <section className="skins">
            {isSmScreen ? <h2 className="skins__headline">Available skins</h2> : null}
            <div className="skins__container">
                <div className="glide skins__slider" ref={slider}>
                    <div className="skins__aside">
                        <h2 className="skins__headline lg">Available skins</h2>
                        <div className="glide__bullets skins__bullets" data-glide-el="controls[nav]">
                            {skins.map(({ id, image, name }, i) => {
                                return (
                                    <button key={id} className="glide__bullet skins__thumb-btn" data-glide-dir={`=${i}`}>
                                        <div className="skins__thumb-img-wrap">
                                            <img className="skins__thumb-img" src={image} alt={name} />
                                        </div>
                                        <p className="skins__name">{name}</p>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                    <div className="glide__track skins__slides" data-glide-el="track">
                        <ul className="glide__slides skins__slides-list">
                            {skins.map(({ id, image, name }, i) => {
                                return (
                                    <li key={id} className="glide__slide skin__slides-item">
                                        <img className="skins__img" src={image} alt={name} />
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Skins;