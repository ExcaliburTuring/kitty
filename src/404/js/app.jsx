import React from 'react';

import img from '../img/404';

var App = React.createClass({

    render: function() {
        return (
            <div className="content">
                <img src={img} />
            </div>
        );
    }
});


module.exports = App;
