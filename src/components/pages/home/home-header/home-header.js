import React from 'react';
import { Link } from 'react-router-dom';
import { bg, intro } from '../../../../service/fakeData';
import Button from '../../../button';
import Video from '../../../video';
import './home-header.css';
import logo from '../../../../media/logo.png';

const Logo = () => <img className="logo home-header__intro-img" src={logo} alt="League of legends" />;

const Header = () => (
    <header className="home-header">
        <h1 className="visually-hidden">Welcome to League of legends</h1>
        <div className="home-header__bg">
            <Video source={bg} />
        </div>
        <div className="home-header__intro">
            <Video source={intro} />
            <Logo />
            <Button>
                <Link to="/champions">Play for free</Link>
            </Button>
        </div>
    </header>
)

export default Header;