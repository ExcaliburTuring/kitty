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
            'basicInfo': {}
        };
    },

    render: function() {
        var content = (<NoLogin/>);
        var accountInfo = this.state.basicInfo.accountInfo;
        if (accountInfo != null) {
            if (accountInfo.accountid == this.state.accountid) {
                content = (
                    <div>
                       <Tab accountInfo={accountInfo}/>
                       {this.props.children}
                    </div>
                );
            } else {
                content = (<NoAuth accountid={accountInfo.accountid}/>);
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
