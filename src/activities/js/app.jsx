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
            speed: 1000
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
                        <div className="activity-container">
                            <img src={head} />
                            <div className="bottom" ref="next">点击查看下一页<br /><i className="fa fa-angle-down"/></div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="activity-container" style={bg1}>
                            <div className="container">
                                <h3>除了生活的苟且<br/>心里满满是“<span className="red">诗与远方</span>”<br/>然而总有那么些事情不随人愿<br/>或是被小伙伴无情抛弃，或是该死的老板又让加班</h3>
                                <h3>去不了就只剩叹息和遗憾？<br/><span className="red">NO！</span><br/>明信片计划，安慰每个心心念念的你</h3>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="activity-container" style={bg2}>
                            <div className="container">
                                <h2>如何参与？</h2>
                                <h4>1.选择一条你喜欢的路线（或是召集小伙伴，或是想去去不了，或是觉得好美）<br/>2.分享到朋友圈并加32字以上感言（为啥是32？杨坤一年都有32场演唱会呢！）<br/>3.联系客服，坐等收明信片~</h4>
                                <h2>规则说明：</h2>
                                <h4>1.明信片一定会在你选择的路线上发出<br/>（比如分享《大西北》，那么明信片会在嘉峪关、敦煌、茶卡盐湖等盖上邮戳，向你飞奔而来。）<br/>2.收到的可能是一张，也可能是一整套！取决于感言动人程度哦！<br/>3.每人每月仅限一次哦！太多了逍遥津会写到手抽筋的...</h4>
                                <h2>注意事项：</h2>
                                <h4>明信片寄出的时候客服会提醒滴<br/>邮政到达概率很高，但不会电话通知。保证填写地址正确，以及常去学校、小区传达室看看。</h4>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="activity-container" style={bg3}>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = App;
