/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { Navbar, Nav, NavItem, Image } from 'react-bootstrap';
import { Menu, Dropdown, Icon } from 'antd';

import AccountBasicInfo from 'account_basicinfo';
import { url } from 'config';
import logo from "logo.svg"

import 'antd/lib/index.css';
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
                        <NavItem eventKey={1} className={name == "index" ? "activity" : null} href="/">首页</NavItem>
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
            'menuIconType': 'right'
        };
    },

    componentDidMount: function() {
        AccountBasicInfo.actions.load();
    },

    handleVisibleChange: function(visible) {
        this.setState({'menuIconType': visible ? 'down' : 'right'});
    },

    render: function() {
        var dropdown = this.state.dropdown;
        var accountInfo = this.state.basicInfo.accountInfo;
        if (accountInfo != null) {
            var homepage = `${url.account}/${accountInfo.accountid}`;
            const menu = (
                <Menu>
                    <Menu.Item key="5">
                        <a href={`${homepage}`}><Icon type="home" />我的行程</a>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <a href={`${homepage}?info=1`}><Icon type="setting" />个人信息</a>
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item key="7">
                        <a href="/account/logout"><Icon type="logout" />退出</a>
                    </Menu.Item>
                </Menu>
            );
            return (
                <Nav pullRight className="navbar-accountinfo-container">
                    <li role="presentation" className="navbar-menu">
                        <Dropdown overlay={menu} onVisibleChange={this.handleVisibleChange}>
                            <a className="ant-dropdown-link" href={homepage}>
                                <Image src={accountInfo.avatarUrl} circle responsive/>
                                {accountInfo.nickname}
                                <Icon type={this.state.menuIconType} />
                            </a>
                        </Dropdown>
                    </li>
                </Nav>
            );
        } else {
            return (
                <Nav pullRight>
                    <NavItem eventKey={8} href="/wx/login" target="_blank">登录</NavItem>
                    <span className="split-bar" />
                    <NavItem eventKey={9} href="/wx/login" target="_blank">注册</NavItem>
                </Nav>
            );
        }
    }
});

module.exports = KittyNavbar;
