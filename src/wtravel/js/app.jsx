import React from 'react';
import Reflux from 'reflux';

import Swiper from 'swiper';
import icona from '../img/A.svg';
import iconb from '../img/B.svg';
import iconc from '../img/C.svg';
import { url } from 'config';
import Rabbit from 'rabbit';
import { Icon } from 'antd';

import 'antd/lib/index.css';

var RouteList = Rabbit.create(url.route); 

var App = React.createClass({

    mixins: [Reflux.connect(RouteList.store, 'data')],

    getInitialState() {
        return {
          selectedTab: 'redTab',
          hidden: false,
        };
    },
    renderContent(pageText) {
        return (
          <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
            <div style={{ paddingTop: 60 }}>你已点击“{pageText}” tab， 当前展示“{pageText}”信息</div>
            <a style={{ display: 'block', marginTop: 40 }} onClick={(e) => {
              e.preventDefault();
              this.setState({
                hidden: !this.state.hidden,
              });
            }}>点击切换 tab-bar 显示/隐藏</a>
          </div>
        );
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

        var routes = this.state.data.routes;
        var routeList = routes.map(function(route) {
            return (
                    <Routes route={route} key={route.routeid}/>
            );
        });

        return (
            <div>
                <div className="special">
                    <div className="head-title"><span className="pinyin">dú jiā</span>独家精品</div>
                    <p className="second-title">基于20万用户的好评推荐，资深定制师实地考察匠心打造</p>
                    <img className="headImg" src={routes[0].headImg} />
                    <p className="route-intro">【{routes[0].name}】{routes[0].title}</p>
                    <div className="row">
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
                <div className="tab-bar">
                    <div className="row">
                        <div className="Athird">
                            <div className="tab-btn">
                                <Icon type="home" />主页
                            </div>
                        </div>
                        <div className="Athird">
                            <div className="tab-btn">
                                <Icon type="pay-circle-o" />我的
                            </div>
                        </div>
                        <div className="Athird">
                            <div className="tab-btn">
                                <Icon type="book" />行程
                            </div>
                        </div>
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
                </div>
            </div>
        )
    }
})

module.exports = App;
