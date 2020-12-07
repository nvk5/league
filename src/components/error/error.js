import React from 'react';
import './error.css';
import errorImg from './error.svg';

const ErrorMessage = () => (
    <div className="error">
        <span className="error__message">Something goes wrong</span>
        <img className="error__image" src={errorImg} alt="error" />
    </div>
)

export default ErrorMessage;