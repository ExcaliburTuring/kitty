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
import b1 from '../img/b1.png';
import b2 from '../img/b2.png';
import b3 from '../img/b3.png';
import b4 from '../img/b4.png';
import b5 from '../img/b5.png';
import b6 from '../img/b6.png';
import b7 from '../img/b7.png';
import square from '../img/54.png';

var RouteFlux = Rabbit.create(url.route);
var GroupsFlux = Rabbit.create(url.group);

var App = React.createClass({

    mixins: [
        Reflux.connect(RouteFlux.store, 'routes'),
        Reflux.connect(GroupsFlux.store, 'groups'),
    ],

    onOpenChange: function() {
        this.setState({'open': !this.state.open});
    },

    getInitialState() {
        var routeid = window.location.pathname.split('/')[2];
        RouteFlux.actions.load({
            'routeids': routeid, 
            'isImgtextRequired': true
        });
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
                'imgtext': {
                    'sliderImgs': [],
                    'descriptions': [],
                    'introduction': {
                        'mdtext': '',
                        'spotlights':[]
                    },
                    'days': [],
                    'notice': {
                        'local': '',
                        'prepare': '',
                        'traffic': ''
                    },
                    'expense': {
                        'include': '',
                        'exclude': '',
                        'cancel': ''
                    }
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
        var imgtext = this.state.routes.imgtext;
       
        return (
            <div className="travel-container">
                <Drawer open={this.state.open} onOpenChange={this.onOpenChange}
                    sidebar={
                        <Siderbar routes={routes} days={imgtext.days}
                            onClick={this.onOpenChange}/>
                    }>
                    <div className="travel-main-container">
                        <Slider route={routes} sliderImgs={imgtext.sliderImgs} 
                                descriptions={imgtext.descriptions}/>
                        <div className="travel-info-container">
                            <div className="row">
                                <div className="Asecond a1">旅游天数: {routes.days}</div>
                                <div className="Asecond a2">季节: {"夏天"}</div>
                            </div>
                            <div className="row">
                                <div className="Asecond a3">集合地点: {routes.distination}</div>
                                <div className="Asecond a4">人数上限: {"20人"}</div>
                            </div>
                        </div>
                        <div className="travel-dairy-container"
                            dangerouslySetInnerHTML={{__html: marked(mdtext)}}>
                        </div>
                        <Button type="primary" className="days-list-toggle"
                            onClick={this.onOpenChange}>目录</Button>
                        <AdditionInfo route={routes} groups={this.state.groups.groups} />
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
        var days = this.props.days, self = this;
        var routes = this.props.routes;
        if (!days || days.length == 0) {
            return null;
        }
        var dayList = days.map(function(day, index) {
            return (
                <List.Item key={index} onClick={()=>{self.onDayItemClick(index)}}>
                    <span className="sidebar-days-no">{index + 1}</span>
                    {day.title}
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
                        {dayList}
                    </List>
                </div>
                <div className="sidebar-footer">
                    <Button onClick={this.onClick}>报名&费用相关</Button>
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
            noSwiping : true,
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
        var descriptionlist = this.props.descriptions;
        var slideItemList = this.props.sliderImgs.map(function(img, index) {
            return (
                <div className="swiper-slide swiper-no-swiping" key={index}>
                    <img src={img} className="img-responsive"/>
                </div>
            );
        })
        return (
            <div className="slider-container">
                <div className="swiper-container" ref="swiper">
                    <div className="swiper-wrapper">
                        {slideItemList}
                    </div>
                </div>
                <div className="travel-name">【{route.name}】{route.title}</div>
                <div className="travel-price-container">
                    ¥
                    <span className="travel-price">{route.minPrice.replace("￥", "")}</span>
                </div>
            </div>
        );
    }
});

var AdditionInfo = React.createClass({

    onShowGroupBtnClick: function() {
        Popup.show(
            <GroupPopup route={this.props.route} groups={this.props.groups}/>
            ,{ animationType: 'slide-up' }
        );
    },

    render: function() {
        return (
            <div className="addition-info-container">
                <div className="row">
                    <div className="Afourth">
                        <img className="bg" src={bg} />
                        <div className="b1">
                            <img className="icon" src={b1} />
                            <div className="p">当地气候</div>
                        </div>
                    </div>
                    <div className="Afourth">
                        <img className="bg" src={bg} />
                        <div className="b2">
                            <img className="icon" src={b2} />
                            <div className="p">物资准备</div>
                        </div>
                    </div>
                    <div className="Afourth">
                        <img className="bg" src={bg} />
                        <div className="b1">
                            <img className="icon" src={b3} />
                            <div className="p">集合地点</div>
                        </div>
                    </div>
                    <div className="Afourth">
                        <img className="bg" src={bg} />
                        <div className="b2">
                            <img className="icon" src={b4} />
                            <div className="p">费用详细</div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="Afourth" onClick={this.onShowGroupBtnClick}>
                        <img className="bg" src={bg} />
                        <div className="b2">
                            <img className="icon" src={b5} />
                            <div className="p">报名</div>
                        </div>
                    </div>
                    <div className="Afourth">
                        <img className="bg" src={bg} />
                        <div className="b1">
                            <img className="icon" src={b5} />
                            <div className="p">合同预览</div>
                        </div>
                    </div>
                    <div className="Afourth">
                        <img className="bg" src={bg} />
                        <div className="b2">
                            <img className="icon" src={b6} />
                            <div className="p">客服</div>
                        </div>
                    </div>
                    <div className="Afourth">
                        <img className="bg" src={bg} />
                        <div className="b1">
                            <img className="icon" src={b7} />
                            <div className="p">退款&保证</div>
                        </div>
                    </div>
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
