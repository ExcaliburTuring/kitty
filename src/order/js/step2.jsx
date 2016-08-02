/**
 * @author xiezhenzong 
 */
import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { Button, Checkbox, Tooltip } from 'antd';

import { defaultValue } from 'config';
import Discount from './discount'; 
import alipay from '../img/alipay.png';
import 'antd/lib/index.css';

var Step2 = React.createClass({

    onCreateOrderSubmit: function() {
        this.disabledBtn();
        var discount = this.refs.discount.getDiscount();
        this.props.onCreateOrderSubmit(discount);
    },

    onOrderPaySubmit: function() {

    },

    disabledBtn: function() {
        this.setState({
            'createBtnDisabled': true,
            'orderPayBtnDisabled': true
        });
    },

    enableBtn: function() {
        this.setState({
            'createBtnDisabled': false,
            'orderPayBtnDisabled': false
        });
    },

    getInitialState: function() {
        return {
            'createBtnDisabled': false,
            'orderPayBtnDisabled': false
        };
    },

    render: function() {
        var nameListContainer = null, nameList = [];
        if (this.props.accountTraveller != null && this.props.isAccountSelect) {
            nameList.push(<Name key="account-traveller-name" name={this.props.accountTraveller.name}/>);
        }
        if (this.props.travellers.length > 0) {
            for (var i = 0, n = this.props.travellers.length; i < n; i++) {
                nameList.push(<Name key={`traveller-${i}`} name={this.props.travellers[i].name}/>);
            }
        }
        if (nameList.length > 0) {
            nameListContainer = (
                <div className="discount-name-list-container">
                    您本次订单中有：
                    {nameList}
                </div>
            );
        }
        return (
            <div className="order-step2">
                <div className="discount-title">优惠政策</div>
                <div className="discount-item">
                    {nameListContainer}
                    <Discount
                        ref="discount"
                        count={this.props.count}
                        orderInfo={this.props.orderInfo}/>
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
                                    <Button
                                        type="primary" 
                                        disabled={this.state.createBtnDisabled} 
                                        onClick={this.onCreateOrderSubmit}>
                                        保存订单
                                    </Button>
                                    <Tooltip placement="top" 
                                        title={`我们的工程师们正日夜加班，开放接入支付宝支付的功能，为您提供更可靠，更便捷的支付方式，在此之前请联系${defaultValue.hotline}进行线下支付。`}>
                                        <Button 
                                            type="primary" 
                                            disabled={this.state.orderPayBtnDisabled}
                                            onClick={this.onOrderPaySubmit}>
                                            马上支付
                                        </Button>
                                    </Tooltip>
                                </div>
                            </Col>
                        </Row>
                    </div>
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
