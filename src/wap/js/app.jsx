import React from 'react';
import Reflux from 'reflux';
import { Col, Image } from 'react-bootstrap';


import Swiper from 'swiper';
import a from '../img/A.png';
import b from '../img/B.png';
import c from '../img/C.png';
import icona from '../img/A.svg';
import iconb from '../img/B.svg';
import iconc from '../img/C.svg';
import { url } from 'config';
import Rabbit from 'rabbit';

var RouteList = Rabbit.create(url.route); 

var App = React.createClass({

    mixins: [Reflux.connect(RouteList.store, 'data')],

    getInitialState: function() {
        return {
            'data': {
                'status': 1,
                'errors': [],
                'routes': []
            }
        }
    },

    componentDidMount: function() {
        RouteList.actions.load();
        var mySwiper = new Swiper (this.refs.swiper, {
            direction: 'horizontal',
            autoplay: 2000,
            speed: 600,
            loop: true,
            noSwiping : false,
            autoplayDisableOnInteraction : true,
            mousewheelControl : false,
            pagination : this.refs.pagination,
        });
    },

    render: function() {
        var abg = {backgroundImage: "url(" + a + ")"};
        var bbg = {backgroundImage: "url(" + b + ")"};
        var cbg = {backgroundImage: "url(" + c + ")"};

        var routes = this.state.data.routes;
        var routeList = routes.map(function(route) {
            return (
                    <Routes route={route} key={route.routeid}/>
            );
        });

        return (
            <div className="container">
                <div className="swiper-container" ref="swiper">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide swiper-no-swiping" style={abg}></div>
                        <div className="swiper-slide swiper-no-swiping" style={bbg}></div>
                        <div className="swiper-slide swiper-no-swiping" style={cbg}></div>
                    </div>
                    <div className="swiper-pagination swiper-pagination-bullets" ref="pagination"></div>
                </div>
                <Col className="daohang" sm={12} md={12}>
                    <Col className="left" sm={4} md={4}>
                        <div className="mylabel">
                            <i className="icon"><img src={icona}/>
                            </i>
                            <p>优惠券</p>
                            <p className="status"><span className="red">0</span>张</p>
                        </div>
                    </Col>
                    <Col className="left" sm={4} md={4}>
                        <div className="mylabel">
                            <i className="icon"><img src={iconb}/>
                            </i>
                            <p>红包</p>
                            <p className="status"><span className="red">0</span>元</p>
                        </div>
                    </Col>
                    <Col className="left" sm={4} md={4}>
                        <div className="mylabel">
                            <i className="icon"><img src={iconc}/>
                            </i>
                            <p>活动</p>
                            <p className="status"><span className="red">3</span>个进行中</p>
                        </div>
                    </Col>
                </Col>
                <Col className="routes" sm={12} md={12}>
                    {routeList}
                </Col>
            </div>
        );
    }
});

var Routes =React.createClass({

    getInitialState: function() {
        return{
            'detailVisible': 'false'
        }
    },

    onClick: function() {
        var routeid = this.props.route.routeid;
        window.location.pathname= `${url.travel}/${routeid}`;
    },

    render: function() {
        var route = this.props.route;

        return (
            <div className="route-container">
                <Col className="nopadding" sm={6} md={6}>
                    <Image className="headimg" responsive src={route.headImg} onClick={this.onClick}/>
                </Col>
                <Col sm={6} md={6}>
                    <div className="days">
                        <span className="up">{route.days}</span><span className="down">DAY</span>
                    </div>
                    <div className="name" onClick={this.onClick}>
                        {route.name}
                    </div>
                    <div className="title">
                        {route.title}
                    </div>
                    <div className="route">
                        路线： <span className="">{route.route}</span>
                    </div>
                    <div className="price">
                        {route.minPrice} - {route.maxPrice}
                    </div>
                </Col>
            </div>
        )
    }
})

module.exports = App;
