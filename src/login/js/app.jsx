/**
 * @author xiezhenzong 
 */
import React from 'react';
import { Button, Nav, NavItem } from 'react-bootstrap';

import WxLogin from './wxlogin';
import EmailLogin from './emaillogin';

import { url, defaultValue, error } from 'config';

var img = document.createElement('img');
img.src = require('../img/bg_img.jpg');
var bgStyle = {
    backgroundImage: "url(" + img.src + ")"
};

var img2 = require('../img/logo.png');

var App = React.createClass({

    getInitialState: function() {
        return {
            'activeKey': 1
        };
    },

    handleSelect: function(selectKey) {
        this.setState({
            'activeKey': selectKey
        });
    },

    redirectRegister: function() {
        window.location.pathname = '/register';
    },

    render: function() {
        var loginType = (<WxLogin />);
        if (this.state.activeKey == 2) {
            loginType = (<EmailLogin />);
        }
        return (
            <div className="app-container" style={bgStyle}>
                <div className="main-container container">
                    <div className="left">
                        <img src={img2}/>
                    </div>
                    <div className="right">
                        <div className="row">
                            <div className="col-sm-8">
                                <div className="login-container">
                                    <div>
                                        <Nav bsStyle = "pills" justified onSelect = {this.handleSelect} activeKey = {this.state.activeKey}>
                                            <NavItem eventKey = {1}> 微信登录 </NavItem> 
                                            <NavItem eventKey = {2}> 邮箱登录 </NavItem>
                                        </Nav>
                                    </div>
                                    <div>
                                        {loginType}
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="register-container">
                                    <h3>No Account yet?</h3>
                                    <Button bsStyle="link" onClick={this.redirectRegister}>去注册</Button>
                                </div>
                            </div>
                        </div>   
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = App;
