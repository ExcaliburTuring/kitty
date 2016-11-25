/**
 * @author zhaowei
 */
import React from 'react';
import Reflux from 'reflux';
import { Grid, Row, Col, Image, Jumbotron } from 'react-bootstrap';
import marked from 'marked';

import { defaultValue, url } from 'config';
import Rabbit from 'rabbit';
import Banner from './banner';

import activity1 from '../img/postcard.jpg';
import activity2 from '../img/activity.jpg';
import activity3 from '../img/leader.jpg';
import worldmap from "../img/worldmap.png";
import Aboutus from "../img/aboutus.jpg";

const daysImgConfig = {
    1: defaultValue.getRouteImgPath('1.png'),
    2: defaultValue.getRouteImgPath('2.png'),
    3: defaultValue.getRouteImgPath('3.png'),
    4: defaultValue.getRouteImgPath('4.png'),
    5: defaultValue.getRouteImgPath('5.png'),
    6: defaultValue.getRouteImgPath('6.png'),
    7: defaultValue.getRouteImgPath('7.png'),
    8: defaultValue.getRouteImgPath('8.png'),
    9: defaultValue.getRouteImgPath('9.png')
}

function _getDaysImg(days) {
    return daysImgConfig[days];
}

var IndexHot = Rabbit.create(url.indexHot); 

var App = React.createClass({

    mixins: [Reflux.connect(IndexHot.store, 'data')],

    getInitialState: function() {
        IndexHot.actions.load();
        return {
            'data': {
                'status': 0,
                'routes': []
            },
            'showDoubleDownBtn': true
        };
    },

    onDoubleDownBtnClick: function() {
        $('html, body').animate({
            scrollTop: $('#anchor').offset().top
        }, 800);
        this.setState({
            'showDoubleDownBtn': false
        });
    },

    render: function() {
        var hotRoutes = this.state.data.routes;
        var products = (<div></div>);
        if (hotRoutes.length != 0) {
           products = (
                <div>
                    <Col sm={6} md={6} lg={6}>
                        <Route route={hotRoutes[0]}/>
                    </Col>
                    <Col sm={6} md={6} lg={6}>
                        <Route route={hotRoutes[1]} />
                    </Col>
                    <Col sm={6} md={6} lg={6}>
                        <Route route={hotRoutes[2]}/>
                    </Col>
                    <Col sm={6} md={6} lg={6}>
                        <Route route={hotRoutes[3]} />
                    </Col>
                    <Col sm={10} smPush={1} mdPush={0} md={12} lg={12}>
                        <div className="more">
                            <a href="/routes">查看更多</a>
                            <i className="fa fa-angle-right"/>
                        </div>
                    </Col>
                </div>
            );
        }
        var world = {backgroundImage: "url(" + worldmap + ")"};
        return (
            <div className="body">
                <Banner onDoubleDownBtnClick={this.onDoubleDownBtnClick} showDoubleDownBtn={this.state.showDoubleDownBtn}/>
                <div  className="content container">
                    <div className="activities">
                        <Col sm={4} lg={4} md={4}>
                            <a href="/activities#/2">
                                <Image responsive src={activity2}/>
                            </a>
                        </Col>
                        <Col sm={4} lg={4} md={4}>
                            <a href="/activities#/1">
                                <Image responsive src={activity1}/>
                            </a>
                        </Col>
                        <Col sm={4} lg={4} md={4}>
                            <a href="/activities#/3">
                                <Image responsive src={activity3}/>
                            </a>
                        </Col>
                    </div>
                    <Separator text="海逍遥旅行" ref="hxyDesc"/>
                    <Jumbotron style={{'marginTop': 16 + 'px'}}>
                        <p>尊敬的用户，对不起！当前系统处于测试阶段</p>
                        <p>如果您想报名某条路线可直接致电海逍遥: {defaultValue.hotline}</p>
                    </Jumbotron>
                    <Col className="products" sm={10} smPush={1} md={12} mdPush={0} lg={12}>
                        {products}
                    </Col>
                    <Separator text="关于我们" ref="hxyDesc"/>
                    <div className="others container" style={world}>
                        <Col smPush={1} sm={10} mdPush={0} md={12}>
                            <Col sm={6} md={6} lg={6} >
                                <div className="aboutimg">
                                    <Image responsive src={Aboutus} />
                                </div>
                            </Col>
                            <Col sm={6} lg={6} md={6} >
                                <div className="aboutus">
                                    <div className="about-text">
                                        <p>走之，是几个程序员创办的神秘旅行组织</p>
                                        <p>我们不但会写代码，拯救地球，还能带你看看这个世界</p>
                                        <p>只约年轻、有趣、聊得来小伙伴</p>
                                        <p>只做有品质的旅行</p>
                                        <p>不操心，不玩套路，不带熊孩子</p>
                                        <p>一看就跟外面那些妖艳货色不一样</p>
                                        <p>走出格子间，去见见那些有趣又素未蒙面的人</p>
                                        <p>去尝试那些不敢料想的生活</p>
                                        <p>旅行不只去看看，更是换一种人生</p>
                                    </div>
                                </div>
                            </Col>
                        </Col>     
                    </div>
                </div>
            </div>
        );
    }
});

var Route = React.createClass({

    onClick: function() {
        var routeid = this.props.route.routeid;
        window.location.href= `${url.travel}/${routeid}`;
    },

    render: function() {
        var route = this.props.route;
        var cover = marked(route.cover);
        var daysImg = _getDaysImg(route.days);
        return (
            <div className="route-container" onClick={this.onClick}>
                <figure className="effect-apollo">
                        <Image responsive src={route.headImg} />
                        <figcaption>
                            <div dangerouslySetInnerHTML={{__html: cover}}></div>
                            <a href="#">View more</a>
                        </figcaption>   
                </figure>
                {/*    <div className="opacity">
                        <img className="mapImg" src={route.mapImg} />
                    </div>*/}
                {/*<div className="days">
                    <Image responsive src={daysImg} />
                </div>*/}
                <div className="info">
                    <div className="days"><Image responsive src={daysImg} /></div>
                    <a>{route.name}</a>
                    <h5>{route.title}</h5>
                </div>
            </div>
        );
    }

});

var Separator = React.createClass({

    render: function() {
        return (
            <div className="separator">
                <div className="separator-text">{this.props.text}</div>
            </div>
        );
    }

});

module.exports = App;
