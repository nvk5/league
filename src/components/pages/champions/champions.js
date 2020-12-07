import React from 'react';
import HeadlineSecondary from '../../headline-secondary/';
import Filter from './filter';
import ChampionCards from './champion-cards';
import ErrorMessage from '../../error';
import Loading from '../../loading';
import LeagueOfLegendsService from '../../../service/service';
import Difficulty from '../../difficulty';

import './champions.css';

const difs = [
    { id: 'low', name: <Difficulty difficulty="low" /> },
    { id: 'moderate', name: <Difficulty difficulty="moderate" /> },
    { id: 'high', name: <Difficulty difficulty="high" /> }
];

const tags = [
    { name: 'All', id: '' },
    { name: 'Assassins', id: 'Assassin' },
    { name: 'Fighters', id: 'Fighter' },
    { name: 'Mages', id: 'Mage' },
    { name: 'Marksmen', id: 'Marksman' },
    { name: 'Supports', id: 'Support' },
    { name: 'Tanks', id: 'Tank' }
]

const SEARCH = 'search';
const TAGS = 'tags';
const DIFFICULTY = 'difficulty';


export default class Champions extends React.Component {
    state = {
        selectedChamp: '',
        tagFilter: '',
        difficultyFilter: '',
        champs: [],
        error: false,
        loading: true
    }
    service = new LeagueOfLegendsService();
    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;

        this.service.getAllChampions()
            .then(champs => {
                if (this._isMounted) {
                    this.setState({ champs, loading: false }, () => {
                        document.title = `Champions - League of Legends`
                    })
                }
            })
            .catch(() => {
                this.setState({ error: true })
            });
    }

    componentDidCatch() {
        this.setState({ error: true })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    setSelectedChamp = (selectedChamp = '') => {
        this.setState({ selectedChamp })
    }

    setTagFilter = (tagFilter = '') => {
        this.setState({ tagFilter })
    }

    setDifFilter = (difficultyFilter = '') => {
        this.setState({ difficultyFilter })
    }


    renderContent = () => {
        const { selectedChamp, tagFilter, difficultyFilter, champs } = this.state;

        return (
            <>
                <Header />
                <Main
                    champs={champs}
                    selectedChamp={selectedChamp}
                    tagFilter={tagFilter}
                    difficultyFilter={difficultyFilter}
                    setSelectedChamp={this.setSelectedChamp}
                    setTagFilter={this.setTagFilter}
                    setDifFilter={this.setDifFilter}
                />
            </>
        )
    }


    render() {
        const { error, loading } = this.state;
        const errorMsg = error ? <ErrorMessage /> : null;
        const loadingStatus = loading ? <Loading /> : null;
        const content = !(loading || error) ? this.renderContent() : null;

        return (
            <div className="champions">
                {errorMsg}
                {loadingStatus}
                {content}
            </div>
        )
    }
}

const Header = () => (
    <header className="champions__header">
        <h1 className="visually-hidden">League of legends champions</h1>
        <HeadlineSecondary
            before="choose your"
            after="champion"
            desc="With more than 140 champions, you’ll find the perfect match for your playstyle. Master one, or master them all"
        />
    </header>
)

const Main = ({ champs, setSelectedChamp, setTagFilter, setDifFilter, selectedChamp, tagFilter, difficultyFilter }) => {
    return (
        <main className="champions__content">
            <div className="champions__container">
                <div className="champions__content-header">
                    <Filter type={SEARCH} data={champs} setSelectedItem={setSelectedChamp}/>
                    <Filter type={TAGS} data={tags} setSelectedItem={setTagFilter}/>
                    <Filter type={DIFFICULTY} data={difs} setSelectedItem={setDifFilter}/>
                </div>
                <div className="champions__content-body">
                    <ChampionCards
                        champs={champs}
                        selectedChamp={selectedChamp}
                        tagFilter={tagFilter}
                        difficultyFilter={difficultyFilter}
                    />
                </div>
            </div>
        </main>
    )
}