/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import AccountBasicInfo from 'account_basicinfo';

require('./navbar.less');

var KittyNavbar = React.createClass({
	getInitialState: function() {
        return {};
	},
    render: function() {
        return (
            <Navbar staticTop inverse>
        		<Navbar.Header>
					<Brand />
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

var Brand = React.createClass({
    render: function() {
        return (
        	<Navbar.Brand>
        		<a href="/">kitty</a>
      		</Navbar.Brand>
        );
    }
});

var MainMenu = React.createClass({
    render: function() {
        return (
            <Nav>
				<NavItem eventKey={1} href="/">MainMenu 1</NavItem>
				<NavItem eventKey={2} href="/">MainMenu 2</NavItem>
				<NavItem eventKey={3} href="/">MainMenu 3</NavItem>
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
                        <MenuItem eventKey={3.1}>我的行程</MenuItem>
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
                    <NavItem eventKey={2} href="/login">登录</NavItem>
                </Nav>
            );
        }
    }
});

module.exports = KittyNavbar;
