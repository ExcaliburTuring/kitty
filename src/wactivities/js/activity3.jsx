import React from 'react';
import Headimg from '../img/activity3.png';

var App = React.createClass({

    render: function() {
        return (
            <div className="activity">
                <img src={Headimg}/>
                <div className="title">明信片计划</div>
                <div className="second-title">活动规则：</div>
                <div className="content">1、</div>
                <div className="content">2、</div>
                <div className="second-title">注意事项：</div>
                <div className="content"></div>
                <div className="button-container">
                    <span className="button">点此上传</span>
                </div>
            </div>
        );
    }
});

module.exports = App;
