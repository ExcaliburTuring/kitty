import React from 'react';
import ReactDOM from 'react-dom';

import App from './js/app';

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
    <App />
, document.getElementById('app'));
