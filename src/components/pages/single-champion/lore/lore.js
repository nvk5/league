import React, { useState } from 'react';
import './lore.css';

const Lore = ({ blurb, lore }) => {
    const [loreOpened, setLoreOpened] = useState(false);

    const openLore = () => setLoreOpened(true);

    return (
        <div
            className="champion-lore">
            {loreOpened ? lore : blurb}
            <span
                onClick={openLore}
                className={loreOpened ? "champion-lore__open closed" : "champion-lore__open"}>
                See more
            </span>
        </div>
    )
}

export default Lore;

