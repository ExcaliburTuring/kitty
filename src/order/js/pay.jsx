/**
 * @author xiezhenzong 
 */
import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { Button, Form } from 'antd';

import Title from 'title';
import alipay from '../img/alipay.png';
import 'antd/lib/index.css';

var Pay = React.createClass({

    enableBtn: function() {
        this.setState({
            'createBtnDisabled': false,
            'orderPayBtnDisabled': false
        });
    },

    _disabledBtn: function() {
        this.setState({
            'createBtnDisabled': true,
            'orderPayBtnDisabled': true
        });
    },

    _onCreateOrderSubmit: function() {
        this._disabledBtn();
        this.props.onCreateOrderSubmit();
    },

    _onOrderPaySubmit: function(e) {
        this._disabledBtn();
        this.props.onOrderPaySubmit();
    },

    getInitialState: function() {
        return {
            'createBtnDisabled': false,
            'orderPayBtnDisabled': false
        };
    },

    render: function() {
        return (
            <div className="pay-container">
                <Row>
                    <Col sm={2} md={2}>
                        <div className="pay-left">
                            <Image src={alipay} responsive/>
                        </div>
                    </Col>
                    <Col sm={8} md={8}>
                        <div className="pay-middle">
                            扫一扫进行支付宝支付，部分用户有快捷支付单笔2000元的限额。
                        </div>
                    </Col>
                    <Col sm={2} md={2}>
                        <div className="pay-right">
                            <Button type="primary" 
                                disabled={this.state.createBtnDisabled} 
                                onClick={this._onCreateOrderSubmit}>
                                保存订单
                            </Button>
                            <Form inline onSubmit={this._onOrderPaySubmit} action="/order/pay" method="GET" target="_blank">
                                <input type="hidden" name="orderid" value={this.props.orderid}></input>
                                <Button type="primary" htmlType="submit" disabled={this.state.orderPayBtnDisabled}>
                                    马上支付
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
});

module.exports = Pay;
