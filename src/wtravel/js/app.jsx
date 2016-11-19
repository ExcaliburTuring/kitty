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
                    'maxPrice': '¥0'
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
                    'directory': []
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
                            onClick={this.onOpenChange}/>
                        }>
                    <div className="travel-main-container">
                        <div className="travel-dairy-container"
                            dangerouslySetInnerHTML={{__html: marked(mdtext)}}>
                        </div>
                        <Button type="primary" className="days-list-toggle"
                            onClick={this.onOpenChange}>目录|报名</Button>
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

    onClick: function() {
        this._scroll($('.addition-info-container').offset().top);
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
                    <Button onClick={this.onClick}>报名&费用相关</Button>
                </div>
            </div>
        );
    }
});

module.exports = App;
