import React from 'react';
import Reflux from 'reflux';
import { TabBar } from 'antd-mobile';

import { orderType, url } from 'config';
import AccountBasicInfo from 'account_basicinfo';
import WContact from 'wcontact';
import home1 from 'home1.svg';
import home2 from 'home2.svg';

import Home from './home';
import Mine from './mine';
import Order from './order';

import user1 from '../img/user1.svg';
import user2 from '../img/user2.svg';
import compass1 from '../img/compass1.svg';
import compass2 from '../img/compass2.svg';

function hxyError(e, tag) {
    alert(`失败，请直接联系海逍遥: ${defaultValue.hotline}, ${JSON.stringify(e)}, tag: ${tag}`);
}

function isError(errMsg) {
    return errMsg.split(':')[1] != 'ok';
}

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
            'name': accountInfo.name,
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

    _wxshare: function() {
        var title = '海逍遥旅行';
        var link = 'https://www.hxytravel.com/';
        var imgUrl = 'https://www.hxytravel.com/img/QR.jpg';
        var desc = '海逍遥旅行，一种旅行方式，多种旅行体验！'
        $.get(url.wxShareConfig, {'url': location.href.split('#')[0]})
        .done(function(data) {
            if (data.status != 0 ){
                return;
            }
            wx.config({
                'debug': false,
                'appId': data.appid,
                'timestamp': data.timestamp, 
                'nonceStr': data.nonceStr, 
                'signature': data.signature,
                'jsApiList': ['onMenuShareTimeline', 'onMenuShareAppMessage']
            });

            wx.ready(function(){
                wx.checkJsApi({
                    'jsApiList': ['onMenuShareTimeline', 'onMenuShareAppMessage'], 
                    'success': function(res) {
                        if (isError(res.errMsg)) {
                            hxyError(res, "check res error");
                            return;
                        }

                        if (res.checkResult.onMenuShareTimeline) {
                            wx.onMenuShareTimeline({
                                title: title,
                                link: link,
                                imgUrl: imgUrl
                            });
                        }
                        
                        if (res.checkResult.onMenuShareAppMessage) {
                            wx.onMenuShareAppMessage({
                                title: title,
                                desc: desc,
                                link: link,
                                imgUrl: imgUrl
                            });
                        }
                    },
                    'fail': function(e, tag) {
                        hxyError(e, "check failed");
                    }
                });
            });
    
            wx.error(function(res){
                hxyError(res, "global error");
            });
        });
    },

    // callback method

    onTabBarItemPress: function(selected) {
        if (this.state.selectedTab.length > 1) { // 如果之前pushState过，就pop一下
            history.go(-1);
        } 
        this.setState({
            'selectedTab': [selected]
        });
    },

    onAccountEditClick: function() {
        history.pushState(null, null, document.URL);
        var selectedTab = this.state.selectedTab;
        selectedTab.push('useless'); // 随便加一个，在编辑的时候，如果按返回键，下面的事件监听正好能工作
        this.setState({
            'contact': this._createAccountContact(),
            'selectedTab': selectedTab
        });
    },

    onOrdersClick: function(orderType) {
        history.pushState(null, null, document.URL);
        var selectedTab = this.state.selectedTab;
        selectedTab.push('order');
        this.setState({
            'selectedTab': selectedTab,
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
            'selectedTab': ['home'],
            'orderType': orderType.CURRENT,
            'contact': null
        };
    },

    componentDidMount: function() {
        this._wxshare();
        var self = this;
        window.onpopstate = function(e) {
            var selectedTab = self.state.selectedTab;
            if (selectedTab.length > 1) {
                selectedTab.pop();
                self.setState({'contact': null, 'selectedTab': selectedTab});
            }
        }; 
    },

    render: function() {
        if (this.state.contact) {
            return (
                <WContact contact={this.state.contact}
                    onSaveSuccessful={()=>{this.setState({'contact': null, 'selectedTab': ['mine']})}}
                    onCancleBtnClick={()=>{this.setState({'contact': null, 'selectedTab': ['mine']})}}/>
            );
        }
        var selectedTab = this.state.selectedTab[this.state.selectedTab.length - 1];
        return (
            <TabBar 
                unselectedTintColor="#949494" tintColor="#FF5310" barTintColor="white">
                <TabBar.Item
                    title="主页" key="home"
                    icon={{ uri: home1 }}
                    selectedIcon={{ uri: home2 }}
                    selected={selectedTab === 'home'}
                    onPress={() => {this.onTabBarItemPress('home')}}>
                    <Home onOrdersClick={this.onOrdersClick}/>
                </TabBar.Item>
                <TabBar.Item
                    title="行程" key="order"
                    icon={{ uri: compass1 }}
                    selectedIcon={{ uri: compass2 }}
                    selected={selectedTab === 'order'}
                    onPress={() => {this.onTabBarItemPress('order')}}>
                    <Order orderType={this.state.orderType}/>
                </TabBar.Item>
                <TabBar.Item
                    title="我的" key="mine"
                    icon={{ uri: user1 }}
                    selectedIcon={{ uri: user2 }}
                    selected={selectedTab === 'mine'}
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
