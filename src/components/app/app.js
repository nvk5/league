import React from 'react';
import 'normalize.css';
import '../../fonts/fonts.css';
import './app.css';
import Navigation from '../navigation';
import Champions from '../pages/champions';
import SingleChampion from '../pages/single-champion';
import Home from '../pages/home';
import FooterVideo from '../footer-video';

import { HashRouter, Route } from 'react-router-dom';

const App = () => (
    <HashRouter>
        <Route path="/" component={Navigation} />
        <Route path="/" exact component={Home} />
        <Route path="/champions" exact component={Champions} />
        <Route path="/champions/:id" component={SingleChampion} />
        <Route path="/" component={FooterVideo} />
    </HashRouter>
)

export default App