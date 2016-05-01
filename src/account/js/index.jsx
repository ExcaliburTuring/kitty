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
                'groupInfo': [],
                'orderInfo': []
            }
        };
    },

    render: function() {
        var info = this.state.info;
        var { accountid } = this.props.params;
        var ordersUrl = `${defaultValue.accountUrl}/${accountid}/orders`;
        var infoUrl = `${defaultValue.accountUrl}/${accountid}/info`;
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
                        <div className="starting">
                            <Col md={4}>
                                <div className="travel-img">
                                    <Image src={info.groupInfo.image} responsive/>
                                </div>
                            </Col>
                            <Col md={8}>
                                <div className="travel-info">
                                    <div className="travel-name">
                                        {info.groupInfo.name}
                                    </div>
                                    <div className="travel-time">
                                        {info.groupInfo.time}
                                    </div>
                                    <div className="travel-countdown">
                                        {info.groupInfo.countdown}
                                    </div>
                                </div>
                                <div className="group-info">
                                    <div className="group-members">
                                        {info.groupInfo.avatars}
                                    </div>
                                    <div className="group-QR">
                                        {info.groupInfo.QR}
                                    </div>
                                </div>
                            </Col>
                        </div>
                    </Col>
                </div>
            </div>
        );
    }
});

module.exports = Index;
