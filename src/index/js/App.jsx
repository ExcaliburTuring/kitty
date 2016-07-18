/**
 * @author zhaowei
 */
import React from 'react';
import Reflux from 'reflux';
import { Grid, Row, Col, Image } from 'react-bootstrap';

import { defaultValue, url } from 'config';
import Rabbit from 'rabbit';
import Banner from './banner';

import activity from '../img/activity.jpg';
import activity1 from '../img/postcard.jpg';
import activity2 from '../img/leader.jpg';
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
                    <Col md={6} lg={6}>
                        <Route route={hotRoutes[0]}/>
                    </Col>
                    <Col md={6} lg={6}>
                        <Route route={hotRoutes[1]} />
                    </Col>
                    <Col md={6} lg={6}>
                        <Route route={hotRoutes[2]}/>
                    </Col>
                    <Col md={6} lg={6}>
                        <Route route={hotRoutes[3]} />
                    </Col>
                    <Col md={12} lg={12}>
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
                        <Col lg={4} md={4}>
                            <a href="/activities">
                                <Image responsive src={activity1}/>
                            </a>
                        </Col>
                        <Col lg={4} md={4}>
                            <a href="/activities">
                                <Image responsive src={activity}/>
                            </a>
                        </Col>
                        <Col lg={4} md={4}>
                            <Image responsive src={activity2}/>
                        </Col>
                    </div>
                    <Separator text="海逍遥旅行" ref="hxyDesc"/>
                    <div className="products">
                        {products}
                    </div>
                    <Separator text="关于我们" ref="hxyDesc"/>
                    <div className="others container" style={world}>
                        <Col lg={6} md={6} >
                            <div className="aboutimg">
                                <Image responsive src={Aboutus} />
                            </div>
                        </Col>
                        <Col lg={6} md={6} >
                            <div className="aboutus">
                                <div className="about-text">
                                    我们坚信，<br />
                                    在这个星球上有很多淳朴真实的奇妙地方。<br />
                                    我们要做的不仅是发现这些地方，同时希望更多的人走出去，体验这样真实的旅行。<br />
                                    如果愿意敞开心扉，带着接纳这个世界的心，旅行就会带给你前所未有的期待。<br /><br />
                                    未来的某一天，<br />
                                    我们希望和你一起徒步在仙乃日神山的朝圣之路，<br />
                                    或是在内蒙古草原上一同仰望星空。<br />
                                    这一切的一切，都在于旅行。
                                </div>
                            </div>
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
        window.location.pathname= `${url.travel}/${routeid}`;
    },

    render: function() {
        var route = this.props.route;
        var daysImg = _getDaysImg(route.days);
        return (
            <div className="route-container" onClick={this.onClick}>
                <figure className="effect-apollo">
                        <Image responsive src={route.headImg} />
                        <figcaption>
                            <p>{route.title}</p>
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
