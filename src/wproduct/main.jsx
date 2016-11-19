import React from 'react';
import ReactDOM from 'react-dom';
import { Col } from 'react-bootstrap';
import { AutoAffix } from 'react-overlays';

import App from './js/app';

require('./css/application.less');

var Footer = React.createClass({

    render: function() {
        return (
            <div className="footer">
            </div>
        )
    }
})

ReactDOM.render(
    <div>
    	<App/>
        <Footer container={this}/>
    </div>
, document.getElementById('app'));
