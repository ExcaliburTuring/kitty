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
                        也许生活终究将会归于平凡<br/>
                        但在我变得平凡之前 ，总想出去看一眼<br/>
                        也许只是一个周末，一个星期，一次假期<br/>
                        但也足够让我跳出当下，感受神奇的大自然<br/>
                        品尝风格迥异的美食，见识各色信仰、民族、文化与生活<br/><br/>
                    </h6>
                    <div className="head">
                        <div className="line"/>
                        <div className="title">走之旅行领队计划</div>
                        <div className="line"/>
                        <div className="subheading">"这个世界上有高高在上的规则，也有自由奔放的灵魂。"</div>
                    </div>
                    <Col md={12} sm={12}>
                        <div className="numbers">A</div>
                        <div className="activity">
                            <h2>周末领队</h2>
                            <h5><span className="orange">对象： </span>在校大学生/研究生，或者有一份稳定工作，想兼职尝试不同人生。<br/>
                                <span className="orange">要求： </span>外向，责任心，爱好旅行<br/>
                                <span className="orange">时间： </span>周六周日~<br/>
                                <span className="orange">薪水： </span>100-300/天+奖金+食宿补贴~<br/>
                                <span className="orange">工作： </span>熟悉路线，景区；活跃气氛，照顾好大家吃喝玩乐~<br/>
                                <span className="orange">福利： </span>旅途浪漫，想单身都难~<br/>
                                <span className="orange">加分项： </span>1.985/211在读或毕业<br/>
                                <span className="white">加分项： </span>2.周末时间充足<br/>
                                <span className="white">加分项： </span>3.丰富旅行经验<br/>
                                <span className="white">加分项： </span>4.班级社团学生会管理经验<br/><br/>
                            </h5>
                        </div>
                    </Col>
                    <Col md={12} sm={12}>
                        <div className="numbers">B</div>
                        <div className="activity">
                            <h2>长线领队</h2>
                            <h5><span className="orange">对象： </span>在校大学生/研究生，或者有一份稳定工作，想兼职尝试不同人生。<br/>
                                <span className="orange">要求： </span>充足时间，强健身体，责任心，丰富旅行经验，协调能力<br/>
                                <span className="orange">时间： </span>连续7-9天<br/>
                                <span className="orange">薪水： </span>300-500/天+奖金+食宿补贴+大交通报销<br/>
                                <span className="orange">工作： </span>按照流程规范，带领队伍出发。完成活动安排、确保旅行安全、传播走之旅行理念<br/>
                                <span className="orange">福利： </span>旅途浪漫，想单身都难~<br/>
                                <span className="orange">加分项： </span>1.985/211在读或毕业<br/>
                                <span className="white">加分项： </span>2.走之粉丝，参加过长线旅行<br/>
                                <span className="white">加分项： </span>3.走南闯北的自助旅行经历、或者领队相关工作经验<br/>
                                <span className="white">加分项： </span>4.完成领队体验<br/><br/>
                            </h5>
                        </div>
                    </Col>
                    <Col md={12} sm={12}>
                        <div className="numbers">C</div>
                        <div className="activity">
                            <h2>领队体验</h2>
                            <h5><span className="orange">对象： </span>任何想成为领队，体验领队的小伙伴<br/>
                                <span className="orange">玩法： </span>走之旅行全部3天（含）以上产品，半价体验（出行时间与主领队协商确定），当上副领队，协助主领队完成整个旅程。旅行完成后，如果能加入我们，成为长线领队，那么所收费用全额返还，没有时间期限<br/><br/>
                            </h5>
                        </div>
                    </Col>
                    <div className="end">如同吸足了新鲜空气<br/>
                        哪怕只有么几天逃离现实<br/>
                        让我有勇气面对整整一年的无聊、重复、两点一线。
                    </div>
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
