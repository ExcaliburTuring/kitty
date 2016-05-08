/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { Button,Col } from 'react-bootstrap';

import GroupBrief from './group';
import Travellers from './travellers';
import Emergency from './emergency';
import Roommate from './roommate';
import Discount from './Discount'; 
import NoAuth from './noauth';
import Contacts from './contacts'
import AccountOrders from 'account_orders';

var App = React.createClass({

    mixins: [Reflux.connect(AccountOrders.store, 'data')],

    getInitialState: function() {
        return {
           'data': {
                'status': 1,
                'orders': [],
                'staffs': {}
            }
        }
    },

    componentDidMount: function() {
        var orderid = window.location.pathname.split('/')[2];
        AccountOrders.actions.get();
    },

    render: function() {
        var data = this.state.data;
        if (data.status != 0) {
            if (data.status == 3) {
                return <NoAuth />
            }
            return (
                <div>
                    <p>订单查询失败, 请联系客服： 15001028030</p>
                </div>
            );
        }
        var groupid = 1;
        var mockOrder = data.orders[1]; // 假装只取到一个订单，因为应该是有orderid的，
        var agreement = mockOrder.isArgeementOk ? '我已经同意安全协议' : '同意安全协议';
        var travelers = ["谢振宗","赵伟"];
        return (
            <div className="container">
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
                <Col md={9}>
                    <Contacts />
                </Col>
                <Col md={3}>
                    <div className="travel-info">
                        <GroupBrief groupid={groupid} travelers={travelers}/>
                        <div className="total">
                            <p>总价：</p><div className="price-right">￥3980</div>
                        </div>
                    </div>
                </Col>
                <Col md={5} mdOffset={4}>
                    <div className="submit">
                        <div><input type="checkbox" ></input>{agreement}</div>
                        <Button bsStyle="primary" bsSize="large" type="submit">下一步</Button>
                    </div>
                </Col>
            </div>
        );
    }
});

module.exports = App;
