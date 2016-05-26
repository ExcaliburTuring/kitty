/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { Grid, Row, Col } from 'react-bootstrap';
import { message } from 'antd';

import AccountBasicInfo from 'account_basicinfo';
import { url, orderStatus } from 'config';
import Rabbit from 'rabbit';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import GroupBrief from './group';
import Discount from './discount'; 
import NoAuth from './noauth';
import Contacts from './contacts'

import 'antd/lib/index.css';

var OrderInfo = Rabbit.create(url.orderOrder); 
var App = React.createClass({

    mixins: [
        Reflux.connect(AccountBasicInfo.store, 'basicInfo'),
        Reflux.connect(OrderInfo.store, 'data')
    ],

    // step1的回调函数

    onContactChange: function(selectContacts, selectContactsSize) {
        var order = this.state.order;
        order.travellers = selectContacts;
        order.travellerCount = selectContactsSize;
        this.setState({'order': order});
    },

    onAgreementCheck: function(e) {
        var order = this.state.order;
        order.isAgreed = e.target.checked;
        this.setState({'order': order});
    },

    onNextBtnClick: function() {
        if (this.state.order.travellerCount == 0) {
            message.error('必须选择出行人');
        } else if (this.state.order.isAgreed) {
            var data = this.state.data;
            data.orderInfo.status = orderStatus.WAITING;
            this.setState({'data': data});
        } else {
            message.error('必须先同意安全协议');
        }
    },

    // step2的回调函数

    onCreateOrderSubmit: function(discountData) {
        var self = this;
        var request = {
            'routeid': this.state.data.orderInfo.routeid,
            'groupid': this.state.data.orderInfo.groupid,
            'travellers': this.state.order.travellers,
            'policyDiscountid': discountData.policyDiscountid,
            'discountCode': discountData.discountCode,
            'studentDiscountid': discountData.studentDiscountid,
            'studentCount': discountData.studentCount,
            'isAgreed': this.state.order.isAgreed,
            'actualPrice': discountData.actualPrice,
        }
        $.post(url.orderOrder, request)
        .done(function(data) {
            if (data.status != 0) {
                message.error('订单创建失败，您可以联系15001028030');
            } else {
                message.success('订单创建成功，您可以使用支付宝进行支付');
            }
        })
        .fail(function() {
            message.error('订单创建失败，您可以联系15001028030');
        });
    },

    onOrderPaySubmit: function() {

    },

    getInitialState: function() {
        AccountBasicInfo.actions.get();
        var orderid = window.location.pathname.split('/')[2];
        OrderInfo.actions.load({'orderid': orderid});
        return {
            'basicInfo': {},
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
            },
            'order': {
                'isAgreed': false,
                'travellers': [],
                'travellerCount': 0
            }
        }
    },

    render: function() {
        var basicInfo = this.state.basicInfo;
        if (basicInfo.accountInfo == null) {
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
        status = orderStatus.REFOUNDED;
        if (status === orderStatus.NEW) {
            step = 1;
            content = (<Step1
                            quota={data.quota}
                            orderInfo={data.orderInfo} 
                            onContactChange={this.onContactChange}
                            onAgreementCheck={this.onAgreementCheck}
                            onNextBtnClick={this.onNextBtnClick}/>);
        } else if (status === orderStatus.WAITING) {
            step = 2;
            content = (<Step2
                            count={this.state.order.travellerCount}
                            orderInfo={data.orderInfo}
                            onCreateOrderSubmit={this.onCreateOrderSubmit}
                            onOrderPaySubmit={this.onOrderPaySubmit} />);
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
                    <Col md={9}>
                        {content}
                    </Col>
                    <Col md={3}>
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
