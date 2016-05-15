/**
 * @author xiezhenzong 
 */
import React from 'react';
import { Col } from 'react-bootstrap';
import { Button } from 'antd';

import Discount from './discount'; 
import alipay from '../img/alipay.png';
import 'antd/lib/index.css';

var Step2 = React.createClass({

    render: function() {
        return (
            <div className="order-step2">
                <div className="discount-title">优惠政策</div>
                <div className="discount-item">
                    <Discount 
                        count={this.props.count}
                        orderInfo={this.props.orderInfo} 
                        onCreateOrderSubmit={this.props.onCreateOrderSubmit}/>
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
                            <Button type="primary" onClick={this.props.onOrderPaySubmit}>
                                马上支付
                            </Button>
                        </div>
                    </Col>
                </div>
            </div>
        );
    }
});

module.exports = Step2;
