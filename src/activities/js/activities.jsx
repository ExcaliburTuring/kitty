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
                        <div className="title">走之旅行优惠活动</div>
                        <div className="line"/>
                        <div className="subheading">你们放假，我们“放价”！</div>
                    </div>
                    <Col md={12} sm={12}>
                        <div className="numbers">A</div>
                        <div className="activity">
                            <h2>活动A：“一路同行”多人报名优惠</h2>
                            <h5><span className="orange">对象： </span>2人及以上同时报名<br/>
                                <span className="orange">参与方式： </span>报名时正确填写小伙伴信息，选择优惠政策即可~<br/>
                                <span className="orange">详细说明： </span>长途旅行，2人优惠300元，3人优惠500元！<br/><br/>
                            </h5>
                        </div>
                    </Col>
                    <Col md={12} sm={12}>
                        <div className="numbers">B</div>
                        <div className="activity">
                            <h2>活动B：“同窗岁月” 学生优惠</h2>
                            <h5><span className="orange">对象： </span>持有效学生证同学（研究生除外）<br/>
                                <span className="orange">参与方式： </span>报名时勾选学生证即可<br/>
                                <span className="orange">详细说明： </span>学生证在手，走遍天下都半价。我们可是祖国的花朵，趁年轻赶紧享受门票折扣的阳光！<br/>每条路线门票价格有所不同，请在报名时查看。<br/><br/>
                            </h5>
                        </div>
                    </Col>
                    <Col md={12} sm={12}>
                        <div className="numbers">C</div>
                        <div className="activity">
                            <h2>活动C：“码上有礼” 优惠券多多</h2>
                            <h5><span className="orange">对象： </span>有优惠码同学<br/>
                                <span className="orange">参与方式： </span>报名时输入优惠码即可<br/>
                                <span className="orange">详细说明： </span>2016年注册走之旅行的用户，我们会直接送50元优惠券到你账户作为见面礼~<br/>还想要怎么办捏，参加旅行后，在朋友圈秀出最美的照片，截图发给客服，我们会送出100元，300元，500元不等的优惠券，要看你怎么费尽心思打动我们客服喽。<br/>送出优惠码不记名，用不掉可以送给需要的小伙伴哈<br/><br/>
                            </h5>
                        </div>
                    </Col>
                    <Col md={12} sm={12}>
                        <div className="numbers">D</div>
                        <div className="activity">
                            <h2>活动D：“可能遇见TA”</h2>
                            <h5><span className="orange">对象： </span>单人参团小伙伴<br/>
                                <span className="orange">内容： </span>没有单房差！<br/>
                                <span className="orange">详细说明： </span>一个人来也不用担心哦，走之旅行领队最擅长的就是带大家一起玩了。年轻活力小团队，全程互动，迅速打成一片。脱离工作小圈子，跨公司跨行业认识一群有趣的人。<br/>大漠、星空、银河、帐篷，这么浪漫的旅程，一不小心就遇上了那个TA。<br/>PS：常年以来妹子比例从来没低于60%，汉子们在哪里，快来报名呀。<br/><br/>
                            </h5>
                        </div>
                    </Col>
{/*                    <div className="end">以上优惠能不能一起用？<br/>
                        能！能！能！<br/>
                        逍遥君才不跟假期那么小气呢！<br/>
                        放个假还要调休，我们放价就放个痛快！
                    </div>*/}
                    <div className="head">
                        <div className="line"/>
                        <div className="title">走之旅行</div>
                        <div className="line"/>
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = App;
