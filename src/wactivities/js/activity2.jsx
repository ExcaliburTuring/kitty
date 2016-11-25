import React from 'react';
import Headimg from '../img/activity2.png';

var App = React.createClass({

    render: function() {
        return (
            <div className="activity">
                <img src={Headimg}/>
                <div className="title">多人优惠</div>
                <div className="second-title">优惠规则：</div>
                <div className="content">1、</div>
                <div className="content">2、</div>
                <div className="second-title">注意事项：</div>
                <div className="content">此优惠券与新人优惠不可共用；</div>
                <div className="button-container">
                    <span className="button">点此报名</span>
                </div>
            </div>
        );
    }
});

module.exports = App;
