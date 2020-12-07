import React from 'react';
import './track.css';

const TrackBorder = () => (
    <svg viewBox="0 0 100 100"><path d="M59.84 7.78L50 17.63l-4.43-4.43-5.41-5.42a46.63 46.63 0 1019.68 0zm-12 12L50 22l2.2-2.19 4.67-4.67a38.86 38.86 0 11-13.74 0zM50 96.89a43.52 43.52 0 01-10.82-85.68l2.59 2.59a40.42 40.42 0 1016.46 0l2.59-2.59A43.52 43.52 0 0150 96.89z"></path><path d="M55.44 5.44L50 10.88l-5.44-5.44L50 0z"></path></svg>
)

export default class Track extends React.Component {
    state = {
        current: 0,
        trackPos: 0,
        isItemSelected: true
    }
    btns = React.createRef();
    tracker = React.createRef();

    componentDidMount() {
        const { setCurrentTrack, slide } = this.props;

        this.setTrackPos();
        setCurrentTrack();

        if (slide && window.matchMedia('(min-width: 992px)').matches) {
            this.slideItems();
        }
    }

    componentWillUnmount() {
        clearInterval(this.slider);
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state, callback) => {
            return;
        };
    }

    slideItems = () => {
        const items = this.btns.current.querySelectorAll('.track__btn');

        this.slider = setInterval(() => {
            this.setState(state => {
                return this.state.current === items.length ? { current: 0 } : { current: state.current++ }
            })
            this.setTrackPos();
            this.props.setCurrentTrack(this.state.current)
        }, 11000)
    }

    setActiveItem = event => {
        const current = Number(event.currentTarget.dataset.index);

        clearInterval(this.slider);

        this.setState({ current }, () => {
            this.setTrackPos();
            this.props.setCurrentTrack(current)
        })

    }

    setTrackPos = () => {
        const currentBtn = this.btns.current.querySelectorAll('.track__btn')[this.state.current];
        const trackPos = currentBtn.offsetLeft + currentBtn.offsetWidth / 2 - this.tracker.current.offsetWidth / 2;

        this.setState({ trackPos, isItemSelected: false }, () => {
            setTimeout(() => {
                this.setState({ isItemSelected: true })
            }, 300)
        })
    }

    render() {
        const { data, fake } = this.props;
        const { current, trackPos, isItemSelected } = this.state;

        return (
            <div className="track">
                <div className="track-wrap" ref={this.btns}>
                    <div
                        style={{ transform: `translateX(${trackPos}px)` }}
                        className="track__btn-current" ref={this.tracker}>
                        <span className={isItemSelected ? 'selected' : ''}></span>
                    </div>
                    {data.map((item, index) => {
                        const { id, name, image } = item;
                        const img = <img className="img" src={image} alt={name} />
                        const svg = <div className="track__btn-img-fake" dangerouslySetInnerHTML={{ __html: image }}></div>

                        return (
                            <button
                                data-index={index}
                                onClick={this.setActiveItem}
                                className={current === index ? `track__btn active` : "track__btn"}
                                key={`${item}-${id}`}>
                                <span className="track__btn-label"></span>
                                {fake ? <span className={current === index ? "track__btn-desc-fake active" : "track__btn-desc-fake"}>{id}</span> : null}
                                {fake ? <span className="track__btn-border-fake"><TrackBorder /></span> : null}
                                {fake ? svg : img}
                            </button>
                        )
                    })}

                </div>
            </div>
        )
    }
}