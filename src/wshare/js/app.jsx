import React from 'react';

import { url, defaultValue } from 'config';

import Headimg from '../img/activity2.png';

var App = React.createClass({

    getInitialState: function() {
        return {
        };
    },

    render: function() {
        return (
            <div className="activity">
                <img src={Headimg} className="img-responsive"/>
                <div className="title">多人优惠!</div>
                <div className="second-title">优惠规则：</div>
                <div className="content">1、两人一起报名，享受<strong>200元</strong>优惠</div>
                <div className="content">2、三人一起报名，享受<strong>400元</strong>优惠</div>
                <div className="second-title">注意事项：</div>
                <div className="content">优惠按订单结算</div>
                <div className="content">可与优惠券、学生优惠同时使用</div>
                <div className="button-container" onClick={()=>{window.location.href="/"}}>
                    <span className="button">去看路线</span>
                </div>
            </div>
        );
    }
});

module.exports = App;
