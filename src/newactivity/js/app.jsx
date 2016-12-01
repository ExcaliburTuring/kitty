import React from 'react';

var App = React.createClass({

    render: function() {
        return (
            <div className="activity">
                <div className="title">新人优惠!</div>
                <div className="second-title">优惠规则：</div>
                <div className="content">1、注册即送50元优惠券；</div>
                <div className="content">2、完善个人资料此优惠券升级为100元！</div>
                <div className="second-title">注意事项：</div>
                <div className="content">此优惠券与多人优惠不可共用；</div>
                <div className="button-container">
                    <span className="button">点此去完善</span>
                </div>
            </div>
        );
    }
});

module.exports = App;
