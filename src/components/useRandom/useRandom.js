import { useEffect, useState } from 'react';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const useRandom = (data = [], watchTarget, initialValue) => {
    const [value, setRandomValue] = useState(initialValue);

    useEffect(() => {
        const randomIndex = getRandomInt(0, data.length - 1);
        const randomResult = data[randomIndex];

        setRandomValue(randomResult);
    }, [watchTarget, data])

    return value
}

export default useRandom