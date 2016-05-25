import React from 'react';

import Swiper from 'swiper';
import head from '../img/head';
import aaa from '../img/aaa';
import bbb from '../img/bbb';
import ccc from '../img/ccc';

var App = React.createClass({

    componentDidMount: function(){
        var mySwiper = new Swiper (this.refs.swiper, {
            direction: 'vertical',
            loop: false,
            mousewheelControl : true,
            nextButton: this.refs.next,
            speed: 1000,
            pagination: this.refs.pagination,
            paginationClickable :true
        });
    },

    render: function() {
        var bg1 = { backgroundImage: "url(" + aaa + ")"};
        var bg2 = { backgroundImage: "url(" + bbb + ")"};
        var bg3 = { backgroundImage: "url(" + ccc + ")"};
        return (
            <div className="swiper-container" ref="swiper">
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <div className="activity-container" style={bg2}>
                            <div className="container">
                                <h2>暑期大放“价”</h2>
                                <h4>端午、暑假、中秋、国庆、元旦、春节、清明、五一、年假<br/>小伙伴们最心心念念的是啥？自然是放假！<br/>逍遥君呢？自然是放“价”</h4>
                                <h2>一路有你</h2>
                                <h4>两人及以上同时参加旅行！</h4>
                                <h4>报名时选择“N人同行优惠”即可享受啦</h4>
                                <h4>大好时光怎能一个人独享，拉上你的闺蜜/死党/好友/基友一起来吧</h4>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="activity-container" style={bg2}>
                            <div className="container">
                                <h2>那些年，我们一起上过的大学</h2>
                                <h4>持有效学生证的同学（不含研究生证）</h4>
                                <h4>报名时勾选学生证即可</h4>
                                <h4>我们是祖国的花朵，趁年轻赶紧享受门票折扣的阳光！</h4>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="activity-container" style={bg2}>
                            <div className="container">
                                <h2>后会友期</h2>
                                <h4>持有优惠码的小伙伴</h4>
                                <h4>报名时输入优惠码验证成功即可</h4>
                                <h4>每个参与旅行的小伙伴活动完成后即可获得优惠码哦。逍遥君也会不定期向大家账户发福利！</h4>
                                <h4>优惠码有效期为两年，要小心藏好哦！用不了还可以送给周围需要的小伙伴^v^</h4>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="activity-container" style={bg2}>
                            <div className="container">
                                <h2>以上优惠能不能一起用？</h2>
                                <h4>能！能！能！</h4>
                                <h4>逍遥君才不跟假期那么小气呢！</h4>
                                <h4>放个假还要调休，我们放价就放个痛快！</h4>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="activity-container" style={bg2}>
                            <div className="container">
                                <h2>一个人的奇幻漂流</h2>
                                <h4>被小伙伴残忍的抛弃了怎么办？</h4>
                                <h4>一个人玩照样精彩！</h4>
                                <h4>逍遥君承诺，旅行没有单房差！</h4>
                                <h4>因男女比例无法同性拼房就一个人睡大床~</h4>
                                <h4>还要悄悄告诉你，星空下，篝火旁，一言不合就脱单</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="swiper-pagination" ref="pagination"></div>
            </div>
        );
    }
});


module.exports = App;
