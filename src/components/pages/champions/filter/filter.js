import React, { useEffect, useState } from 'react';
import Select from '../select';
import Search from './search.svg'
import DropDown from './dropdown.svg';

import './filter.css';

const TagFilterLgScreen = ({ data, onTagSelected, activeIndex }) => (
    <ul className="tag-filter">
        {data.map(({ id, name }, i) => (
            <li key={id} className="tag-filter__item">
                <button
                    onClick={() => onTagSelected(id, i)}
                    className={activeIndex === i ? "tag-filter__button active" : "tag-filter__button"}>
                    {name}
                </button>
            </li>
        ))}
    </ul>
)

const Filter = ({ type, data, setSelectedItem }) => {
    const [options, setOptions] = useState([]);
    const [activeIndex, setActiveIndex] = useState(type === 'tags' ? 0 : null);

    useEffect(() => {
        setOptions(data.map(({ id, name }) => ({ value: id, label: name })));
    }, [data])

    const setSelected = selectedOption => {
        selectedOption ? setSelectedItem(selectedOption.value) : setSelectedItem();
    }

    const onTagSelected = (item, index) => {
        setActiveIndex(index);
        setSelectedItem(item);
    }
    const filterPlaceholder = type === 'search' ? 'Search' :
        type === 'tags' ? 'All roles' :
            'All difficulties';

    return (
        <>
            {type === 'tags' ? <TagFilterLgScreen data={data} onTagSelected={onTagSelected} activeIndex={activeIndex} /> : null}
            <Select
                type={type}
                dropdown={type === 'search' ? Search : DropDown}
                placeholder={filterPlaceholder}
                data={options}
                setSelectedItem={setSelected}
            />
        </>
    )
}

export default Filter;
