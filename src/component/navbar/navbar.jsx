/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Image } from 'react-bootstrap';

import AccountBasicInfo from 'account_basicinfo';
import logo from "./logo1.png"

require('./navbar.less');

var KittyNavbar = React.createClass({
	getInitialState: function() {
        return {};
	},
    render: function() {
        return (
            <Navbar staticTop>
        		<Navbar.Header>
                <Image src={logo} responsive/>
      				<Navbar.Toggle />
    			</Navbar.Header>
        		<Navbar.Collapse>
					<MainMenu />
					<AccountMenu />
				</Navbar.Collapse>
        	</Navbar>
        );
    }
});

var MainMenu = React.createClass({
    render: function() {
        return (
            <Nav>
				<NavItem eventKey={1} href="/">首页</NavItem>
				<NavItem eventKey={2} href="/">路线</NavItem>
				<NavItem eventKey={3} href="/">活动</NavItem>
			</Nav>
        );
    }
});

var AccountMenu = React.createClass({
    mixins: [Reflux.connect(AccountBasicInfo.store, 'basicInfo')],
    getInitialState: function() {
        return {
            'basicInfo': {
                'login': false
            }
        };
    },
    componentDidMount: function() {
        AccountBasicInfo.actions.load();
    },
    render: function() {
        if (this.state.basicInfo.login) {
            return (
                <Nav pullRight>
                    <NavDropdown eventKey={3} title={this.state.basicInfo.accountInfo.name} id="kdkdkdkdkdkdk">
                        <MenuItem eventKey={3.1} href="/account/1">我的行程</MenuItem>
                        <MenuItem eventKey={3.2}>设置</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={3.3}>退出</MenuItem>
                    </NavDropdown>
                </Nav>
            );
        } else {
            return (
                <Nav pullRight>
                    <NavItem eventKey={1} href="/register">组册</NavItem>
                    <NavItem eventKey={2} href="/wx/login">登录</NavItem>
                </Nav>
            );
        }
    }
});

module.exports = KittyNavbar;
