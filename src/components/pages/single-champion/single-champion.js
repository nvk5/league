import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../loading';
import ErrorMessage from '../../error';
import Role from './role';
import ChampDifficulty from './champion-difficulty';
import Lore from './lore';
import Abilities from './abilities';
import Skins from './skins';

import './single-champion.css';
import LeagueOfLegendsService from '../../../service/service';


export default class SingleChampion extends React.Component {
    state = {
        champion: {},
        error: false,
        loading: true
    }
    service = new LeagueOfLegendsService();

    componentDidMount() {
        window.scrollTo(0, 0);
        this.setChampion();
    }

    componentDidCatch() {
        this.setState({ error: true })
    }

    setChampion = () => {
        this.service.getChampionById(this.props.match.params.id)
            .then(champion => {
                this.setState({ champion, loading: false }, () => {
                    document.title = `${champion.name}, ${champion.title}- League of Legends`
                })
            })
            .catch(() => {
                this.setState({ error: true, champion: '' })
            })
    }

    render() {
        const { champion, error, loading } = this.state;
        if (error) {
            return <ErrorMessage />
        }
        if (loading) {
            return <Loading />
        }

        return (
            <div className="champion">
                <Champion champion={champion} />
            </div>
        )
    }
}

const Champion = ({ champion }) => {
    const { splashImage, id, name, title, tags, difficulty, blurb, lore } = champion;
    return (
        <>
            <header className="champion__header">
                <div className="champion__splash-bg">
                    <img className="champion__splash-bg-img" src={splashImage} alt={id} />
                </div>
                <div className="champion__container">
                    <Link to="/champions" className="champion__list-btn">
                        <span className="champion__list-label">Champion list</span>
                        <svg viewBox="0 0 14 15" className="champion__list-icon"><path d="M12.8 8.4V4.8S13 1.1 7 0h-.1c-6 1.1-5.8 4.8-5.8 4.8v3.6c0 1.9-.8 2.5-.8 2.5C1.5 15.3 4.5 15 4.5 15c-1.6-2.1 0-5.8 0-5.8-2.3-.3-1.9-2.7-1.7-3.4 0 0 2.2-.1 3.3 1.6v4.2l.9.9.8-.8V7.5c1.2-1.8 3.3-1.7 3.3-1.6.2.7.6 3.1-1.7 3.3 0 0 1.6 3.8 0 5.8 0 0 3 .3 4.2-4.1.1 0-.8-.6-.8-2.5z"></path></svg>
                    </Link>
                    <div className="champion__img-wrap">
                        <img className="champion__img" src={splashImage} alt={id} />
                    </div>
                    <div className="champion__details">
                        <div className="champion__details-header">
                            <h1 className="champion__name">
                                <span className="champion__name-before">{title}</span>
                                <span className="champion__name-after">{name}</span>
                            </h1>
                        </div>
                        <div className="champion__details-block left">
                            <Role role={tags} />
                            <ChampDifficulty difficulty={difficulty} />
                        </div>
                        <div className="champion__details-block right">
                            <Lore lore={lore} blurb={blurb} />
                        </div>
                    </div>
                </div>
            </header>
            <main className="champion__content">
                <Abilities champion={champion} />
                <Skins champion={champion} />
            </main>
        </>
    )
}