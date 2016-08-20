/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { Grid, Row, Col } from 'react-bootstrap';
import { message } from 'antd';

import AccountBasicInfo from 'account_basicinfo';
import { defaultValue, url, orderStatus, priceUtil } from 'config';
import Rabbit from 'rabbit';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import GroupBrief from './group';
import Discount from './discount'; 
import NoAuth from './noauth';

import 'antd/lib/index.css';

var OrderInfo = Rabbit.create(url.orderOrder); 
var App = React.createClass({

    mixins: [
        Reflux.connect(AccountBasicInfo.store, 'basicInfo'),
        Reflux.connect(OrderInfo.store, 'data')
    ],

    // step1的回调函数

    onAccountChange: function(checked, account) {
        this.setState({
            'isAccountSelect': checked,
            'accountTraveller': account
        });
    },

    onAgreementCheck: function(e) {
        var data = this.state.data;
        data.orderInfo.isAgreed = e.target.checked;
        this.setState({'data': data});
    },

    onNextBtnClick: function(travellers) {
        var travellerCount = this.getTravellerCount(this.state.isAccountSelect, travellers);
        if (travellerCount == 0) {
            message.error('请选择出行人');
            return;
        } 
        if (!this.state.data.orderInfo.isAgreed) {
            message.error('请同意安全协议');
            return;
        }
        if (this.state.isAccountSelect 
            && this.state.accountTraveller.status == orderStatus.WAIT_COMPLETE_INFO) {
            message.error('请先完善个人信息');
            return;
        }
        var data = this.state.data;
        data.orderInfo.status = orderStatus.DISCOUNT_SELECT;
        var price = priceUtil.getPrice(this.state.data.travelGroup.price) * travellerCount;
        data.orderInfo.price = priceUtil.getPriceStr(price);
        this.setState({
            'data': data,
            'travellers': travellers
        });
    },

    // step2的回调函数

    onCreateOrderSubmit: function(discountData) {
        var travellers = this.copyArray(this.state.travellers);
        if (this.state.isAccountSelect) {
            travellers.unshift(this.state.accountTraveller);
        }
        var self = this;
        var request = {
            'orderid': this.state.data.orderInfo.orderid,
            'travellers': travellers,
            'policyDiscountid': discountData.policyDiscountid,
            'discountCode': discountData.discountCode,
            'studentDiscountid': discountData.studentDiscountid,
            'studentCount': discountData.studentCount,
            'actualPrice': discountData.actualPrice,
        };
        $.ajax({
            'url': url.orderOrder,
            'type': 'post',
            'data': JSON.stringify(request),
            'dataType': 'json',
            'contentType': 'application/json;charset=UTF-8',
            'success': function(data) {
                            if (data.status != 0) {
                                self.refs.step2.enableBtn();
                                message.error(`订单创建失败，您可以联系${defaultValue.hotline}`);
                            } else {
                                message.success('订单创建成功，您可以使用支付宝进行支付');
                                setTimeout('location.reload(true);', 500);
                            }
                        },
            'error': function() {
                        self.refs.step2.enableBtn();
                        message.error(`订单创建失败，您可以联系${defaultValue.hotline}`);
                    }
        });
    },

    onOrderPaySubmit: function(discountData) {
        var travellers = this.copyArray(this.state.travellers);
        if (this.state.isAccountSelect) {
            travellers.unshift(this.state.accountTraveller);
        }
        var self = this;
        var request = {
            'orderid': this.state.data.orderInfo.orderid,
            'travellers': travellers,
            'policyDiscountid': discountData.policyDiscountid,
            'discountCode': discountData.discountCode,
            'studentDiscountid': discountData.studentDiscountid,
            'studentCount': discountData.studentCount,
            'actualPrice': discountData.actualPrice,
        };
        $.ajax({
            'url': url.orderOrder,
            'type': 'post',
            'async': false,
            'data': JSON.stringify(request),
            'dataType': 'json',
            'contentType': 'application/json;charset=UTF-8',
            'success': function(data) {
                            if (data.status != 0) {
                                self.refs.step2.enableBtn();
                                message.error(`订单创建失败，您可以联系${defaultValue.hotline}`);
                            } else {
                                
                            }
                        },
            'error': function() {
                        self.refs.step2.enableBtn();
                        message.error(`订单创建失败，您可以联系${defaultValue.hotline}`);
                    }
        });
    },

    onPreBtnClick: function() {
        var data = this.state.data;
        data.orderInfo.status = orderStatus.NEW;
        this.setState({'data': data});
    },

    copyArray: function(array) {
        var copy = [];
        for (var i = 0; i < array.length; i++) {
            copy.push(array[i]);
        }
        return copy;
    },

    getTravellerCount: function(isAccountSelect, travellers) {
        return isAccountSelect ? travellers.length + 1 : travellers.length;
    },

    getInitialState: function() {
        AccountBasicInfo.actions.get();
        var orderid = window.location.pathname.split('/')[2];
        OrderInfo.actions.load({'orderid': orderid});
        return {
            'basicInfo': {},
            'travellers': [],
            'data': {
                'status': 1,
                'orderInfo': {},
                'travelGroup': {},
                'travelRoute': {},
                'orderTravellers': [],
                'code': {},
                'student': {},
                'orderRefound': {},
                'quota': 0
            }
        }
    },

    render: function() {
        var accountInfo = this.state.basicInfo.accountInfo;
        if (accountInfo == null) {
            return (<p>还没登陆</p>);
        }
        var data = this.state.data;
        if (data.status != 0) {
            return (
                <div>
                    <p>订单查询失败, 请联系客服： 15001028030</p>
                </div>
            );
        }
        var content;
        var step;
        var status = data.orderInfo.status;
        if (status === orderStatus.NEW) {
            step = 1;
            content = (<Step1 ref="step1"
                            accountInfo={accountInfo}
                            travellers={this.state.travellers}
                            isAgreed={this.state.data.orderInfo.isAgreed}
                            quota={data.quota}
                            onAgreementCheck={this.onAgreementCheck}
                            onNextBtnClick={this.onNextBtnClick}/>);
        } else if (status === orderStatus.DISCOUNT_SELECT) {
            step = 2;
            var travellerCount = this.getTravellerCount(this.state.isAccountSelect, this.state.travellers);
            content = (<Step2
                            ref="step2"
                            count={travellerCount}
                            orderInfo={data.orderInfo}
                            accountTraveller={this.state.accountTraveller}
                            isAccountSelect={this.state.isAccountSelect}
                            travellers={this.state.travellers}
                            onCreateOrderSubmit={this.onCreateOrderSubmit}
                            onOrderPaySubmit={this.onOrderPaySubmit}
                            onPreBtnClick={this.onPreBtnClick}/>);
        } else {
            step = 3;
            content = (<Step3 
                            orderInfo={data.orderInfo} 
                            travelGroup={data.travelGroup}
                            travelRoute={data.travelRoute}
                            orderTravellers={data.orderTravellers}
                            policy={data.policy}
                            code={data.code}
                            student={data.student}
                            orderRefound={data.orderRefound}/>);
       }
        return (
            <Grid>
                <StepBar step={step}/>
                <Row>
                    <Col sm={9} md={9}>
                        <div className="order-content-container">
                            {content}
                        </div>
                    </Col>
                    <Col sm={3} md={3}>
                        <GroupBrief 
                            travelRoute={data.travelRoute} 
                            travelGroup={data.travelGroup}/>
                    </Col>
                </Row>
            </Grid>
        );
    }
});

var StepBar = React.createClass({

    render: function() {
        var step1Class = this.props.step == 1 ? 'on' : '';
        var step2Class = this.props.step == 2 ? 'on' : '';
        var step3Class = this.props.step == 3 ? 'on' : '';
        return (
            <Row>
                <div className="step">          
                    <ul>
                        <Col md={4} componentClass="li" className={step1Class}>
                            <span className="num"><em className="f-r5"></em><i>1</i></span>                 
                            <span className="line_bg lbg-r"></span>
                            <p className="lbg-txt">报名信息</p>
                        </Col>
                        <Col md={4} componentClass="li" className={step2Class}>
                            <span className="num"><em className="f-r5"></em><i>2</i></span>
                            <span className="line_bg lbg-l"></span>
                            <span className="line_bg lbg-r"></span>
                            <p className="lbg-txt">优惠&支付</p>
                        </Col>
                        <Col md={4} componentClass="li" className={step3Class}>
                            <span className="num"><em className="f-r5"></em><i>3</i></span>
                            <span className="line_bg lbg-l"></span>
                            <p className="lbg-txt">报名成功</p>
                        </Col>
                    </ul>
                </div>
            </Row>
        );
    }

});

module.exports = App;
