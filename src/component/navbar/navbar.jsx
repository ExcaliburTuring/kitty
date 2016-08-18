/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Image } from 'react-bootstrap';

import AccountBasicInfo from 'account_basicinfo';
import { url } from 'config';
import logo from "./logo.png"

require('./navbar.less');

var KittyNavbar = React.createClass({
	getInitialState: function() {
        return {};
	},
    render: function() {
        var name=this.props.name;
        return (
            <Navbar fixedTop={this.props.fixedTop} staticTop={this.props.staticTop}>
        		<Navbar.Header>
                    <Image src={logo} responsive/>
      				<Navbar.Toggle />
    			</Navbar.Header>
        		<Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="/">首页</NavItem>
                        <NavItem eventKey={2} className={name == "routes" ? "activity" : null} href="/routes">路线</NavItem>
                        <NavItem eventKey={3} className={name == "activities" ? "activity" : null} href="/activities">活动</NavItem>
                    </Nav>
					<AccountMenu />
				</Navbar.Collapse>
        	</Navbar>
        );
    }
});

var AccountMenu = React.createClass({

    mixins: [Reflux.connect(AccountBasicInfo.store, 'basicInfo')],

    getInitialState: function() {
        return {
            'basicInfo': {
                'accountInfo': {
                    'name': '',
                    'avatarUrl': ''
                }
            },
            'dropdown': false
        };
    },

    toggleDropdown: function() {
        this.setState({'dropdown': !this.state.dropdown})
    },

    componentDidMount: function() {
        AccountBasicInfo.actions.load();
    },

    render: function() {
        var dropdown = this.state.dropdown;
        var accountInfo = this.state.basicInfo.accountInfo;
        var mydrop = "my-drop";
        var mydown = "my-down";

        if (accountInfo != null) {
            if (dropdown == false) {
                mydrop = "my-drop";
                mydown = "my-down";
            }else{
                mydrop = "my-drop drop";
                mydown = "my-down down";
            }

            return (
                <div className="my-dropdown" onMouseOut={this.toggleDropdown} onMouseOver={this.toggleDropdown}>
                    <a href={`${url.account}/${accountInfo.accountid}`}>
                        <Image className="avatar" src={accountInfo.avatarUrl} circle/>
                        <span className={mydrop}>
                            {accountInfo.nickname} <i className="fa fa-angle-down" />
                        </span>
                    </a>
                    <div className={mydown}>
                        <div className="triangle"></div>
                        <div className="square">
                            <div className="orders line">我的行程</div>
                            <div className="whiteline" />
                            <div className="config line">账号设置</div>
                            <div className="line" href="/account/logout">退出</div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <Nav pullRight>
                    <NavItem eventKey={2} href="/wx/login" target="_blank">登录</NavItem>
                    <span className="split-bar" />
                    <NavItem eventKey={2} href="/wx/login">注册</NavItem>
                </Nav>
            );
        }
    }
});

module.exports = KittyNavbar;
