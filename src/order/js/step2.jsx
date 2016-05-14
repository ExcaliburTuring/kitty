/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { Col, Button } from 'react-bootstrap';

import GroupBrief from './group';
import Discount from './discount'; 
import NoAuth from './noauth';

import alipay from '../img/alipay.png';

var Step2 = React.createClass({

    getInitialState: function() {
        return {
           'data': {
                'status': 1,
                'orders': [],
                'staffs': {}
            }
        }
    },

    render: function() {
        var groupid = 4;
        var travelers = ["谢振宗","赵伟"];
        return (
            <div>
                <Col md={9}>
                    <div className="discount-title">优惠政策</div>
                    <div className="discount-item">
                        <Discount />
                    </div>
                    <div className="pay-item">
                        <Col md={3}>
                            <div className="left">
                                <img src={alipay} />
                            </div>
                        </Col>
                        <Col md={7}>
                            <div className="middle">
                                扫一扫或登录帐号进行支付，部分用户有快捷支付单笔2000元的限额。
                            </div>
                        </Col>
                        <Col md={2}>
                            <div className="right">
                                <div className="btn">马上支付</div>
                            </div>
                        </Col>
                    </div>
                </Col>
                <Col md={3}>
                    <GroupBrief 
                        group={this.props.order.group}
                        travelers={travelers}/>
                </Col>
            </div>
        );
    }
});

module.exports = Step2;
