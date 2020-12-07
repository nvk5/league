import React from 'react';
import HeadlineSecondary from '../../../headline-secondary';
import Button from '../../../button';
import { homeStyle } from '../../../../service/fakeData';

import stylebg_1 from '../../../../media/style-bg.png';
import stylebg_2 from '../../../../media/style-bg2.png';

import './home-style.css';

const Skins = React.forwardRef(({ activeSkin }, ref) => (
    <div className="home-style__skins" ref={ref}>
        {homeStyle.map(({ name, source }, i) => {
            return (
                <img
                    key={name}
                    className={activeSkin === i ? "home-style__skins-img show" : "home-style__skins-img hide"}
                    src={source} alt={name}
                />
            )
        })}
    </div>
))

export default class HomeStyle extends React.Component {
    state = {
        activeSkin: 0,
        backBgX: 0,
        backBgY: 0
    }
    skins = React.createRef();
    backBg = React.createRef();
    frontBg = React.createRef();
    text = React.createRef();
    homeStyle = React.createRef();

    componentDidMount() {
        this.setActiveSkin();
        window.addEventListener('scroll', this.moveContentY);
    }

    componentWillUnmount() {
        clearInterval(this.slideHomeStyle);
        window.removeEventListener('scroll', this.moveContentY);
    }

    setActiveSkin = () => {
        const items = this.skins.current.querySelectorAll('.home-style__skins-img');

        this.slideHomeStyle = setInterval(() => {
            this.setState(state => {
                return this.state.activeSkin === items.length ? { activeSkin: 0 } : { activeSkin: state.activeSkin++ }
            })
        }, 3000)
    }

    moveContentX = event => {
        const x = event.clientX;
        const { backBgX, backBgY } = this.state;

        this.setState({
            backBgX: event.clientX / 50
        }, () => {
            this.backBg.current.style.transform = `translate(${backBgX}px, ${backBgY}px)`
            this.text.current.style.transform = `translateX(-${x / 100}px)`
        })
    }

    moveContentY = () => {
        const isLgScreen = window.matchMedia('(min-width: 992px)').matches ?
            `rotate(45deg) translate(-${this.skins.current.getBoundingClientRect().bottom / 60}px, -${this.skins.current.getBoundingClientRect().bottom / 60}px)` :
            `none`

        const checkVisibility = elem => {
            const windowScroll = window.pageYOffset;
            const windowScrollBottom = windowScroll + document.documentElement.clientHeight;
            const elemTop = elem.offsetTop;
            const elemBottom = elemTop + elem.offsetHeight;

            return windowScrollBottom >= elemTop && windowScroll <= elemBottom
        }


        if (checkVisibility(this.homeStyle.current)) {
            this.setState({
                backBgY: -this.backBg.current.getBoundingClientRect().bottom / 30
            }, () => {
                this.backBg.current.style.transform = `translate(${this.state.backBgX}px, ${this.state.backBgY}px)`
                this.frontBg.current.style.transform = `translateY(${this.frontBg.current.getBoundingClientRect().bottom / 50}px)`
                this.skins.current.style.transform = isLgScreen
            })
        }

    }

    render() {
        return (
            <section className="home-style" onMouseMove={this.moveContentX} ref={this.homeStyle}>
                <div className="home-style__bg">
                    <img src={stylebg_1} className="home-style__bg-img back" alt="mountain" ref={this.backBg} />
                    <img src={stylebg_2} className="home-style__bg-img front" alt="forest" ref={this.frontBg} />
                </div>
                <div className="home-style__content">
                    <Skins ref={this.skins} activeSkin={this.state.activeSkin} />
                    <div className="home-style__details" ref={this.text}>
                        <HeadlineSecondary
                            before="slay with"
                            after="style"
                            desc="Make it personal by changing up the look of your favorite champions with skins."
                        />
                        <Button sm>
                            <a href="https://ru.leagueoflegends.com/en-us/" target="_blank" rel="noopener noreferrer">Play now</a>
                        </Button>
                    </div>
                </div>
            </section>
        );
    }
}