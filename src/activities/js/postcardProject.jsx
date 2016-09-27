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
                        不是每一个计划都能顺利出发<br/>
                        不如<br/>
                        让在路上的我们，沿途给你寄张明信片吧<br/><br/>
                    </h6>
                    <div className="head">
                        <div className="line"/>
                        <div className="title">明信片计划</div>
                        <div className="line"/>
                        <div className="subheading">"明信片计划" 灵魂和脚步，必须有一个在路上</div>
                    </div>
                    <Col md={12} sm={12}>
                        <div className="numbers">A</div>
                        <div className="activity">
                            <h2>如何参与：</h2>
                            <h5><span className="orange">1： </span>选择一条你喜欢的路线（或是召集小伙伴一起去，或是早已在心里种了草，或是去过没来得及寄，或是就是觉得好美嘛）<br/>
                                <span className="orange">2： </span>分享到朋友圈并加上自己感言（要认真写哦，这个决定了你会收到一张还是一整套），任你发挥！<br/>
                                <span className="orange">3： </span>截图，联系客服。选择风流才子，或名门闺秀亲笔写一张明信片给你哦（就像下面这样）<br/>
                                <span className="orange">4： </span>明信片写好之后会给你发照片滴，以防邮政丢失<br/>
                                <span className="orange">5： </span>接下来就是漫长的期待啦，明信片会跟着我们团一起出发，在沿途重要城市或景点发出<br/>
                                <span className="orange">5： </span>时不时去收信地址检查下，期待见到它！<br/><br/>
                            </h5>
                        </div>
                    </Col>
                    <Col md={12} sm={12}>
                        <div className="numbers">B</div>
                        <div className="activity">
                            <h2>规则说明：</h2>
                            <h5><span className="orange">1：</span>明信片一定会在你选择的路线上发出! 比如分享《大西北》，那么明信片会在嘉峪关、敦煌、茶卡盐湖等盖上邮戳，向你飞奔而来。）<br/>
                                <span className="orange">2：</span>收到的可能是一张，也可能是一整套！ 取决于分享到朋友圈的感言哦！想想怎么收买我们的客服呢...<br/>
                                <span className="orange">3：</span>每人每月仅限一次哦！ 太多了真的写不过来...<br/><br/>
                            </h5>
                        </div>
                    </Col>
                    <Col md={12} sm={12}>
                        <div className="numbers">C</div>
                        <div className="activity">
                            <h2>注意事项：</h2>
                            <h5><span className="orange">1：</span>明信片寄出的时候客服会提醒滴。 <br/>
                                <span className="orange">2：</span>从给我们客服截图，到写完明信片，再到明信片跟我们团一起上路，再到我们寄出明细片，最后盖上邮戳翻越千山万水到你手中，每个过程也许都显得格外漫长。不过逍遥君一定不辜负每个期待明信片的小伙伴，保证友谊的巨轮不会翻！<br/>
                                <span className="orange">2：</span>中国邮政还是非常靠谱滴，只不过没有电话通知。一定保证填写地址正确，能够接受邮件，剩下的就是耐心等待和常去看看喽。<br/>
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
