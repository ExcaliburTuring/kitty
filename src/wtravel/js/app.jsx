import React from 'react';
import Reflux from 'reflux';
import marked from 'marked';
import Swiper from 'swiper';
import { Drawer, List, Button, Grid, Toast, Popup, Icon } from 'antd-mobile';

import { url, defaultValue, groupStatus } from 'config';
import Rabbit from 'rabbit';

import f1 from '../img/f1.png';
import img from '../img/img.jpg';
import bg from '../img/11.png';
import square from '../img/54.png';

function hxyError(e, tag) {
    alert(`失败，请直接联系海逍遥: ${defaultValue.hotline}, ${JSON.stringify(e)}, tag: ${tag}`);
}

function isError(errMsg) {
    return errMsg.split(':')[1] != 'ok';
}

var RouteFlux = Rabbit.create(url.route);
var GroupsFlux = Rabbit.create(url.group);

var App = React.createClass({

    mixins: [
        Reflux.listenTo(RouteFlux.store, 'onRoutesLoaded'),
        Reflux.connect(GroupsFlux.store, 'groups'),
    ],

    /**
     * routes信息加载后，处理微信分享
     */
    onRoutesLoaded: function(routes) {
        this.setState({'routes': routes});
        if (routes.status == 0) {
            var route = routes.routes[0];
            var title = `【${route.name}】${route.title}`
            var link = `http://www.hxytravel.com${url.travel}/${route.routeid}`;
            var imgUrl = route.headImg;
            var desc = route.desc;
            $.get(url.wxShareConfig, {'routeid': route.routeid, 'routeUrl': location.href.split('#')[0]})
            .done(function(data) {
                if (data.status != 0 ){
                    return;
                }
                wx.config({
                    'debug': false,
                    'appId': data.appid,
                    'timestamp': data.timestamp, 
                    'nonceStr': data.nonceStr, 
                    'signature': data.signature,
                    'jsApiList': ['onMenuShareTimeline', 'onMenuShareAppMessage']
                });

                wx.ready(function(){
                    wx.checkJsApi({
                        'jsApiList': ['onMenuShareTimeline', 'onMenuShareAppMessage'], 
                        'success': function(res) {
                            if (isError(res.errMsg)) {
                                hxyError(res, "check res error");
                                return;
                            }

                            if (res.checkResult.onMenuShareTimeline) {
                                wx.onMenuShareTimeline({
                                    title: title,
                                    link: link,
                                    imgUrl: imgUrl
                                });
                            }
                            
                            if (res.checkResult.onMenuShareAppMessage) {
                                wx.onMenuShareAppMessage({
                                    title: title,
                                    desc: desc,
                                    link: link,
                                    imgUrl: imgUrl
                                });
                            }
                        },
                        'fail': function(e, tag) {
                            hxyError(e, "check failed");
                        }
                    });
                });
        
                wx.error(function(res){
                    hxyError(res, "global error");
                });
            });
        }
    },

    onOpenChange: function() {
        this.setState({'open': !this.state.open});
    },

    onBaoMingClick: function() {
        window.location.href = `/wproduct/${this.state.routes.routes[0].routeid}`
    },

    onHomeClick: function() {
        window.location.href = `/`;
    },

    getInitialState() {
        var routeid = window.location.pathname.split('/')[2];
        RouteFlux.actions.load({'routeids': routeid});
        GroupsFlux.actions.load({'routeid': routeid});
        return {
            'routes': {
                'status': 1,
                'routes': [{
                    'days': 0,
                    'name': '',
                    'title': '',
                    'route': '',
                    'minPrice': '¥0',
                    'maxPrice': '¥0',
                    'departure': '',
                    'distination': ''
                }],
                'more': {
                    'sliderImgs': [],
                    'desc': [],
                    'local': '',
                    'prepare': '',
                    'traffic': '',
                    'expenseInclude': '',
                    'expenseExclude': '',
                    'refund': ''
                },
                'wapInfo': {
                    'directory': [],
                    'mapImg': null
                },
                'mdtext': ''
            },
            'groups': {
                'status': 1,
                'groups': []
            },
            'open': false,
            'toggleHidden': false
        };
    },

    render: function() {
        var routes = this.state.routes.routes[0];
        var mdtext = this.state.routes.mdtext || '';
        var more = this.state.routes.more;
       
        return (
            <div className="travel-container">
                <Drawer open={this.state.open} onOpenChange={this.onOpenChange}
                    sidebar={
                        <Siderbar routes={routes} directory={this.state.routes.wapInfo.directory}
                            onClick={this.onOpenChange} onBaoMingClick={this.onBaoMingClick}/>
                        }>
                    <div className="travel-main-container">
                        <div className="travel-title-container">
                            {
                                routes.name
                                ? <h2 className="ellipsis">{`${routes.name} | ${routes.title}`}</h2>
                                : null
                            }
                            {
                                routes.season
                                ? <p>{routes.season}
                                    <span className="travel-route">{`${routes.departure} ~ ${routes.distination}`}</span>
                                </p>
                                : null
                            }
                            {
                                this.state.routes.wapInfo.mapImg
                                ? <p><img src={this.state.routes.wapInfo.mapImg} /></p>
                                : null
                            }
                        </div>
                        <div className="travel-dairy-container"
                            dangerouslySetInnerHTML={{__html: marked(mdtext)}}>
                        </div>
                        <div className="days-list-toggle">
                            <Button inline onClick={this.onHomeClick} className="home">
                                <Icon type="home" />主页
                            </Button>
                            <Button inline onClick={this.onBaoMingClick} className="baoming">
                                <Icon type="team" />报名
                            </Button>
                            <Button inline onClick={this.onOpenChange} className="mulu">
                                <Icon type="book" />目录
                            </Button>
                        </div>
                    </div>
                </Drawer>
            </div>
        );
    }
});

var Siderbar = React.createClass({

    _scroll: function(top) {
        this.props.onClick();
        $('html body').animate({
            'scrollTop': top
        }, {
            'speed': 500
        });
    },

    onDayItemClick: function(index) {
        var offset = $(`.D${index + 1}`).offset();
        if (offset) {
            this._scroll(offset.top);
        }
    },

    render: function() {
        var directory = this.props.directory, self = this;
        var routes = this.props.routes;
        if (!directory || directory.length == 0) {
            return null;
        }
        var directoryList = directory.map(function(item, index) {
            return (
                <List.Item key={index} onClick={()=>{self.onDayItemClick(index)}}>
                    <span className="sidebar-days-no">{index + 1}</span>
                    {item}
                </List.Item>
            );
        });
        
        return (
            <div className="sidebar-container">
                <div className="sidebar-header">行程概要</div>
                <div className="sidebar-days">
                    <List>
                        <List.Item key={-1} thumb={<Icon type="home" />}
                            onClick={()=>{self.onDayItemClick(-1)}}>
                            路线简介
                        </List.Item>
                        {directoryList}
                    </List>
                </div>
                <div className="sidebar-footer">
                    <Button onClick={this.props.onBaoMingClick}>报名&费用相关</Button>
                </div>
            </div>
        );
    }
});

module.exports = App;
