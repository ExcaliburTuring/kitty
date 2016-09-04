/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { Jumbotron, Button } from 'react-bootstrap';

import { defaultValue } from 'config';

var App = React.createClass({

    render: function() {
        return (
            <div className="app-container">
                <div className="container">
                    <div className="error-container">
                        <Jumbotron>
                            <h2>Soooooorry</h2>
                            <p>{`尊敬的用户，对不起！发生系统异常。您可直接致电海逍遥: ${defaultValue.hotline}`}</p>
                        </Jumbotron>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = App;
