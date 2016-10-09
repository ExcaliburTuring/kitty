import React from 'react';
import ReactDOM from 'react-dom';

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
        <Footer container={this}/>
    </div>
, document.getElementById('app'));
