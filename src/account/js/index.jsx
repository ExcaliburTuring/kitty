/**
 * @author xiezhenzong
 */
import React from 'react'; 
import Reflux from 'reflux';
import { Col,Image } from 'react-bootstrap';

import Info from './info';
import Rabbit from 'rabbit';

import { defaultValue,url } from 'config';

var AccountInfo = Rabbit.create(url.info); 

var Index = React.createClass({

    mixins: [Reflux.connect(AccountInfo.store, 'info')],

    getInitialState: function() {
        AccountInfo.actions.load();
        return {
            'info': {
                'status': 0,
                'login': false,
                'accountInfo': [],
                'accountSetting': [],
                'orderInfo': [],
                'groupInfo': [],
                'unPayed': []
            }
        };
    },

    render: function() {
        var info = this.state.info;
        var { accountid } = this.props.params;
        var ordersUrl = `${defaultValue.accountUrl}/${accountid}/orders`;
        var infoUrl = `${defaultValue.accountUrl}/${accountid}/info`;

        var unpayed = info.unPayed.map(function(order, index) {

            var groupnames = order.names.map(function(name, index) {
                return (
                    <p key={`group-name-${index}`}><i className="fa fa-check-square-o" />{name}</p>
                );
            });

            return (
                        <div className="unpayed" key={`order-name-${index}`}>
                            <div className="start-title">
                                <Col md={4}>
                                    <p className="left">未完成订单</p>
                                </Col>
                                <Col md={4}>
                                    <p className="middle">订单号：{order.orderid}</p>
                                </Col>
                                <Col md={4}>
                                    <p className="right">创建时间:{order.starttime}</p>
                                </Col>
                            </div>
                            <div className="order-info">
                                <Col md={4}>
                                    <div className="travel-img">
                                        <Image src={order.image} responsive/>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="travel-info">
                                        <div className="travel-name">
                                            {order.name}
                                        </div>
                                        <div className="travel-intro">
                                            {order.intro}
                                        </div>
                                        <div className="travel-time">
                                            {order.time}
                                        </div>
                                        <div className="travel-price">
                                            ￥{order.price}
                                        </div>
                                        <div className="order-status">
                                            订单状态：{order.status}
                                        </div>
                                        <div className="pay">
                                        </div>
                                    </div>
                                </Col>
                                <Col md={2}>
                                    <div className="group-names">
                                        {groupnames}
                                    </div>
                                </Col>
                            </div>
                        </div>
            )
        });

        var groups= info.groupInfo.map(function(groupInfo, index) {

            var groupnames = groupInfo.names.map(function(name, index) {
                return (
                    <p key={`group-name-${index}`}><i className="fa fa-check-square-o" />{name}</p>
                );
            });

            var avatars = groupInfo.avatars.map(function(avatar, index) {
                return (
                    <Image src={avatar}  circle key={`avatar-${index}`}/>
                );
            });

            return (
                        <div className="starting" key={`groups-id-${index}`}>
                            <div className="start-title">
                                <Col md={4}>
                                    <p className="left">即将出行</p>
                                </Col>
                                <Col md={4}>
                                    <p className="middle">订单号：{groupInfo.orderid}</p>
                                </Col>
                            </div>
                            <div className="order-info">
                                <Col md={4}>
                                    <div className="travel-img">
                                        <Image src={groupInfo.image} responsive/>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="travel-info">
                                        <div className="travel-name">
                                            {groupInfo.name}
                                        </div>
                                        <div className="travel-intro">
                                            {groupInfo.intro}
                                        </div>
                                        <div className="travel-time">
                                            {groupInfo.time}
                                        </div>
                                        <div className="order-status">
                                            订单状态：{groupInfo.status}
                                        </div>
                                    </div>
                                </Col>
                                <Col md={2}>
                                    <div className="group-names">
                                        {groupnames}
                                    </div>
                                </Col>
                            </div>
                            <div className="group-info">
                                <Col md={4}>
                                <div className="travel-countdown">
                                    <p className="countdown-title">距离出发还有：</p>
                                    <p className="countdown">{groupInfo.countdown}天</p>
                                </div>
                                </Col>
                                <Col md={4}>
                                    <div className="group-members">
                                        <p>当前队伍中的队友：</p>
                                        <div className="avatars">{avatars}</div>
                                        <p className="more">扫码进群查看更多<i className="fa fa-arrow-right" /></p>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="group-QR">
                                        <Image src={groupInfo.QR} responsive />
                                    </div>
                                </Col>
                            </div>
                        </div>
            )
        });

        return (
            <div className="my-container">
                <div className="container">
                    <Col md={3}>
                        <div className="profiles">
                            <div className="">
                                <p><i className="fa fa-male"/>{info.accountInfo.name}</p>
                                <p><i className="fa fa-mobile"/>{info.accountInfo.mobile}</p>
                                <p><i className="fa fa-birthday-cake"/>{info.accountSetting.birthday}</p>
                            </div>
                            <a href={infoUrl} activeClassName="active">编辑资料</a>
                        </div>
                    </Col>
                    <Col md={9}>
                        <div className="title">
                            <Col md={5}>
                                <div className="welcome">
                                    欢迎回来，{info.accountInfo.name}
                                </div>
                            </Col>
                            <div className="messages">
                                <Col md={3}>
                                    <span className="bar">未完成订单：</span>
                                    <span className="unfinished">{info.orderInfo.unfinished}</span>
                                </Col>
                                <Col md={3}>
                                    <span className="bar">历史订单：</span>
                                    <span className="histories">{info.orderInfo.histories}</span>
                                </Col>
                            </div>
                        </div>
                        <div className="unfinisheds">
                            {groups}
                            {unpayed}
                        </div>
                    </Col>
                </div>
            </div>
        );
    }
});

module.exports = Index;
