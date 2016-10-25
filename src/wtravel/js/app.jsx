import React from 'react';
import Reflux from 'reflux';
import marked from 'marked';
import Swiper from 'swiper';
import { Drawer, ListView, Button, Grid, Toast } from 'antd-mobile';
import { Image } from 'react-bootstrap';

import { url, defaultValue, groupStatus } from 'config';
import Rabbit from 'rabbit';

import img from '../img/img.jpg';
import bg from '../img/11.png';
import b1 from '../img/b1.png';
import b2 from '../img/b2.png';
import b3 from '../img/b3.png';
import b4 from '../img/b4.png';
import b5 from '../img/b5.png';
import b6 from '../img/b6.png';
import b7 from '../img/b7.png';

var RouteFlux = Rabbit.create(url.route);
var GroupsFlux = Rabbit.create(url.group);

var App = React.createClass({

    mixins: [
        Reflux.connect(RouteFlux.store, 'routes'),
        Reflux.connect(GroupsFlux.store, 'groups'),
    ],

    onOpenChange(isOpen) {
        this.setState({ 'open': !this.state.open });
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
        };
    },

    render: function() {
        var routes = this.state.routes.routes[0];
        var mdtext = this.state.routes.mdtext || '';
        var imgtext = this.state.routes.imgtext;
       
        return (
            <div className="travel-container">
                <Siderbar routes={routes} days={imgtext.days}
                    open={this.state.open} onOpenChange={this.onOpenChange}/>
                <div className="travel-main-container">
                    <Slider route={routes} sliderImgs={imgtext.sliderImgs} 
                            descriptions={imgtext.descriptions}/>
                    <div className="travel-info-container">
                        <h1>{routes.minPrice}</h1>
                        <div className="detail row">
                            <div className="Asecond a1">旅游天数: {routes.days}</div>
                            <div className="Asecond a2">季节: {"夏天"}</div>
                            <div className="Asecond a3">集合地点: {routes.distination}</div>
                            <div className="Asecond a4">人数上限: {"20人"}</div>
                        </div>
                    </div>
                    <div className="travel-dairy-container"
                        dangerouslySetInnerHTML={{__html: marked(mdtext)}}>
                    </div>
                    <Group groups={this.state.groups.groups} />
                    <AdditionInfo />
                </div>
                 <Button type="primary" className="days-list-toggle"
                        onClick={this.onOpenChange}>目录</Button>
            </div>
        );
    }
});

var Siderbar = React.createClass({

    _ListViewRender: {
        //'className': "days-list-sidebar",
        // 'renderHeader': () => <span>header</span>,
        // 'renderFooter': function() {
        //     return (
        //         <div>
        //             {'加载完毕'}
        //         </div>
        //     );
        // },
        // 'renderSectionHeader': function(sectionData) {
        //     return (
        //         <div>Header</div>
        //     );
        // },
        'renderRow':  function(rowData, sectionID, rowID) {
            return (
                <div key={rowID} className="day-item-container">
                    <p>{rowData.title}</p>
                    <div className="day-item">
                        <p>{`行程：${rowData.mdtext}`}</p>
                        <p>{`亮点：${rowData.spots}`}</p>
                        <p>{`距离: ${rowData.distance}`}</p>
                        <p>{`住宿：${rowData.hotel}`}</p>
                        <p>{`含餐：${rowData.food}`}</p>
                    </div>
                </div>
            );
        }
    },

    onEndReached(event) {
        console.log("on end Reached")
    },

    render: function() {
        var days = this.props.days;
        var routes = this.props.routes;
        if (!days || days.length == 0) {
            return (<div></div>);
        }
        var dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        }).cloneWithRows(days);
        var sidebar = (
            <div className="sidebar-container">
                <p>{`${routes.title}--行程概要`}</p>
                <p>{`出发城市：${routes.departure}`}</p>
                <p>{`结束城市：${routes.distination}`}</p>
                <ListView
                    {...this._ListViewRender}
                    dataSource={dataSource}
                    scrollRenderAheadDistance={500}
                    scrollEventThrottle={20}
                    onScroll={() => { console.log('scroll'); }}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}/>
            </div>
        );
        return (
            <Drawer sidebar={sidebar} open={this.props.open} 
                onOpenChange={this.props.onOpenChange}>
                <div></div>
            </Drawer>
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
                    <Image src={img} responsive/>
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
                <div className="bottom">【{route.name}】{route.title}</div>
            </div>
        );
    }

});

var Group = React.createClass({

    _renderItem: function(group, index) {
        return (
            <div className="group-item-container">
                <p>{group.startDate}出发</p>
                <p>{group.price}</p>
            </div>
        );
    },

    onClick: function(el, index) {
        var group = el;
        if (group.status != groupStatus.OPEN) {
            Toast.fail('本团不可报名');
            return ;
        }

        $.post(url.orderNew, {'routeid': group.routeid, 'groupid': group.groupid})
        .done(function(data) {
            if (data.status != 0) {
                Toast.fail(defaultValue.newOrderMsg);
            } else {
                window.location.pathname = `${url.order}/${data.orderid}`;
            }
        })
        .fail(function() {
            Toast.fail(defaultValue.newOrderMsg);
        });
    },

    render: function() {
        return (
            <div className="group-container">
                <h4>报名</h4>
                <Grid
                    data={this.props.groups}
                    columnNum={3}
                    hasLine={false}
                    renderItem={this._renderItem}
                    onClick={this.onClick}/>
            </div>
        );
    }
});

var AdditionInfo = React.createClass({

    render: function() {
        return (
            <div className="addition-info-container row">
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
                    <div className="b3">
                        <img className="icon" src={b3} />
                        <div className="p">集合地点</div>
                    </div>
                </div>
                <div className="Afourth">
                    <img className="bg" src={bg} />
                    <div className="b4">
                        <img className="icon" src={b4} />
                        <div className="p">费用详细</div>
                    </div>
                </div>
                <div className="Afourth">
                    <img className="bg" src={bg} />
                    <div className="b5">
                        <img className="icon" src={b5} />
                        <div className="p">合同预览</div>
                    </div>
                </div>
                <div className="Afourth">
                    <img className="bg" src={bg} />
                    <div className="b6">
                        <img className="icon" src={b6} />
                        <div className="p">客服</div>
                    </div>
                </div>
                <div className="Afourth">
                    <img className="bg" src={bg} />
                    <div className="b7">
                        <img className="icon" src={b7} />
                        <div className="p">退款&保证</div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = App;