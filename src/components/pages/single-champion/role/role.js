import React from 'react';
import { classes } from '../../../../service/fakeData';
import './role.css';


const Role = ({ role }) => {

    const getClassImage = role => {
        const index = classes.findIndex(item => item.single === role);
        return classes[index].image;
    }

    return (
        <div className="champion-role">
            <div className="champion-role__label">role</div>
            <div className="champion-role__details">
                {role.map(item => {
                    return (
                        <div key={item} className="champion-role__block">
                            <div className="champion-role-icon-wrap" dangerouslySetInnerHTML={{ __html: getClassImage(item) }}></div>
                            <span className="champion-role__title">{item}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Role;