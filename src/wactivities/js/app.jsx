import React from 'react';
import A1 from '../img/A1.png';
import A2 from '../img/A2.png';
import A3 from '../img/A3.png';

var App = React.createClass({

    render: function() {
        return (
            <div className="activities">
                <div className="activity-list">
                    <a href="/wactivities#/1">
                        <div className="activity-container">
                            <div className="title">
                                新用户优惠
                            </div>
                            <div className="desc">
                                用户注册即享优惠
                            </div>
                            <div className="activity-img">
                                <img src={A1}/>
                            </div>
                        </div>
                    </a>
                    <a href="/wactivities#/2">
                        <div className="activity-container">
                            <div className="title">
                                多人优惠
                            </div>
                            <div className="desc">
                                多人一起参与优惠更多哦！
                            </div>
                            <div className="activity-img">
                                <img src={A2}/>
                            </div>
                        </div>
                    </a>
                    <a href="/wactivities#/3">
                        <div className="activity-container">
                            <div className="title">
                                明信片活动
                            </div>
                            <div className="desc">
                                转发就送明信片，今天你转了吗？
                            </div>
                            <div className="activity-img">
                                <img src={A3}/>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
});

module.exports = App;
