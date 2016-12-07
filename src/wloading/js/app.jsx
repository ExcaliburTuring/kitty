import React from 'react';
import Reflux from 'reflux';
import marked from 'marked';
import Swiper from 'swiper';
import { Popup,Button } from 'antd-mobile';

import { url, defaultValue } from 'config';
import Rabbit from 'rabbit';

function hxyError(e, tag) {
    alert(`失败，请直接联系海逍遥: ${defaultValue.hotline}, ${JSON.stringify(e)}, tag: ${tag}`);
}

function isError(errMsg) {
    return errMsg.split(':')[1] != 'ok';
}

var RouteFlux = Rabbit.create(url.route);

var App = React.createClass({

    mixins: [
        Reflux.listenTo(RouteFlux.store, 'onRoutesLoaded'),
    ],

    /**
     * routes信息加载后，处理微信分享
     */
    onRoutesLoaded: function(routes) {
        this.setState({'routes': routes});
        if (routes.status == 0) {
            var route = routes.routes[0];
            var title = `【${route.name}】${route.title}`
            var link = `https://www.hxytravel.com${url.travel}/${route.routeid}`;
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

    getInitialState() {
        var routeid = window.location.pathname.split('/')[2];
        RouteFlux.actions.load({'routeids': routeid});
        return {
            'routes': {
                'status': 1,
                'days': [],
                'routes': [{
                    'days': 0,
                    'name': '',
                    'title': '',
                    'route': '',
                    'departure': '',
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
                }
            },
            'open': false,
            'toggleHidden': false
        };
    },

    render: function() {
        var routes = this.state.routes.routes[0];
        var more = this.state.routes.more;
        var days = this.state.routes.days;
        var bg = {backgroundImage: `url(${routes.headImg})`};
        return (
            <div className="welcome">
                <div className="bg-container" style={bg}>
                </div>
                <div className="content">
                    <div className="title">
                        {routes.name}<br/>
                        开启你的旅程
                    </div>
                    <div className="btn-container">
                        <div className="look">点击查看</div>
                        <div className="apply">前往报名</div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = App;
