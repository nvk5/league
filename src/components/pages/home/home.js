import React, { useEffect } from 'react';
import HomeHeader from './home-header';
import HomeClasses from './home-classes';
import HomeStyle from './home-style';
import HomeMap from './home-map';


const Home = () => {

    useEffect(() => {
        document.title = 'League of Legends'
    }, [])

    return (
        <div className="home">
            <HomeHeader />
            <main>
                <HomeClasses />
                <HomeStyle />
                <HomeMap />
            </main>
        </div>
    )
}

export default Home;

