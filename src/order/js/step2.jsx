/**
 * @author xiezhenzong 
 */
import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { Button, Checkbox, Form } from 'antd';

import { defaultValue } from 'config';
import Title from 'title';
import Discount from './discount'; 
import alipay from '../img/alipay.png';
import 'antd/lib/index.css';

var Step2 = React.createClass({

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

    onCreateOrderSubmit: function() {
        this._disabledBtn();
        var discount = this.refs.discount.getDiscount();
        this.props.onCreateOrderSubmit(discount);
    },

    onOrderPaySubmit: function(e) {
        this._disabledBtn();
        var discount = this.refs.discount.getDiscount();
        this.props.onOrderPaySubmit(discount);
    },

    getInitialState: function() {
        return {
            'createBtnDisabled': false,
            'orderPayBtnDisabled': false
        };
    },

    render: function() {
        var nameList = [];
        if (this.props.travellers.length > 0) {
            for (var i = 0, n = this.props.travellers.length; i < n; i++) {
                nameList.push(<Name key={`traveller-${i}`} name={this.props.travellers[i].name}/>);
            }
        }
        return (
            <div className={`order-step2 ${this.props.hide ? "hide" : ""}`}>
                <Title title="优惠政策" className="order-content-title" />
                <div className="discount-item-container">
                    <div className="discount-name-list-container">
                        您本次订单中有：
                        {nameList}
                        <p className="order-total-price pull-right">总价：{this.props.orderInfo.price}</p>
                    </div>
                    <Discount
                        ref="discount"
                        count={this.props.travellers.length}
                        orderInfo={this.props.orderInfo}/>
                </div>
                <div className="pay-container">
                    <Row>
                        <Col sm={2} md={2}>
                            <div className="pay-left">
                                <Image src={alipay} responsive/>
                            </div>
                        </Col>
                        <Col sm={8} md={8}>
                            <div className="pay-middle">
                                扫一扫或登录帐号进行支付，部分用户有快捷支付单笔2000元的限额。
                            </div>
                        </Col>
                        <Col sm={2} md={2}>
                            <div className="pay-right">
                                <Button type="primary" 
                                    disabled={this.state.createBtnDisabled} 
                                    onClick={this.onCreateOrderSubmit}>
                                    保存订单
                                </Button>
                                <Form inline onSubmit={this.onOrderPaySubmit} action="/order/pay" method="GET">
                                    <input type="hidden" name="orderid" value={this.props.orderInfo.orderid}></input>
                                    <Button type="primary" htmlType="submit" disabled={this.state.orderPayBtnDisabled}>
                                        马上支付
                                    </Button>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="pre-btn-container pull-right">
                    <Button type="primary" onClick={this.props.onPreBtnClick}>上一步</Button>
                </div>
            </div>
        );
    }
});

var Name = React.createClass({

    render: function() {
        return (
            <label className="discount-name">
                <Checkbox
                    checked={true}
                    defaultChecked={true}
                    disabled={true}/>
                {this.props.name} 
            </label>
        );
    }

});

module.exports = Step2;
