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

var OrderInfo = Rabbit.create(url.orderDetail); 
var App = React.createClass({

    mixins: [
        Reflux.connect(AccountBasicInfo.store, 'basicInfo'),
        Reflux.connect(OrderInfo.store, 'data')
    ],

    onContactChange: function(selectContacts) {
        var order = this.state.order;
        order.traveller = selectContacts;
        this.setState({'order': order});
    },

    onAgreementCheck: function(e) {
        var order = this.state.order;
        order.isAgreed = e.target.checked;
        this.setState({'order': order});
    },

    onNextBtnClick: function() {
        if (this.state.order.traveller.length == 0) {
            message.error('必须选择出行人');
        } else if (this.state.order.isAgreed) {
            var data = this.state.data;
            data.order.status = orderStatus.WAITING;
            this.setState({'data': data});
        } else {
            message.error('必须先同意安全协议');
        }
    },

    getInitialState: function() {
        AccountBasicInfo.actions.get();
        var orderid = window.location.pathname.split('/')[2];
        OrderInfo.actions.load({'orderid': orderid});
        return {
            'basicInfo': {},
            'data': {
                'status': 1,
                'order': {},
            },
            'order': {
                'isAgreed': false,
                'traveller': []
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
        var status = data.order.status;
        status = orderStatus.NEW;
        if (status == orderStatus.NEW) {
            content = (<Step1 
                            order={data.order} 
                            onContactChange={this.onContactChange}
                            onAgreementCheck={this.onAgreementCheck}
                            onNextBtnClick={this.onNextBtnClick}/>);
        } else if (status == orderStatus.WAITING) {
            content = <Step2 order={data.order} />
        } else if (status == orderStatus.PAID) {
            content = <Step3 order={data.order} />
        } else {
            content = <Step3 order={data.order} />
        }
        return (
            <Grid>
                <StepBar />
                <Row>
                    <Col md={9}>
                        {content}
                    </Col>
                    <Col md={3}>
                        <GroupBrief group={data.order.group}/>
                    </Col>
                </Row>
            </Grid>
        );
    }
});

var StepBar = React.createClass({

    render: function() {
        return (
            <Row>
                <div className="step">          
                    <ul>
                        <Col md={4} componentClass="li" className="on">
                            <span className="num"><em className="f-r5"></em><i>1</i></span>                 
                            <span className="line_bg lbg-r"></span>
                            <p className="lbg-txt">报名信息</p>
                        </Col>
                        <Col md={4} componentClass="li">
                            <span className="num"><em className="f-r5"></em><i>2</i></span>
                            <span className="line_bg lbg-l"></span>
                            <span className="line_bg lbg-r"></span>
                            <p className="lbg-txt">优惠&支付</p>
                        </Col>
                        <Col md={4} componentClass="li">
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
