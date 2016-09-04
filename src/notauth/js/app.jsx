/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { Jumbotron, Button } from 'react-bootstrap';

import NotAuth from 'notauth';

var App = React.createClass({

    render: function() {
        return (
            <div className="app-container">
                <div className="container">
                    {NotAuth}
                </div>
            </div>
        );
    }
});

module.exports = App;
