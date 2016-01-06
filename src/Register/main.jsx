import React from 'react';
import ReactDOM from 'react-dom';
import ValidateInfo from './js/ValidateInfo';
import SuccessScreen from './js/SuccessScreen';
import { browserHistory, Router, IndexRoute, Route, Link } from 'react-router';
require('./css/application.less');

const App = React.createClass({
  render() {
    return (
      <div>
         {this.props.children}
      </div>
    )
  }
})

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={ValidateInfo} />
      <Route path="Signin" component={SuccessScreen} />
    </Route>
  </Router>
), document.getElementById('app'))
