/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import Swiper from 'swiper';

import { url, orderType } from 'config';
import Rabbit from 'rabbit';

import a from '../img/A.png';
import b from '../img/B.png';
import c from '../img/C.png';
import WH from '../img/51.png';
import d from '../img/D.svg';
import e from '../img/E.svg';
import f from '../img/F.png';
import g from '../img/G.svg';

import 'antd/lib/index.css';

var HotRoute = Rabbit.create(url.wapIndexHot);
var RouteList = Rabbit.create(url.route); 
var DiscountCode = Rabbit.create(url.discountCode);
var Home = React.createClass({

    mixins: [
        Reflux.connect(HotRoute.store, 'hot'),
        Reflux.connect(RouteList.store, 'data'),
        Reflux.connect(DiscountCode.store, 'discountCode')
    ],

    getInitialState: function() {
        HotRoute.actions.load();
        RouteList.actions.load();
        DiscountCode.actions.load();
        return {
            'hot': {
                'routes': []
            },
            'data': {
                'routes': []
            },
            'discountCode': {
                'discountCodes': []
            },
        };
    },

    render: function() {
        var self = this;
        var routeList = this.state.data.routes.map(function(route) {
            if (self.state.hot.routes.length
                    && self.state.hot.routes[0].routeid == route.routeid) {
                return null;
            } else {
                return (
                    <Route route={route} key={route.routeid}/>
                );
            }
        });
        return (
            <div>
                <Slider />
                <DaoHang onOrdersClick={this.props.onOrdersClick} />
                <Hot hot={this.state.hot} />
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
            <div className="row">
                <img className="wh-container" src={WH} />
                <div className="swiper-container Aone" ref="swiper">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide swiper-no-swiping" style={abg}></div>
                        <div className="swiper-slide swiper-no-swiping" style={bbg}></div>
                        <div className="swiper-slide swiper-no-swiping" style={cbg}></div>
                    </div>
                    <div className="swiper-pagination swiper-pagination-bullets" ref="pagination"></div>
                </div>
            </div>
        );
    }
});

var DaoHang = React.createClass({

    onTravelsClick: function() {
        $('html, body').animate({
            'scrollTop':  $('.routes').offset().top
        }, {
            'speed': 800
        });
    },

    render: function() {
        return (
            <div className="daohang row">
                <div className="Afourth">
                    <div className="mylabel right">
                        <a href="javascript:" onClick={()=>{this.props.onOrdersClick(orderType.CURRENT)}}>
                            <i className="icon"><img src={e}/></i>
                            <p>行程</p>
                        </a>
                    </div>
                </div>
                <div className="Afourth">
                    <div className="mylabel left">
                        <a href="javascript:" onClick={this.onTravelsClick}>
                            <i className="icon"><img src={d}/></i>
                            <p>路线</p>
                        </a>
                    </div>
                </div>
                <div className="Afourth">
                    <div className="mylabel right">
                        <a href="javascript:">
                            <i className="icon"><img src={g}/></i>
                            <p>活动</p>
                        </a>
                    </div>
                </div>
                <div className="Afourth">
                    <div className="mylabel right">
                        <a href="/account/wdiscount">
                            <i className="icon"><img src={f}/></i>
                            <p>红包</p>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
});

var Hot = React.createClass({

    render: function() {
        var routes = this.props.hot.routes;
        if (!routes.length) {
            return (<div className="special"></div>);
        }
        var route = routes[0];
        return (
            <div className="special row">
                <div className="head-title">独家精品</div>
                <a href={`${url.travel}/${route.routeid}`}>
                    <img className="head-img" src={route.headImg} />
                </a>
                <p className="route-intro">{route.name}</p>
                <p className="price">{route.title}</p>
                <p className="price">
                    <strong>{route.minPrice}</strong>/人 起
                </p>
                <hr/>
                <div className="more">
                    <span onClick={()=>{window.location.href=`${url.travel}/${route.routeid}`}}>查看详情</span>
                </div>
            </div>
        );
    }
});

var Route = React.createClass({

    getInitialState: function() {
        return{
            'detailVisible': 'false'
        }
    },

    render: function() {
        var route = this.props.route;
        return (
            <div className="route-container">
                <a href={`${url.travel}/${route.routeid}`}>
                    <img className="head-img" src={route.headImg} />
                </a>
                <p className="route-intro">【{route.name}】{route.title}</p>
            </div>
        );
    }
})

module.exports = Home;
