import React from 'react';

import Swiper from 'swiper';
import head from '../img/head';
import aaa from '../img/aaa';
import ccc from '../img/ccc';
import ddd from '../img/ddd';
import headimg from '../img/headimg';
import people from '../img/people';
import people2 from '../img/people2';

var App = React.createClass({

    componentDidMount: function(){
        var mySwiper = new Swiper (this.refs.swiper, {
            direction: 'vertical',
            loop: false,
            mousewheelControl : true,
            nextButton: this.refs.next,
            speed: 1000,
            pagination: this.refs.pagination,
            paginationType : 'custom',
            paginationCustomRender: function (swiper, current, total) {
/*                return (
                    <ul class="onepage-pagination" style="opacity: 1;">
                        for (var i = total - 1; i >= 0; i--) {
                            if(current.equals(i)){
                                return
                                (
                                    aaa="active"
                                )
                            };
                            (<li className="active">
                                <a>
                                    <span className="dot"></span>
                                    <span className="dot-stroke"></span>
                                    <span className="progress-nav-text"></span>
                                </a>
                            </li>)
                        }
                    </ul>
                );*/

            }
        });
    },

    render: function() {
        var bg1 = { backgroundImage: "url(" + aaa + ")"};
        var bg3 = { backgroundImage: "url(" + ccc + ")"};
        var bg4 = { backgroundImage: "url(" + ddd + ")"};
        return (
            <div className="swiper-container" ref="swiper">
                <div className="swiper-wrapper">
                    {/*<div className="swiper-slide">
                        <div className="activity-container">
                            <img src={head} />
                            <div className="bottom" ref="next">点击查看下一页<br /><i className="fa fa-angle-down"/></div>
                        </div>
                    </div>*/}
                    <div className="swiper-slide">
                        <div className="activity-container" style={bg1}>
                            <img className="head-img" src={headimg} />
                            <img className="people" src={people} />
                            <div className="intro">
                                <div className="title">活动1：一路有你</div>
                                <h4>对象：2人以上</h4>
                                <div className="button">参与方式</div>
                                <h3>报名时选择“N人同行优惠”即可享受啦~</h3>
                                <div className="button">详细说明</div>
                                <h3>大好时光怎能一个人独享，拉上你的闺蜜/死党/好友/基友一起来吧!</h3>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="activity-container">
                            <img className="people2" src={people2} />
                            <div className="intro">
                                <div className="title">活动2：那些年，我们一起上过的大学</div>
                                <h4>对象：持有效学生证的同学</h4>
                                <div className="button">参与方式</div>
                                <h3>报名时勾选学生证即可</h3>
                                <div className="button">详细说明</div>
                                <h3>我们是祖国的花朵，趁年轻赶紧享受门票折扣的阳光！</h3>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="activity-container" style={bg3}>
                            <div className="intro">
                                <div className="title">活动3：后会友期</div>
                                <h4>对象：持有优惠码的小伙伴</h4>
                                <div className="button">参与方式</div>
                                <h3>报名时输入优惠码验证成功即可~</h3>
                                <div className="button">详细说明</div>
                                <h3>优惠码有效期为两年，要小心藏好哦！用不了还可以送给周围需要的小伙伴^v^</h3>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="activity-container" style={bg4}>
                            <div className="intro">
                                <div className="title">一个人的奇幻漂流</div>
                                <h3><br/>
                                    被小伙伴残忍的抛弃了怎么办？<br/>
                                    一个人玩照样精彩！<br/>
                                    逍遥君承诺，<br/>
                                    旅行没有单房差！<br/>
                                    因男女比例无法同性拼房,<br/>
                                    就一个人睡大床~<br/>
                                    还要悄悄告诉你，<br/>
                                    星空下，篝火旁，<br/>
                                    一言不合就脱单!
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="swiper-pagination swiper-pagination-bullets" ref="pagination"></div>
            </div>
        );
    }
});


module.exports = App;
