import React from 'react'; 
import { Col, Image } from 'react-bootstrap';

import TravellerList from './travellers';

var GroupList = React.createClass({

    render: function() {
        var groups= this.props.groupInfo.map(function(groupInfo, index) {

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
                            <TravellerList
                                names={groupInfo.names}
                                keyPrefix="group"/>
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
            <div>
                {groups}
            </div>
        );
    }
});

module.exports = GroupList;
