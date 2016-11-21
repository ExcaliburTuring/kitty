import React from 'react';
import Reflux from 'reflux';
import marked from 'marked';
import Swiper from 'swiper';
import { Popup, Button } from 'antd-mobile';

import { url, defaultValue, groupStatus } from 'config';
import Rabbit from 'rabbit';

import RouteInfo from './RouteInfo';

import b1 from '../img/b1.svg';
import b2 from '../img/b2.svg';
import b3 from '../img/b3.svg';
import square from '../img/54.png';
import long from '../img/54.png';
import righta from '../img/righta.svg';
import right from '../img/right.svg';

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

    getInitialState() {
        var routeid = window.location.pathname.split('/')[2];
        RouteFlux.actions.load({'routeids': routeid});
        GroupsFlux.actions.load({'routeid': routeid});
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
            'groups': {
                'status': 1,
                'groups': []
            },
            'open': false,
            'toggleHidden': false
        };
    },

    onShowGroupBtnClick: function() {
        Popup.show(
            <GroupPopup route={this.state.routes.routes[0]} groups={this.state.groups.groups}/>
            ,{ animationType: 'slide-up' }
        );
    },

    render: function() {
        var routes = this.state.routes.routes[0];
        var more = this.state.routes.more;
        var days = this.state.routes.days;
        return (
            <div className="travel-container">
                <div className="travel-main-container">
                    <Slider route={routes} sliderImgs={more.sliderImgs}/>
                    <div className="travel-info-container">
                        <div className="row">
                            <p className="travel-title">
                                <span className="travel-name">{routes.name}</span>
                                <span>{routes.title}</span>
                            </p>
                            <p className="travel-price-container">
                                <span className="travel-price">{routes.minPrice}</span>
                                <span> 起/人</span>
                            </p>
                            <div className="travel-discount-container">
                                <p>
                                    <span className="youhui">优惠</span>
                                    优惠：2016年优惠新政策
                                </p>
                                <p>
                                    <span className="lijian">立减</span>
                                    完善个人资料立减20元
                                </p>
                                <img src={right}/>
                            </div>
                            <p className="travel-departure-container">
                                集合地：<span className="travel-departure">{routes.departure}</span>
                            </p>
                        </div>
                        <div className="travel-enter">
                            <p>点此开启</p>
                            <p>{routes.name}</p>
                            <img src={righta}/>
                        </div>
                    </div>
                </div>
                <RouteInfo days={days} more={more} />
                <div className="bottom-container">
                    <div className="row">
                        <div className="Asecond">
                            <div className="Athird">
                                <div className="right-border" />
                                <img src={b1}/>
                                <p>分享</p>
                            </div>
                            <div className="Athird">
                                <div className="right-border" />
                                <img src={b2}/>
                                <p>在线客服</p>
                            </div>
                            <div className="Athird">
                                <img src={b3}/>
                                <p>电话咨询</p>
                            </div>
                        </div>
                        <div className="Asecond">
                            <div className="apply" onClick={this.onShowGroupBtnClick}>我要报名</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var Slider = React.createClass({

    componentDidUpdate: function(nextProps, nextState){
        var mySwiper = new Swiper (this.refs.swiper, {
            direction: 'horizontal',
            autoplay: 5000,
            speed: 600,
            loop: true,
            noSwiping : false,
            autoplayDisableOnInteraction : false,
            pagination: this.refs.pagination,
            paginationClickable: true,
            mousewheelControl : false,
            effect : 'fade',
            fade: {
              crossFade: true,
            }
        });
    },

    render: function() {
        var route = this.props.route;
        var slideItemList = this.props.sliderImgs.map(function(img, index) {
            var bg = {backgroundImage: `url(${img})`};
            return (
                <div className="swiper-slide swiper-no-swiping" key={index} style={bg}>
                </div>
            );
        })
        return (
            <div className="slider-container">
                <img classsName="wh-container" src={long}/>
                <div className="swiper-container" ref="swiper">
                    <div className="swiper-wrapper">
                        {slideItemList}
                    </div>
                    <div className="swiper-pagination swiper-pagination-bullets" ref="pagination"></div>
                </div>
            </div>
        );
    }
});

var GroupPopup = React.createClass({

    _findSelectableGroup: function(groups) {
        for (var i = 0, n = groups.length; i < n; i++) {
            if (groups[i].status == groupStatus.OPEN) {
                return groups[i];
            }
        }
        return {};
    },

    onOrderBtnClick: function() {
        var group = this.state.selected;
        if (!group) {
            Toast.fail("还未选择团");
            return;
        }
        if (group.status != groupStatus.OPEN) {
            Toast.fail('本团不可报名');
            return;
        }

        $.post(url.orderNew, {'routeid': group.routeid, 'groupid': group.groupid})
        .done(function(data) {
            if (data.status != 0) {
                Toast.fail(defaultValue.newOrderMsg);
            } else {
                window.location.href = `${url.order}/${data.orderid}`;
            }
        })
        .fail(function() {
            Toast.fail(defaultValue.newOrderMsg);
        });
    },

    onGroupClick: function (group) {
        this.setState({'selected': group});
    },

    getInitialState: function() {
        return {
            'selected': this._findSelectableGroup(this.props.groups)
        };
    },

    componentWillReceiveProps: function(newProps) {
        if (newProps.groups.length) {
            this.setState({'selected': this._findSelectableGroup(this.props.groups)});
        }
    },

    render: function () {
        var route = this.props.route, self = this, groups = this.props.groups;
        var groupList = null;
        if (groups.length == 0) {
            groupList = (
                <p>这条路线暂时没有成团，如果您感兴趣，可以联系我们，{defaultValue.hotline}</p>
            );
        } else {
            groupList = this.props.groups.map(function(group, index) {
                return (
                    <Group group={group} key={group.groupid}
                        selected={self.state.selected.groupid == group.groupid}
                        open={group.status == groupStatus.OPEN}
                        onGroupClick={self.onGroupClick}/>
                );
            });
        }
        return (
            <div className="new-order-container">
                <div className="new-header">
                    <div className="img-thumbnail pull-left">
                        <div style={{backgroundImage: `url(${route.headImg})`}}>
                            <img className="img-responsive" src={square}/>
                        </div>
                    </div>
                    <p className="new-title ellipsis">【{route.name}】{route.title}</p>
                </div>
                <div className="new-body">
                    <p>选择出行团队</p>
                    <div className="new-group-list row">
                        {groupList}
                    </div>
                </div>
                <div className="new-footer clearfix">
                    <p className="pull-left">金额:
                        <span className="new-price-label">¥</span>
                        <span className="new-price">
                            {
                                self.state.selected.price 
                                ? self.state.selected.price.replace("￥", "")
                                : '0'
                            }
                        </span>
                    </p>
                    <Button inline className="pull-right" onClick={this.onOrderBtnClick}>立即报名</Button>
                </div>
            </div>
        );
    }
});

var Group = React.createClass({

    onGroupClick: function () {
        if (this.props.open) {
            this.props.onGroupClick(this.props.group);
        }
    },

    render: function() {
        var group = this.props.group;
        return (
            <div className={`group-container Athird ${this.props.selected ? 'selected': ''} ${this.props.open ? '' : 'disable'}`}
                onClick={this.onGroupClick}>
                <div className="group-start-date">{group.startDate}</div>
                <div>
                {
                    group.title
                    ? <span className="group-title">{group.title}</span>
                    : null
                }
                {
                    this.props.open
                    ? <span>
                        剩余：
                        <span className="group-quota">{group.maxCount - group.actualCount}</span>
                    </span>
                    : <span>
                        {groupStatus.getDesc(group.status)}
                    </span>
                }
                </div>
            </div>
        );
    }
});

module.exports = App;
