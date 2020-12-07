import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import HeadlineSecondary from '../../../headline-secondary/';
import Button from '../../../button';
import Track from '../../../track';
import TrackImage from '../../../track/track-image';
import TrackVideo from '../../../track/track-video';

import { classes } from '../../../../service/fakeData';

import './home-classes.css';

const ClassBg = ({ currentTrack }) => (
    <>
        {classes.map((item, index) => {
            return (
                <div
                    key={`${item.id}-${index}`}
                    dangerouslySetInnerHTML={{ __html: classes[index].image }}
                    className={currentTrack === index ? "home-classes__class show" : "home-classes__class"}>
                </div>
            )
        })}
    </>
)

const HomeClasses = () => {
    const [currentTrack, setCurrentTrack] = useState(0);

    const setTrack = (current = 0) => setCurrentTrack(current);

    return (
        <section className="home-classes">
            <div className="home-classes__headline">
                <HeadlineSecondary
                    before="choose your"
                    after="champion"
                    desc="Whether you like to dive straight into the fray, support your teammates, or something in between, there’s a spot for you on the Rift."
                />
            </div>
            <div className="home-classes__btn">
                <Button sm brown>
                    <Link to="/champions">Discover more champions</Link>
                </Button>
                <Button sm>
                    <Link to="/champions">play now</Link>
                </Button>
            </div>
            <div className="home-classes__block">
                <div className="home-classes__bg">
                    <ClassBg currentTrack={currentTrack} />
                </div>
                <div className="home-classes__track">
                    <Track slide fake data={classes} setCurrentTrack={setTrack} />
                    <div className="home-classes__track-video">
                        <TrackVideo data={classes} currentTrack={currentTrack} />
                    </div>
                </div>
                <div className="home-classes__img">
                    <TrackImage currentTrack={currentTrack} />
                </div>
            </div>
        </section>
    )
}

export default HomeClasses;