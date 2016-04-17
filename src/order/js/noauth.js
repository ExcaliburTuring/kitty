/**
 * @author xiezhenzong
 */
import React from 'react';

import { defaultValue } from 'config';

var NoAuth = React.createClass({
    render: function() {
        return (
            <div className="noauth-container container"> 
                <div className="noauth-content">
                    <div className="noauth-icon">
                        <i className="fa fa-lock fa-5x"></i>
                    </div>
                     <div className="noauth-tip">
                        <p>您还没有权限访问这个页面</p>
                        <p>请移步: 
                            <a href="/"><i className="fa fa-home fa-2x"></i>网站首页</a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = NoAuth;