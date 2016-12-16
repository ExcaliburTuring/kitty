import React from 'react';
import Reflux from 'reflux';
import { Toast, Button } from 'antd-mobile';

import Rabbit from 'rabbit';
import { url, defaultValue } from 'config';
import friendImg from 'friend.svg';
import zouzhiImg from 'zouzhi_logo.svg';

import Headimg from '../img/wpostcard.jpeg';

function hxyError(e, tag) {
    alert(`失败，请直接联系走之旅行: ${defaultValue.hotline}, ${JSON.stringify(e)}, tag: ${tag}`);
}

function isError(errMsg) {
    return errMsg.split(':')[1] != 'ok';
}

var RouteFlux = Rabbit.create(url.route);
var ActivityFlux = Rabbit.create(url.activityList);

var App = React.createClass({

    mixins: [
        Reflux.listenTo(RouteFlux.store, 'onRoutesLoaded'),
        Reflux.connect(ActivityFlux.store, 'list')
    ],

    /**
     * routes信息加载后，处理微信分享
     */
    onRoutesLoaded: function(routes) {
        this.setState({'routes': routes});
        if (routes.status != 0) {
            Toast.fail('加载信息失败');
            return;
        }
        var route = routes.routes[0];
        var title = `【${route.name}】${route.title}`
        var link = `https://www.hxytravel.com${url.travel}/${route.routeid}`;
        var imgUrl = route.headImg;
        var desc = route.desc;
        var self = this;
        $.get(url.wxShareConfig, {'url': location.href.split('#')[0]})
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
                                imgUrl: imgUrl,
                                success: function () { 
                                    if (!self.state.address) {
                                        Toast.fail('未正确填写地址，请正确填写后重新分享！');
                                    } else {
                                        var activities = self.state.list.activities;
                                        if (activities.length == 0) {
                                            return;
                                        }
                                        var open = activities[0].open;
                                        var count = activities[0].param.count;
                                        if (open && count > 0) {
                                            $.post(url.postcardJoin, {
                                                'activityid': activities[0].activityid, 
                                                'address': self.state.address
                                            })
                                            .done(function(data) {
                                                if (data.status == 0) {
                                                    Toast.success('成功报名!');
                                                } else {
                                                    Toast.fail(`报名失败，请联系走之旅行:${defaultValue.hotline}`);
                                                }
                                            })
                                            .fail(function() {
                                                Toast.fail(`加载信息失败，您可以联系${defaultValue.hotline}`);
                                            });
                                        }
                                    }
                                },
                                cancel: function () { 
                                    Toast.fail('分享取消！')
                                }
                            });
                        }
                        if (res.checkResult.onMenuShareAppMessage) {
                            wx.onMenuShareAppMessage({
                                title: title,
                                desc: desc,
                                link: link,
                                imgUrl: imgUrl,
                                success: function () { 
                                    var activities = self.state.list.activities;
                                    if (activities.length == 0) {
                                        return;
                                    }
                                    var open = activities[0].open;
                                    var count = activities[0].param.count;
                                    if (open && count > 0) {
                                        Toast.info('如果您分享到朋友圈，将可以收到精美的明信片!');
                                    }   
                                }
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
    },

    getInitialState: function() {
        return {
            'basicInfo': {
                'accountInfo': {
                    'area': '',
                    'address': ''
                }
            },
            'list': {
                'activities': []
            },
            'address': ''
        };
    },

    componentDidMount: function() {
        var self = this;
        $.getJSON(url.basicinfo)
        .done(function(data) {
            if (data.status != 0) {
                Toast.fail(`加载信息失败，您可以联系${defaultValue.hotline}`);
            } else {
                var basicInfo = data.accountBasicInfo;
                var accountInfo = basicInfo.accountInfo;
                var address = `${accountInfo.area} ${accountInfo.address}`;
                self.setState({'basicInfo': basicInfo, 'address': address});
            }
        })
        .fail(function(jqxhr, textStatus, error) {
             Toast.fail(`加载信息失败，您可以联系${defaultValue.hotline}`);
        });
        ActivityFlux.actions.load({'activityid': 3});
        RouteFlux.actions.load({'routeids': 5});
    },

    render: function() {
        var accountInfo = this.state.basicInfo.accountInfo;
        var activities = this.state.list.activities;
        var open = activities.length ? activities[0].open : false;
        var count = activities.length ? activities[0].param.count : 0;
        var contentDom = null;
        if (open) {
            if (count > 0) {
                contentDom = (
                    <div>
                        <div className="address-input-container">
                            <p>1、请填写明信片收件地址</p>
                            <textarea placeholder="为了确保您能正常收到明信片，请务必正确填写！"
                                value={this.state.address} 
                                onChange={(e)=>{this.setState({'address': e.target.value})}}/>
                        </div>
                        <div className="share-tip">
                            <p>2、点击右上角【...】</p>
                            <p className="indent">选择<img className="img-responsive" src={friendImg}/>分享到朋友圈</p>
                            <p>3、欢迎联系<a href={`tel:${defaultValue.hotline}`}>客服</a>，或在公众号中留言</p>
                        </div>
                    </div>
                )
            } else {
                contentDom = (
                    <div>
                        <p>明信片已经领完啦!</p>
                        <p>您可以直接联系我们
                            <a href={`tel:${defaultValue.hotline}`}>{defaultValue.hotline}</a>
                        </p>
                    </div>
                );
            }
        } else {
            contentDom = (
                <div>
                    <p>明信片活动已经结束啦!</p>
                    <p>您可以直接联系我们
                        <a href={`tel:${defaultValue.hotline}`}>{defaultValue.hotline}</a>
                    </p>
                </div>
            )
        }

        return (
            <div className="activity">
                <img src={Headimg} className="img-responsive"/>
                <div className="join-steps">
                    <h3><img className="img-responsive" src={zouzhiImg}/>参与步骤：</h3>
                    {contentDom}
                </div>
            </div>
        );
    }
});

module.exports = App;
