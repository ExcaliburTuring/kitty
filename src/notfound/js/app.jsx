/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';

import NotFound from 'notfound';

var App = React.createClass({

    render: function() {
        return (
            <div className="app-container">
                <div className="container">
                    <NotFound/>
                </div>
            </div>
        );
    }
});

module.exports = App;
