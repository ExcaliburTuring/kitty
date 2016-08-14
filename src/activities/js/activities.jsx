import React from 'react';
import {Col } from 'react-bootstrap';

import Sun from '../img/sun.svg';
import Moon from '../img/moon.svg';


var App = React.createClass({
    render: function() {
        return (
            <div className="container">
                <div className="table">
                    <div className="head">
                        <div className="line"/>
                        <div className="title">暑期优惠活动</div>
                        <div className="line"/>
                        <div className="subheading">逍遥君暑期大放“价”</div>
                    </div>
                    <Col md={12} sm={12}>
                        <div className="numbers">A</div>
                        <div className="activity">
                            <h2>活动A：一路有你</h2>
                            <h5><span className="orange">对象： </span>2人以上<br/>
                                <span className="orange">参与方式： </span>报名时选择“N人同行优惠”即可享受啦~<br/>
                                <span className="orange">详细说明： </span>大好时光怎能一个人独享，拉上你的闺蜜/死党/好友/基友一起来吧!<br/><br/>
                            </h5>
                        </div>
                    </Col>
                    <Col md={12} sm={12}>
                        <div className="numbers">B</div>
                        <div className="activity">
                            <h2>活动B：那些年，我们一起上过的大学</h2>
                            <h5><span className="orange">对象： </span>持有效学生证的同学<br/>
                                <span className="orange">参与方式： </span>报名时勾选学生证即可<br/>
                                <span className="orange">详细说明： </span>我们是祖国的花朵，趁年轻赶紧享受门票折扣的阳光！<br/><br/>
                            </h5>
                        </div>
                    </Col>
                    <Col md={12} sm={12}>
                        <div className="numbers">C</div>
                        <div className="activity">
                            <h2>活动C：后会友期</h2>
                            <h5><span className="orange">对象： </span>持有优惠码的小伙伴<br/>
                                <span className="orange">参与方式： </span>报名时输入优惠码验证成功即可<br/>
                                <span className="orange">详细说明： </span>优惠码有效期为两年，要小心藏好哦！用不了还可以送给周围需要的小伙伴^_^<br/><br/>
                            </h5>
                        </div>
                    </Col>
                    <Col md={12} sm={12}>
                        <div className="numbers"></div>
                        <div className="activity">
                            <h2>一个人的奇幻漂流</h2>
                            <h5>被小伙伴残忍的抛弃了怎么办？<br/>
                                逍遥君承诺，旅行没有单房差！<br/>
                                因男女比例无法同性拼房就一个人睡大床<br/>
                                还要悄悄告诉你，星空下，篝火旁，一言不合就脱单<br/><br/>
                            </h5>
                        </div>
                    </Col>
                    <div className="end">以上优惠能不能一起用？<br/>
                        能！能！能！<br/>
                        逍遥君才不跟假期那么小气呢！<br/>
                        放个假还要调休，我们放价就放个痛快！
                    </div>
                    <div className="head">
                        <div className="line"/>
                        <div className="title">海逍遥旅行</div>
                        <div className="line"/>
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = App;
