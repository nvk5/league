import React from 'react';
import './headline-secondary.css';

const HeadlineSecondary = ({ before, after, desc }) => (
    <>
        <h2 className="headline-secondary">
            <span className="headline-secondary__before">{before}</span>
            <span className="headline-secondary__after">{after}</span>
        </h2>
        <p className="headline-secondary__desc">{desc}</p>
    </>
)

export default HeadlineSecondary;