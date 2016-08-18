import React from 'react';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router'
import ReactDOM from 'react-dom';

import Navbar from 'navbar';
import Footer from 'footer';
import Activities from './js/activities';
import Leader from './js/leaderProject';
import Postcard from './js/postcardProject';

require('./css/application.less');

const App = React.createClass({
  render() {
    return (
      <div>
        <Navbar name="activities" />
        {this.props.children}
      </div>
    )
  }
})

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Activities} />
      <Route path="1" component={Postcard} />
      <Route path="2" component={Activities} />
      <Route path="3" component={Leader} />
    </Route>
  </Router>
), document.getElementById('app'));