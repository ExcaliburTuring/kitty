/**
 * @author zhaowei
 */
import React from 'react';
import Reflux from 'reflux';
import { Grid, Row, Col, Image } from 'react-bootstrap';

import { defaultValue, url } from 'config';
import Rabbit from 'rabbit';
import Banner from './banner';

import activity1 from '../img/leader.jpg';
import activity2 from '../img/postcard.jpg';
import worldmap from "../img/worldmap.png";

function _getRouteImgPath(routeImgPath) {
    return defaultValue.routeImgPath + routeImgPath;
}

const daysImgConfig = {
    1: _getRouteImgPath('p13.png'),
    2: _getRouteImgPath('p23.png'),
    3: _getRouteImgPath('p13.png'),
    7: _getRouteImgPath('p23.png')
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
        console.log(hotRoutes);
        var products = (<div></div>);
        if (hotRoutes.length != 0) {
           products = (
                <Grid>
                    <Row>
                        <Col md={6} lg={5} lgOffset={1}>
                            <Route route={hotRoutes[0]}/>
                        </Col>
                        <Col md={6} lg={5}>
                            <Route route={hotRoutes[1]} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} lg={5} lgOffset={1}>
                            <Route route={hotRoutes[2]}/>
                        </Col>
                        <Col md={6} lg={5}>
                            <Route route={hotRoutes[3]} />
                        </Col>
                    </Row>
                </Grid>
            );
        }
        var world = {backgroundImage: "url(" + worldmap + ")"};
        return (
            <div className="content">
                <Banner onDoubleDownBtnClick={this.onDoubleDownBtnClick} showDoubleDownBtn={this.state.showDoubleDownBtn}/>
                <div className="hxy-desc">
                    <div className="container">
                        <div className="row">
                            <Col lg={10} lgOffset={1} md={12} >
                                <div id="anchor" />
                                <Separator text="海逍遥旅行" ref="hxyDesc"/>
                                <div className="text">haixiaoyao</div>
                                <div className="text">诗与远方</div>
                                <Image responsive className="center-block hxy-desc-img " src="http://wpcms.cdnws.54traveler.com/wp-content/uploads/2016/04/2016041205185992.jpg" />
                            </Col>
                        </div>
                    </div>
                </div>
                <div className="products">
                    {products}
                </div>
                <div className="activities">
                    <Grid>
                        <Row>
                            <Col lg={5} lgOffset={1} md={6}>
                                <Image responsive className="center-block" src={activity1} />
                            </Col>
                            <Col lg={5} md={6}>
                                <Image responsive className="center-block" src={activity2} />
                            </Col>
                        </Row>
                    </Grid>
                </div>
                <div className="others" style={world}>
                    <Grid>
                        <Row>
                            <Col lg={10} lgOffset={1} md={12} >
                                <Separator text="关于我们"/>
                                <div className="aboutus">
                                    <div className="text-center about-text">
                                        我们坚信，在我们的星球有着很多淳朴真实的奇妙地方
                                    </div>
                                    <div className="text-center about-text">
                                        我们要做的不仅是发现这些地方,同时希望更多的人走出去，体验这样真实的旅行
                                    </div>
                                    <div className="text-center about-text">
                                        只要你愿意敞开心扉，带着接纳这个世界的心,旅行就会带给你未所期待的东西
                                    </div>
                                    <div className="text-center about-text">
                                        未来的某一天,我们希望和你一起徒步在仙乃日神山的朝圣之路,在拉街头的茶馆里喝着甜茶,或是在内蒙古草原上一同仰望星空
                                    </div>
                                    <div className="text-center about-text">
                                        这一切的一切，都在于旅行
                                    </div>
                                    <div className="text-center about-text">
                                        只有旅行才能让我们充满光和热.
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Grid>                    
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
        var imgs = route.imgs.split(',');
        var daysImg = _getDaysImg(route.days);
        return (
            <div className="route-container" onClick={this.onClick}>
                <Image responsive src={_getRouteImgPath(imgs[0])} />
                <div className="opacity">
                    <Image responsive src={_getRouteImgPath(imgs[imgs.length - 1])} />
                </div>
                <div className="days">
                    <Image responsive src={daysImg} />
                </div>
                <div className="info">
                    <span className="bar" /><a>{route.name}</a>
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
                <Col smHidden xsHidden md={4}>
                    <div className="separator-line" />
                </Col>
                <Col md={4}>
                    <div className="text-center separator-text">{this.props.text}</div>
                </Col>
                <Col smHidden xsHidden md={4}>
                    <div className="separator-line" />
                </Col>
            </div>
        );
    }

});

module.exports = App;
