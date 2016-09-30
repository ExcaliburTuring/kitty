/**
 * @authro xiezhenzong
 */
import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

import { defaultValue } from 'config';

import './notauth.less';

var NotAuth = React.createClass({

    render: function() {
        return (
            <div className="notauth-container">
                <Jumbotron>
                    <h2>Soooooorry</h2>
                    <p>尊敬的用户，对不起！您没有访问该页面的权限。</p>
                    <p>{`您可直接致电海逍遥: ${defaultValue.hotline}`}</p>
                </Jumbotron>
            </div>
        );
    }

});

module.exports = NotAuth;
