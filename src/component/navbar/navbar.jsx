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
        var homepage;
        var routes;
        var activities;

        if(name == "homepage"){
            homepage = "activity"
        }else if(name == "routes") {
            routes = "activity"
        }else if(name == "activities") {
            activities = "activity"
        }
        
        return (
            <Navbar className={name} staticTop>
        		<Navbar.Header>
                    <Image src={logo} responsive/>
      				<Navbar.Toggle />
    			</Navbar.Header>
        		<Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} className={homepage} href="/">首页</NavItem>
                        <NavItem eventKey={2} className={routes} href="/routes">路线</NavItem>
                        <NavItem eventKey={3} className={activities} href="/activities">活动</NavItem>
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
                    'name': ''
                },
                'accountSetting': {
                    'avatarUrl': ""
                }
            },
            'dropdown': false
        };
    },

    openDropdown: function() {
        var dropdown = !this.state.dropdown;
        this.setState({'dropdown': dropdown})
    },

    closeDropdown: function() {
        var dropdown = !this.state.dropdown;
        this.setState({'dropdown': dropdown})
    },

    componentDidMount: function() {
        AccountBasicInfo.actions.load();
    },

    render: function() {
        var dropdown = this.state.dropdown;
        var basicInfo = this.state.basicInfo;
        var mydrop = "my-drop";
        var mydown = "my-down";

        if (this.state.basicInfo.accountInfo != null) {
            if (dropdown == false) {
                mydrop = "my-drop";
                mydown = "my-down";
            }else{
                mydrop = "my-drop drop";
                mydown = "my-down down";
            }

            return (
                <div className="my-dropdown" onMouseOut={this.closeDropdown} onMouseOver={this.openDropdown}>
                    <a href={`${url.account}/${basicInfo.accountInfo.accountid}`}>
                        <Image className="avatar" src={basicInfo.accountSetting.avatarUrl} circle/>
                    </a>
                    <span className={mydrop}>
                         {basicInfo.accountInfo.name} <i className="fa fa-angle-down" />
                    </span>
                    <div className={mydown}>
                        <div className="triangle"></div>
                        <div className="square">
                            <div className="orders line">我的行程</div>
                            <div className="whiteline" />
                            <div className="config line">设置</div>
                            <div className=""><a href="/account/logout">退出</a></div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <Nav pullRight>
                    <NavItem eventKey={2} href="/wx/login">登录</NavItem>
                </Nav>
            );
        }
    }
});

module.exports = KittyNavbar;
