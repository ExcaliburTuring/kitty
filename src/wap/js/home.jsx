/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import Swiper from 'swiper';

import { url } from 'config';
import Rabbit from 'rabbit';

import a from '../img/A.png';
import b from '../img/B.png';
import c from '../img/C.png';
import WH from '../img/51.png';
import d from '../img/D.png';
import e from '../img/E.png';
import f from '../img/F.png';

import 'antd/lib/index.css';

var RouteList = Rabbit.create(url.route); 
var DiscountCode = Rabbit.create(url.discountCode);
var Home = React.createClass({

    mixins: [
        Reflux.connect(RouteList.store, 'data'),
        Reflux.connect(DiscountCode.store, 'discountCode')
    ],

    getInitialState: function() {
        RouteList.actions.load();
        DiscountCode.actions.load();
        return {
            'data': {},
            'discountCode': {
                'discountCodes': []
            },
        };
    },

    render: function() {
        var routeList = null;
        var routes = this.state.data.routes;
        if (routes) {
            routeList = routes.map(function(route) {
                return (
                    <Routes route={route} key={route.routeid}/>
                );
            });
        } else {
            return (<div></div>);
        }

        return (
            <div>
                <div className="row">
                    <img className="wh-container" src={WH} />
                    <Slider />
                </div>
                <div className="daohang row">
                    <div className="Athird">
                        <div className="mylabel left">
                            <a href="/account/wdiscount">
                                <i className="icon"><img src={d}/></i>
                                <p>行程</p>
                            </a>
                        </div>
                    </div>
                    <div className="Athird">
                        <div className="mylabel right">
                            <a href="/account/wdiscount">
                                <i className="icon"><img src={e}/></i>
                                <p>红包</p>
                            </a>
                        </div>
                    </div>
                    <div className="Athird">
                        <div className="mylabel right">
                            <a href="javascript:">
                                <i className="icon"><img src={f}/></i>
                                <p>活动</p>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="special">
                    <div className="head-title">独家精品</div>
                    <img className="headImg" src="http://a4-q.mafengwo.net/s8/M00/A5/CB/wKgBpVVplheAICRbAAiwM6iUi8E25.jpeg" />
                    <p className="route-intro">{routes[1].name}</p>
                    <p className="price">
                        {routes[1].title}
                    </p>
                    <p className="price">
                        <strong>{routes[1].minPrice}</strong>/人 起
                    </p>
                    <hr/>
                    <div className="more">
                        <span>查看详情</span>
                    </div>
                </div>
                <div className="routes">
                    <div className="head-title">出发趁年轻</div>
                    {routeList}
                    <hr/>
                    <div className="more">
                        <span>查看更多</span>
                    </div>
                </div>
            </div>
        );
    }
});

var Slider = React.createClass({

    componentDidMount: function() {
        
        var mySwiper = new Swiper (this.refs.swiper, {
            direction: 'horizontal',
            autoplay: 2000,
            speed: 600,
            loop: true,
            noSwiping : false,
            autoplayDisableOnInteraction : true,
            mousewheelControl : false,
            pagination : this.refs.pagination,
            paginationClickable: true
        });
    },

    render: function() {
        var abg = {backgroundImage: "url(" + a + ")"};
        var bbg = {backgroundImage: "url(" + b + ")"};
        var cbg = {backgroundImage: "url(" + c + ")"};
        return (
            <div className="swiper-container Aone" ref="swiper">
                <div className="swiper-wrapper">
                    <div className="swiper-slide swiper-no-swiping" style={abg}></div>
                    <div className="swiper-slide swiper-no-swiping" style={bbg}></div>
                    <div className="swiper-slide swiper-no-swiping" style={cbg}></div>
                </div>
                <div className="swiper-pagination swiper-pagination-bullets" ref="pagination"></div>
            </div>
        );
    }
});

var Routes = React.createClass({

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
                <img className="headImg" src={route.headImg} />
                <p className="route-intro">【{route.name}】{route.title}</p>
            </div>
        )
    }
})

module.exports = Home;
