/**
 * @author xiezhenzong
 */
import React from 'react';

import { defaultValue } from 'config';

var WxLogin = React.createClass({

    getInitialState: function() {
        return {
            'data': {
            }
        }
    },

    render: function() {
        return (
            <div> 
                <p>这里是微信登录的二维码</p>
            </div>
        );
    }
});

module.exports = WxLogin;