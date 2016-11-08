import React from 'react';
import Reflux from 'reflux';
import { TabBar } from 'antd-mobile';

import { orderType } from 'config';
import AccountBasicInfo from 'account_basicinfo';
import WContact from 'wcontact';

import Home from './home';
import Mine from './mine';
import Order from './order';

import home1 from '../img/home1.svg';
import home2 from '../img/home2.svg';
import user1 from '../img/user1.svg';
import user2 from '../img/user2.svg';
import compass1 from '../img/compass1.svg';
import compass2 from '../img/compass2.svg';

var App = React.createClass({

    mixins: [Reflux.connect(AccountBasicInfo.store, 'basicInfo')],

    /**
     * 创建账户对应的出行人
     */
    _createAccountContact: function() {
        var accountInfo = this.state.basicInfo.accountInfo;
        return {
            'accountid': accountInfo.accountid,
            'contactid': 0,
            'name': accountInfo.name || accountInfo.nickname,
            'id': accountInfo.id,
            'idType': accountInfo.idType,
            'gender': accountInfo.gender,
            'birthday': accountInfo.birthday,
            'email': accountInfo.email,
            'mobile': accountInfo.mobile,
            'area': accountInfo.area,
            'address': accountInfo.address
        };
    },

    // callback method

    onTabBarItemPress: function(selected) {
        this.setState({
            'selectedTab': selected
        });
    },

    onAccountEditClick: function() {
        this.setState({'contact': this._createAccountContact()});
    },

    onOrdersClick: function(orderType) {
        this.setState({
            'selectedTab': 'order',
            'orderType': orderType
        });
    },

    getInitialState: function() {
        AccountBasicInfo.actions.load();
        return {
            'basicInfo': {
                'accountInfo': {
                    'name': '',
                    'avatarUrl': ''
                }
            },
            'selectedTab': 'home',
            'orderType': orderType.CURRENT,
            'contact': null
        };
    },

    render: function() {
        if (this.state.contact) {
            return (
                <WContact contact={this.state.contact}
                    onSaveSuccessful={()=>{this.setState({'contact': null})}}
                    onCancleBtnClick={()=>{this.setState({'contact': null})}}/>
            );
        }
        return (
            <TabBar 
                unselectedTintColor="#949494" tintColor="#FF5310" barTintColor="white">
                <TabBar.Item
                    title="主页" key="home"
                    icon={{ uri: home1 }}
                    selectedIcon={{ uri: home2 }}
                    selected={this.state.selectedTab === 'home'}
                    onPress={() => {this.onTabBarItemPress('home')}}>
                    <Home onOrdersClick={this.onOrdersClick}/>
                </TabBar.Item>
                <TabBar.Item
                    title="行程" key="order"
                    icon={{ uri: compass1 }}
                    selectedIcon={{ uri: compass2 }}
                    selected={this.state.selectedTab === 'order'}
                    onPress={() => {this.onTabBarItemPress('order')}}>
                    <Order orderType={this.state.orderType}/>
                </TabBar.Item>
                <TabBar.Item
                    title="我的" key="mine"
                    icon={{ uri: user1 }}
                    selectedIcon={{ uri: user2 }}
                    selected={this.state.selectedTab === 'mine'}
                    onPress={() => {this.onTabBarItemPress('mine')}}>
                    <Mine basicInfo={this.state.basicInfo}
                        onOrdersClick={this.onOrdersClick}
                        onAccountEditClick={this.onAccountEditClick}/>
                </TabBar.Item>
            </TabBar>
        );
    }
});

module.exports = App;
