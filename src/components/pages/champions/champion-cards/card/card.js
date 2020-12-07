import React from 'react';
import './card.css';
import { Link } from 'react-router-dom';


const Card = ({ id, name, img }) => (
    <Link to={`/champions/${id}`} className="card">
        <span className="card__img-container">
            <img className="card__img" alt="img" src={img} />
        </span>
        <span className="card__name-container">
            <span className="card__name">{name}</span>
        </span>
    </Link>
)

export default Card;
