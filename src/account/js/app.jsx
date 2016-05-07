/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';

import Navbar from 'navbar';
import Footer from 'footer';
import Banner from './banner';
import Tab from './tab';
import NoAuth from './noauth';
import NoLogin from './nologin';

import AccountBasicInfo from 'account_basicinfo';

var App = React.createClass({

    mixins: [Reflux.connect(AccountBasicInfo.store, 'basicInfo')],

    getInitialState: function() {
        AccountBasicInfo.actions.get();
        var { accountid } = this.props.params;
        return {
            'accountid': accountid,
            'basicInfo': {
                'login': false
            }
        };
    },

    render: function() {
        var content = (<NoLogin/>);
        if (this.state.basicInfo.accountInfo != null) {
            if (this.state.basicInfo.accountInfo.accountid == this.state.accountid) {
                content = (
                    <div>
                       <Tab accountInfo={this.state.basicInfo.accountInfo}
                            accountSetting={this.state.basicInfo.accountSetting}
                            activeKey={this.state.activeKey}/>
                       {this.props.children}
                    </div>
                );
            } else {
                content = (<NoAuth accountid={this.state.basicInfo.accountInfo.accountid}/>);
            }
        }
        return ( 
            <div>
                <Navbar/>
                <Banner/>
                {content}
                <Footer/>
            </div>
        );
    }
});

module.exports = App;
