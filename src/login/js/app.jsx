/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';

import AccountBasicInfo from 'account_basicinfo';
import Login from 'login';

var App = React.createClass({

    mixins: [Reflux.connect(AccountBasicInfo.store, 'basicInfo')],

     _getQuery:  function (key) {
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        return r != null ? unescape(r[2]): null; 
    },

    getInitialState: function() {
        AccountBasicInfo.actions.get();
        return {
            'basicInfo': {}
        }
    },

    render: function() {
        var accountInfo = this.state.basicInfo.accountInfo;
        if (accountInfo != null) { // 已经登陆了
            var redirect = this._getQuery('redirect');
            if (redirect) {
                window.location.href = redirect;
            } else {
                window.location.href = '/';
            }
            return null;
        } else {
            return (
                <div className="app-container">
                    <div className="container">
                        <Login/>
                    </div>
                </div>
            );
        }
    }
});

module.exports = App;
