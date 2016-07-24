import React from 'react';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router'
import ReactDOM from 'react-dom';

import Navbar from 'navbar';
import Footer from 'footer';
import App from './js/app';
import App2 from './js/app2';

require('./css/application.less');

ReactDOM.render(
    <div>
        <Navbar name="activities" />
        <Router>
            <Route>
                <IndexRoute component={App}/>
                <Route path="1" component={App} />
                <Route path="2" component={App2} />
            </Route>
        </Router>
        <Footer />
    </div>
, document.getElementById('app'));
