/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';

import AccountBasicInfo from 'account_basicinfo';
import Login from 'login';

var App = React.createClass({

    mixins: [Reflux.connect(AccountBasicInfo.store, 'basicInfo')],

     _getQuery:  function (query, key) {
        var nvpair = {};
        var pairs = query.replace('?', '').split('&');
        $.each(pairs, function(i, v){
            var pair = v.split('=');
            nvpair[pair[0]] = pair[1];
        });
        return nvpair[key];
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
            var redirect = this._getQuery(window.location.search, 'redirect');
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
