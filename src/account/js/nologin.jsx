/**
 * @author xiezhenzong
 */
import React from 'react';

import { defaultValue } from 'config';

var NoLogin = React.createClass({
    render: function() {
        return (
            <div>
                <div>
                    <p> 您还没有登录 </p>
                </div>
                <a href = "/register"> 去组册 </a> 
                <a href = "/login"> 有账号， 去登录 </a>
            </div>
        );
    }
});

module.exports = NoLogin;