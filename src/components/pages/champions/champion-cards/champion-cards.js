import React from 'react';
import Card from './card';

import './champion-cards.css';

function expandArray(arr) {
    const result = [];

    const recursive = (arr) => {
        arr.forEach(item => {
            Array.isArray(item) ? recursive(item) : result.push(item);
        })
    }
    recursive(arr);

    return result;
}

function checkArrayEntries(whatToSearch = [], whereToSearch = []) {
    return whatToSearch.every(elem => whereToSearch.includes(elem));
}


export default class ChampionCards extends React.Component {

    componentDidUpdate(prevProps) {
        const { champs: prevChamps, ...prevFilterParams } = prevProps;
        const { champs: currentChamps, ...currentFilterParams } = this.props;
        const prevFilter = Object.values(prevFilterParams);
        const currentFilter = Object.values(currentFilterParams);

        if (currentFilter.some((item, i) => item !== prevFilter[i])) {
            this.renderChampionCards();
        }
    }

    filterChamps = () => {
        const { champs, ...filterParams } = this.props;
        const filters = Object.values(filterParams);
        const nonEmptyFilters = filters.filter(item => item !== '').map(item => item.toLowerCase());

        if (filters.every(item => item === '')) {
            return champs;
        }

        return champs.filter(item => {
            const champFields = expandArray(Object.values(item)).map(item => {
                return item ? item.toLowerCase() : item
            });
            return checkArrayEntries(nonEmptyFilters, champFields);

        })
    }


    renderChampionCards = () => {
        const filteredChamps = this.filterChamps();

        if (filteredChamps.length === 0) {
            return (
                <div className="champion-cards__filter-fail">No champions match the filter criteria.</div>
            )
        }

        return filteredChamps.map(item => {
            const { id, cardImage, key, name } = item;
            
            return (
                <Card name={name} id={id} img={cardImage} key={key} />
            )
        })
    }

    render() {
        return (
            <div className="champion-cards">
                {this.renderChampionCards()}
            </div>
        )
    }
}