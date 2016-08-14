import React from 'react';
import {Col } from 'react-bootstrap';

import Sun from '../img/sun.svg';
import Moon from '../img/moon.svg';


var App = React.createClass({
    render: function() {
        return (
            <div className="container">
                <div className="table">
                    <h6>
                        除了生活的苟且<br/>
                        心里满满是“诗与远方”<br/>
                        然而总有那么些事情不随人愿<br/>
                        或是被小伙伴无情抛弃，或是该死的老板又让加班<br/>
                        去不了就只剩叹息和遗憾？<br/>
                        明信片计划，安慰每个心心念念的你<br/><br/>
                    </h6>
                    <div className="head">
                        <div className="line"/>
                        <div className="title">明信片计划</div>
                        <div className="line"/>
                        <div className="subheading">"这个世界上有高高在上的规则，也有自由奔放的灵魂。"</div>
                    </div>
                    <Col md={12} sm={12}>
                        <div className="numbers">A</div>
                        <div className="activity">
                            <h2>如何参与：</h2>
                            <h5><span className="orange">1： </span>选择一条你喜欢的路线（或是召集小伙伴，或是想去去不了，或是觉得好美）<br/>
                                <span className="orange">2： </span>分享到朋友圈并加32字以上感言（为啥是32？杨坤一年都有32场演唱会呢！）<br/>
                                <span className="orange">3： </span>联系客服，坐等收明信片~<br/><br/>
                            </h5>
                        </div>
                    </Col>
                    <Col md={12} sm={12}>
                        <div className="numbers">B</div>
                        <div className="activity">
                            <h2>规则说明：</h2>
                            <h5><span className="orange">1：</span>明信片一定会在你选择的路线上发出! 比如分享《大西北》，那么明信片会在嘉峪关、敦煌、茶卡盐湖等盖上邮戳，向你飞奔而来。）<br/>
                                <span className="orange">2：</span>收到的可能是一张，也可能是一整套！ 取决于感言动人程度哦！<br/>
                                <span className="orange">3：</span>每人每月仅限一次哦！ 太多了逍遥君会写到手抽筋的...<br/><br/>
                            </h5>
                        </div>
                    </Col>
                    <Col md={12} sm={12}>
                        <div className="numbers">C</div>
                        <div className="activity">
                            <h2>注意事项：</h2>
                            <h5><span className="orange">1：</span>明信片寄出的时候客服会提醒滴。 <br/>
                                <span className="orange">2：</span>邮政到达概率很高，但不会电话通知。 保证填写地址正确，以及常去学校、小区传达室看看。<br/>
                            </h5>
                        </div>
                    </Col>
                    <div className="end">
                        明信片计划，安慰每个心心念念的你
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
