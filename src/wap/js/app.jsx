import React from 'react';
import Reflux from 'reflux';
import { TabBar } from 'antd-mobile';

import AccountBasicInfo from 'account_basicinfo';

import Home from './home';
import Mine from './mine';
import Order from './order';

var App = React.createClass({

    mixins: [Reflux.connect(AccountBasicInfo.store, 'basicInfo')],

    onTabBarItemPress: function(selected) {
        this.setState({
            'selectedTab': selected
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
            'selectedTab': 'home'
        };
    },

    render: function() {
        return (
            <TabBar 
                unselectedTintColor="#949494" tintColor="#33A3F4" barTintColor="white">
                <TabBar.Item
                    title="主页" key="home"
                    icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/XLdKiKAwDRXQNhC.png' }}
                    selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/iKfBQdGdTMubhXy.png' }}
                    selected={this.state.selectedTab === 'home'}
                    onPress={() => {this.onTabBarItemPress('home')}}>
                    <Home />
                </TabBar.Item>
                <TabBar.Item
                    title="我的" key="mine"
                    icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/YWpPVCVOnJoCYhs.png' }}
                    selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/WadBBxOIZtDzsgP.png' }}
                    selected={this.state.selectedTab === 'mine'}
                    onPress={() => {this.onTabBarItemPress('mine')}}>
                    <Mine basicInfo={this.state.basicInfo}
                        onOrdersClick={() => {this.onTabBarItemPress('order')}}/>
                </TabBar.Item>
                <TabBar.Item
                    title="行程" key="order"
                    icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/XLdKiKAwDRXQNhC.png' }}
                    selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/iKfBQdGdTMubhXy.png' }}
                    selected={this.state.selectedTab === 'order'}
                    onPress={() => {this.onTabBarItemPress('order')}}>
                    <Order />
                </TabBar.Item>
            </TabBar>
        );
    }
});

module.exports = App;
