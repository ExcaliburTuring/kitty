import React from 'react';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import ReactDOM from 'react-dom';

import App from './js/app';
import Activity1 from './js/activity1';
import Activity2 from './js/activity2';
import Activity3 from './js/activity3';

require('./css/application.less');

const Main = React.createClass({
  render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
})

ReactDOM.render(
  <Router>
    <Route path="/" component={Main}>
      <IndexRoute component={App} />
      <Route path="1" component={Activity1} />
      <Route path="2" component={Activity2} />
      <Route path="3" component={Activity3} />
    </Route>
  </Router>
, document.getElementById('app'));
