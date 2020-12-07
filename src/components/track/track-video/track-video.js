import React from 'react';
import ErrorMessage from '../../error';
import Loading from '../../loading';
import Video from '../../video';

import './track-video.css';
import noData from '../../../media/3024051.jpg';

const NoDataResponse = ({ image }) => (
    <div className="track-video-fail">
        <img className="track-video-fail__img" src={image} alt="no data" />
        <div className="track-video-fail__info">No data found :(</div>
    </div>
)


export default class TrackVideo extends React.Component {
    state = {
        videos: [],
        loading: true,
        error: false
    }

    componentDidMount() {
        this.setVideos();
    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = () => {
            return;
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentTrack !== prevProps.currentTrack) {
            this.setState({ loading: true }, () => this.setVideos());
        }
    }

    setVideos = () => {
        this.fetchVideos()
            .then(videos => this.setState({ videos, loading: false }))
            .catch(() => this.setState({ error: true }))
    }

    fetchVideos = async () => {
        const { data, currentTrack } = this.props;
        const currentVideoData = data[currentTrack].video;

        return await Promise.allSettled(currentVideoData.map(item => fetch(item)))
            .then(results => {
                let arr = [];

                results.forEach((result, i) => {
                    if (result.value.ok) {
                        arr[i] = data[currentTrack].video[i]
                    }
                })

                return arr;
            })
    }

    renderTrackVideo = () => {
        const { videos } = this.state;
        const content = videos.length > 0 ? <Video source={videos} /> : <NoDataResponse image={noData} />;

        return <div className="track-video__wrap">{content}</div>
    }

    render() {
        const { loading, error } = this.state;

        const errorMsg = error ? <ErrorMessage /> : null;
        const loadingStatus = (loading && !error) ? <Loading /> : null;
        const content = !(error || loading) ? this.renderTrackVideo() : null;

        return (
            <div className="track-video">
                {loadingStatus}
                {errorMsg}
                {content}
            </div>
        )
    }
}
