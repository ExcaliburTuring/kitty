/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import Swiper from 'swiper';
import { Icon } from 'antd';

import { url } from 'config';
import Rabbit from 'rabbit';

import a from '../img/A.png';
import b from '../img/B.png';
import c from '../img/C.png';
import lsa from '../img/lsa.png';
import lsb from '../img/lsb.png';
import lsc from '../img/lsc.png';
import WH from '../img/51.png';
import icona from '../img/A.svg';
import iconb from '../img/B.svg';
import iconc from '../img/C.svg';

import 'antd/lib/index.css';

var RouteList = Rabbit.create(url.route); 

var Home = React.createClass({

    mixins: [Reflux.connect(RouteList.store, 'data')],

    getInitialState: function() {
        return {
          data: {}
        };
    },

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
        });
        RouteList.actions.load();
    },

    render: function() {
        var abg = {backgroundImage: "url(" + a + ")"};
        var bbg = {backgroundImage: "url(" + b + ")"};
        var cbg = {backgroundImage: "url(" + c + ")"};

        var routeList = null;
        var routes = this.state.data.routes;
        if (routes) {
            routeList = routes.map(function(route) {
                return (
                        <Routes route={route} key={route.routeid}/>
                );
            });
        }

        return (
            <div>
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
                <div className="daohang row">
                    <div className="Athird">
                        <div className="mylabel left">
                            <i className="icon"><img src={icona}/>
                            </i>
                            <p>优惠券</p>
                            <p className="status"><span className="red">0</span>张</p>
                        </div>
                    </div>
                    <div className="Athird">
                        <div className="mylabel right">
                            <i className="icon"><img src={iconb}/>
                            </i>
                            <p>红包</p>
                            <p className="status"><span className="red">0</span>元</p>
                        </div>
                    </div>
                    <div className="Athird">
                        <div className="mylabel right">
                            <i className="icon"><img src={iconc}/>
                            </i>
                            <p>活动</p>
                            <p className="status"><span className="red">3</span>个进行中</p>
                        </div>
                    </div>
                </div>
                <div className="special">
                    <div className="head-title"><span className="pinyin">dú jiā</span>独家精品</div>
                    <p className="second-title">基于20万用户的好评推荐，资深定制师实地考察匠心打造</p>
                    <img className="headImg" src={routes[0].headImg} />
                    <p className="route-intro">【{routes[0].name}】{routes[0].title}</p>
                    <div className="row">
                        <div className="Athird light-spot"><img src={lsa}/>深度西北</div>
                        <div className="Athird light-spot"><img src={lsb}/>茶卡盐湖</div>
                        <div className="Athird light-spot"><img src={lsc}/>银河星空</div>
                    </div>
                    <p className="price">
                        <strong>{routes[0].minPrice}</strong>/人 起
                    </p>
                    <hr/>
                    <div className="more">
                        <span>查看详情</span>
                    </div>
                </div>
                <div className="routes">
                    <div className="head-title"><span className="pinyin">chū fā</span>出发趁年轻</div>
                    <p className="second-title">基于20万用户的好评推荐，资深定制师实地考察匠心打造</p>
                    {routeList}
                    <hr/>
                    <div className="more">
                        <span>查看详情</span>
                    </div>
                </div>
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
                <img className="headImg" src={route.headImg} />
                <p className="route-intro">【{route.name}】{route.title}</p>
                <div className="row">
                    <div className="Athird light-spot"><img src={lsa}/>深度西北</div>
                    <div className="Athird light-spot"><img src={lsb}/>茶卡盐湖</div>
                    <div className="Athird light-spot"><img src={lsc}/>银河星空</div>
                </div>
            </div>
        )
    }
})

module.exports = Home;