/**
 * @author xiezhenzong 
 */
import React from 'react';
import { Button, Nav, NavItem, Image } from 'react-bootstrap';

import Wx from 'wx';
import Email from './email';
import { url, defaultValue, error } from 'config';
import logo from 'logo.png';
import bg from '../img/bg_img.jpg';
var bgStyle = {
    backgroundImage: `url(${bg})`
};

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

    redirectForgetPassword: function() {
        window.location.pathname = '/';
    },

    render: function() {
        var loginType = (<Wx />);
        var forgetPassword;
        if (this.state.activeKey == 2) {
            loginType = (<Email />);
            forgetPassword = (
                <Button bsStyle="link" onClick={this.redirectForgetPassword} className="pull-right">忘记密码</Button>
            );
        }
        return (
            <div className="app-container" style={bgStyle}>
                <div className="container">
                    <div className="logo-container">
                        <Image src={logo} responsive/>
                    </div>
                    <div className="login-container">
                        <div className="login-tab">
                            <Nav bsStyle = "pills" justified onSelect = {this.handleSelect} activeKey = {this.state.activeKey}>
                                <NavItem eventKey = {1}> 微信登录 </NavItem> 
                                <NavItem eventKey = {2}> 邮箱登录 </NavItem>
                            </Nav>
                        </div>
                        <div className="login-main">
                            {loginType}
                        </div>
                        <hr />
                        <div className="tool-btn-container">
                            <Button bsStyle="link" onClick={this.redirectRegister} className="pull-right">去注册</Button>
                            {forgetPassword}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = App;
