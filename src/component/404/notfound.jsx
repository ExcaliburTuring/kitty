/**
 * @authro xiezhenzong
 */
import React from 'react';

var NotFound = React.createClass({

    render: function() {
        return (
            <div className="container"> 
                <div className="noauth-content">
                    <div className="noauth-icon">
                        <i className="fa fa-lock fa-5x"></i>
                    </div>
                     <div className="noauth-tip">
                        <p>您所访问的页面并不存在</p>
                        <p>请移步: 
                            <a href="/"><i className="fa fa-home fa-2x"></i>网站首页</a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = NotFound;
