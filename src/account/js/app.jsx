/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Image} from 'react-bootstrap';
import { Tabs, Button } from 'antd';
const TabPane = Tabs.TabPane;

import AccountBasicInfo from 'account_basicinfo';
import { url } from 'config';
import Login from 'login';
import NoAuth from 'notauth';

import Banner from './banner';
import Index from './index';
import Info from './info';

import 'antd/lib/index.css';

var App = React.createClass({

    mixins: [Reflux.connect(AccountBasicInfo.store, 'basicInfo')],

    getQueryString: function (name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        return r != null ? unescape(r[2]): null; 
    },

    getInitialState: function() {
        AccountBasicInfo.actions.get();
        var pathAccountid = window.location.pathname.split('/')[2];
        return {
            'accountid': pathAccountid,
            'basicInfo': {},
            'tabSelect': this.getQueryString('info') == null ? "1" : "2"
        };
    },

    createDom: function(content) {
        return ( 
            <div className="content-container">
                <Banner/>
                <div className="tabbar-hover"></div>
                <div className="container">
                    <div className="accountinfo-container">
                        {content}
                    </div>
                </div>
            </div>
        );
    },

    render: function() {
        var accountInfo = this.state.basicInfo.accountInfo;
        if (accountInfo == null) {
            return this.createDom(<Login/>);
        }
        if (accountInfo.accountid != this.state.accountid) {
            return this.createDom(<NoAuth/>);
        }
        const operations = <TabBarExtraContent accountInfo={accountInfo}/>;
        var content = (
            <Tabs tabBarExtraContent={operations} activeKey={this.state.tabSelect} onChange={(key) => {this.setState({'tabSelect': key});}}>
                <TabPane tab="我的窝" key="1"><Index /></TabPane>
                <TabPane tab="我的信息" key="2"><Info /></TabPane>
            </Tabs>
        );
        return this.createDom(content);
    }
});

var TabBarExtraContent = React.createClass({

    render: function() {
        return (
            <div className="tabbar-avatar">
                <a href={`${url.account}/${this.props.accountInfo.accountid}`}>
                    <Image alt="头像" src={ this.props.accountInfo.avatarUrl} circle responsive/>
                </a>
            </div>
        );
    }

});

module.exports = App;
