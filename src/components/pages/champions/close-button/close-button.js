import React from 'react';
import './close-button.css';
import close from './close.svg';


const CloseButton = () => (
    <button className="close-button">
        <img src={close} alt="close search"/>
    </button>
)

export default CloseButton;