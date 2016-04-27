/**
 * @author xiezhenzong 
 */
import React from 'react';
import { Button, Nav, NavItem, Image } from 'react-bootstrap';

import Wx from 'wx';
import Email from './email';
import { url, defaultValue, error } from 'config';
import logo from 'logo.png';
import bg from '../img/bg.jpg';
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

    redirectLogin: function() {
        window.location.pathname = '/login';
    },

    render: function() {
        var registerType = (<Wx />);
        if (this.state.activeKey == 2) {
            registerType = (<Email />);
        }
        return (
            <div className="app-container" style={bgStyle}>
                <div className="container">
                    <div className="logo-container">
                        <Image src={logo} responsive/>
                    </div>
                    <div className="register-container">
                        <div className="register-tab">
                            <Nav bsStyle = "pills" justified onSelect = {this.handleSelect} activeKey = {this.state.activeKey}>
                                <NavItem eventKey = {1}> 微信组册 </NavItem> 
                                <NavItem eventKey = {2}> 邮箱组册 </NavItem>
                            </Nav>
                        </div>
                        <div className="register-main">
                            {registerType}
                        </div>
                        <hr />
                        <div className="tool-btn-container">
                            <Button bsStyle="link" onClick={this.redirectLogin} className="pull-right">去登录</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = App;
