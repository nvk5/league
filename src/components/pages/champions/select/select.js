import React from 'react';
import CloseButton from '../close-button';
import ReactSelect, {components} from 'react-select';

export default class Select extends React.Component {
    render() {
        const {type, placeholder, setSelectedItem, data, dropdown } = this.props;

        const customStyles = {
            option: (provided, state) => ({
                ...provided,
                color: state.isSelected ? '#fff' : '#000',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: state.isSelected ? '#00a0ba' : 'transparent',
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: 'rgba(0,0,0, .1)'
                },
            }),
            menu: (provided, state) => ({
                position: 'absolute',
                width: '100%',
                height: 'auto',
                minHeight: '50px',
                maxHeight: '300px',
                zIndex: '2',
                top: type === 'difficulty' ? '90%' : '100%',
                left: '0px',
                background: '#fff',
                boxShadow: '0 0 0 2px rgb(193, 193, 193)'
            }),
            menuList: (provided, state) => ({
                ...provided,
                height: '100%',
                padding: '0'
            }),
            container: () => ({
                textTransform: 'uppercase',
                position: 'relative',
            }),
            control: () => ({
                cursor: 'pointer',
                height: '100%',
                padding: '0 30px 0 60px',
                display: 'flex',
                justifyContent: 'space-between',
            }),
            valueContainer: () => ({
                height: '100%',
            }),
            placeholder: (provided, state) => ({
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                color: state.isFocused ? 'rgb(202, 202, 202)' : '#000',
                transition: 'color 250ms ease 0s'
            }),
            input: (provided, state) => ({
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
            }),
            dropdownIndicator: (provided, state) => ({
                ...provided,
                position: 'absolute',
                left: '15px',
                top: '50%',
                transition: 'transform .3s ease',
                transform: state.selectProps.menuIsOpen ? 'translate(-8px, -50%)' : 'translate(0, -50%)'
            }),
            indicatorSeparator: (provided,state) => ({
                ...provided,
                position: 'absolute',
                backgroundColor: 'rgb(193,193,193)',
                left: type === 'diffculty' ? '-2px' : type === 'search' ? '100%' : '0',
                margin: '0px',
                height: '100%',
                width: '2px',
                transition: 'transform .3s ease',
                transformOrigin: 'center',
                transform: state.selectProps.menuIsOpen ? 'scale(1)' : 'scale(0.5)'
            }),
            clearIndicator: () => ({
                position: 'absolute',
                right: '0',
                display: 'flex'
            })
        }
        return (
            <ReactSelect
                isClearable='true'
                classNamePrefix="react-select"
                className={type === 'tags' ? "react-select-container tags" : "react-select-container"}
                placeholder={<div>{placeholder}</div>}
                styles={customStyles} 
                onChange={setSelectedItem}
                options={data}
                components={{
                    ClearIndicator: (props) => {
                        return (
                            <components.ClearIndicator {...props}>
                                <CloseButton/>
                            </components.ClearIndicator>
                        )
                    }, 
                    DropdownIndicator: (props) => {
                        return (
                            <components.DropdownIndicator {...props}>
                                <img src={dropdown} alt="dropdown"/>
                            </components.DropdownIndicator>
                        )
                    }
                }}
                noOptionsMessage={() => type === 'search' ? <div>No champions found</div> : null}
            />
        );
    }
}