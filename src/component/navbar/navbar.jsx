/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import AccountBasicInfo from 'account_basicinfo';
import Logo from './logo2.png';
import hxytravel from './hxytravel.png';

require('./navbar.less');

var KittyNavbar = React.createClass({
	getInitialState: function() {
        return {};
	},
    render: function() {
        return (
            <Navbar staticTop>
                <div className="navbar-middle" ><img src={Logo} /></div>
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
        		<img src={hxytravel} />
      		</Navbar.Brand>
        );
    }
});

var MainMenu = React.createClass({
    render: function() {
        return (
            <Nav>
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
        AccountBasicInfo.actions.get();
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
                    <NavItem eventKey={1} href="/register">注册</NavItem>
                    <NavItem eventKey={2} href="/login">登录</NavItem>
                </Nav>
            );
        }
    }
});

module.exports = KittyNavbar;
