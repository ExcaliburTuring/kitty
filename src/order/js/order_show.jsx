/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { Grid, Row, Col } from 'react-bootstrap';
import { Table, Form, Button, Modal, Input, message } from 'antd';

import { url, idType, priceUtil, orderStatus, defaultValue, refundStatus, refundType } from 'config';
import Title from 'title';
import OrderTip from 'order_tip';
import OrderOperationHelper from 'order_operation';
import GroupBrief from './group';

const _travellerTableColumn = [{
    'title': '姓名',
    'dataIndex': 'name'
}, {
    'title': '证件类型',
    'dataIndex': 'idType',
}, {
    'title': '证件号',
    'dataIndex': 'id',
}, {
    'title': '手机',
    'dataIndex': 'mobile',
}, {
    'title': '睡友',
    'dataIndex': 'roomate',
}];

const _discountTableColumn = [{
    'title': '支付与优惠信息',
    'dataIndex': 'discountName',
    'colSpan': 3
}, {
    'title': '优惠描述',
    'dataIndex': 'discountDesc',
    'colSpan': 0
}, {
    'title': '实际优惠价格',
    'dataIndex': 'discountPrice',
    'colSpan': 0
}];

const _emergencyTableColumn = [{
    'title': '序号',
    'dataIndex': 'id'
}, {
    'title': '姓名',
    'dataIndex': 'name'
}, {
    'title': '联系方式',
    'dataIndex': 'mobile'
}];

var OrderShow = React.createClass({

    getTravellersTableData: function() {
        return this.props.orderInfoData.orderTravellers.map(function(traveller) {
            return {
                'key': `order-step-discount-${traveller.travellerid}`,
                'name': traveller.name,
                'idType': idType.getDesc(traveller.idType),
                'id': traveller.id,
                'mobile': traveller.mobile,
                'roomate': traveller.roommate ? traveller.roommate : '服从安排'
            };
        });
    },

    getInitialState: function() {
        return {
        }
    },

    render: function() {
        var orderInfoData = this.props.orderInfoData;
        var orderInfo = orderInfoData.orderInfo;
        return (
            <Grid>
                <Row>
                    <Col sm={9} md={9}>
                        <div className="order-content-container order-show-container">
                            <Title title="订单详情" className="order-content-title">
                                <p className="order-status-tip">
                                    订单状态:
                                    <span className="order-status">
                                        {orderStatus.getDesc(orderInfo.status)}
                                    </span>
                                </p>
                                <OrderTip status={orderInfo.status}
                                    timeLeft={orderInfoData.timeLeft} dayLeft={orderInfoData.dayLeft}/>
                            </Title>
                            <div className="step3-section">
                                <h3>出行人员</h3>
                                <Table
                                    columns={_travellerTableColumn}
                                    dataSource={this.getTravellersTableData()}
                                    bordered 
                                    pagination={false} />
                            </div>
                            <div className="step3-section">
                                <h3>支付金额和优惠</h3>
                                <Discount 
                                    orderInfo={orderInfo} 
                                    policy={orderInfoData.policy}
                                    coupon={orderInfoData.coupon}
                                    student={orderInfoData.student}/>
                            </div>
                            <div className="step3-section">
                                <h3>紧急联系人</h3>
                                <Emergency emergencyContact={orderInfo.emergencyContact}
                                    emergencyMobile={orderInfo.emergencyMobile} />
                            </div>
                            <Refund orderInfo={orderInfo} orderRefound={orderInfoData.orderRefound}/>
                            <OrderOperation orderid={orderInfo.orderid} status={orderInfo.status} actualPrice={orderInfo.actualPrice}
                                routeid={orderInfo.routeid} groupid={orderInfo.groupid}/>
                        </div>
                    </Col>
                    <Col sm={3} md={3}>
                        <GroupBrief 
                            travelRoute={orderInfoData.travelRoute} 
                            travelGroup={orderInfoData.travelGroup}/>
                    </Col>
                </Row>
            </Grid>
        );
    }
});

var Discount = React.createClass({

    getDiscountTableData: function() {
        var tableData = [];
        tableData.push({
            'key': 'order-price',
            'discountName': '订单金额',
            'discountDesc': `共${this.props.orderInfo.count}人出行`,
            'discountPrice': this.props.orderInfo.price
        });
        if (this.props.policy != null) {
            tableData.push({
                'key': 'order-step3-discount-1',
                'discountName': '优惠政策',
                'discountDesc': this.props.policy.name,
                'discountPrice': this.props.policy.value
            });
        }
        if (this.props.coupon != null) {
            tableData.push( {
                'key': 'order-step3-discount-2',
                'discountName': '优惠券',
                'discountDesc': '优惠券： ' + this.props.coupon.name,
                'discountPrice': this.props.coupon.value
            });
        }
        if (this.props.orderInfo.studentCount > 0) {
            tableData.push( {
                'key': 'order-step3-discount-3',
                'discountName': '学生优惠',
                'discountDesc': `共有${this.props.orderInfo.studentCount}名学生`,
                'discountPrice': this.props.student.value
            });
        }
        tableData.push({
            'key': 'order-actual-price',
            'discountName': '实际支付',
            'discountDesc': '',
            'discountPrice': this.props.orderInfo.actualPrice
        });
        return tableData;
    },

    getFooter: function() {
        var totalDiscount = priceUtil.getOrderDiscountPrice(this.props.policy, this.props.coupon, this.props.student);
        return `实际共优惠了：${totalDiscount}`;
    },

    render: function() {
        return (
            <Table
                columns={_discountTableColumn} 
                dataSource={this.getDiscountTableData()} 
                bordered 
                pagination={false}
                footer={this.getFooter} />
        );
    }
});

var Emergency = React.createClass({

    _split: function(value) {
        return value == null ? [] : value.split(';');
    },

    render: function() {
        var emergencyContacts = this._split(this.props.emergencyContact);
        var emergencyMobiles = this._split(this.props.emergencyMobile);
        if (emergencyContacts.length == 0 || emergencyMobiles.length == 0) {
            return (
                <div>没有设置紧急联系人</div>
            );
        }
        var emergency = [];
        for (var i = 0, n = emergencyMobiles.length; i < n; i++) {
            emergency.push({
                'key': `emergency-${i}`,
                'id': i + 1,
                'name': i >= emergencyContacts.length ? '' : emergencyContacts[i],
                'mobile': emergencyMobiles[i]
            })
        }
        return (
            <div>
                <Table
                    columns={_emergencyTableColumn} 
                    dataSource={emergency} 
                    bordered 
                    pagination={false} />
            </div>
        );
    }
});

var Refund = React.createClass({

    render: function() {
        var content = null;
        var status = this.props.orderInfo.status;
        var orderRefound = this.props.orderRefound;
        if (orderRefound == null 
            || (status != orderStatus.REFUNDING && status != orderStatus.REFUNDED)) {
            content = (<div>本订单暂无任何退款信息</div>);
        } else {
            content = (
                <div>
                    <p>当前状态：{refundStatus.getDesc(orderRefound.status)}</p>
                    <p>退款策略：{refundType.getDesc(orderRefound.type)}</p>
                    <p>实际支付：{this.props.orderInfo.actualPrice}</p>
                    <p>退款金额：{orderRefound.refund}</p>
                    <p>退款原因：{orderRefound.desc}</p>
                </div>
            );
        }

        return (
            <div className="step3-section">
                <h3>退款信息</h3>
                {content}
            </div>
        );
    }
});

var OrderOperation = React.createClass({

    mixins: [OrderOperationHelper],

    render: function() {
        var status = this.props.status;
        var operationGroup = null;
        if (status == orderStatus.WAITING) {
            operationGroup = (
                <div className="order-operation">
                    <Form inline onSubmit={()=>{}} action="/order/pay" method="GET" target="_blank">
                        <input type="hidden" name="orderid" value={this.props.orderid}></input>
                        <Button type="primary" htmlType="submit">
                            马上支付
                        </Button>
                    </Form>
                    <Button type="primary" onClick={this.onCancelOrderBtnClick}>
                        取消订单
                    </Button>
                </div>
            );
        } else if (status == orderStatus.PAYING) {
            operationGroup = (
                <div className="order-operation">
                    <Form inline onSubmit={()=>{}} action="/order/pay" method="GET" target="_blank">
                        <input type="hidden" name="orderid" value={this.props.orderid}></input>
                        <Button type="primary" htmlType="submit">
                            继续支付
                        </Button>
                    </Form>
                    <Button type="primary" onClick={this.onCancelOrderBtnClick}>
                        取消订单
                    </Button>
                </div>
            );
        } else if (status == orderStatus.PAID) {
            operationGroup = (
                <div className="order-operation">
                    <Button type="primary" onClick={this.onRefundOrderBtnClick}>
                        订单退款
                    </Button>
                    <Button type="primary" onClick={this.onOtherRouteBtnClick}>
                        其它路线
                    </Button>
                    <Button type="primary" onClick={this.onDownloadTravelContractBtnClick}>
                        下载合同
                    </Button>
                </div>
            );
        } else if (status == orderStatus.TIMEOUT) {
            operationGroup = (
                <div className="order-operation">
                    <Button type="primary" onClick={this.onReorderBtnClick}>
                        重新下单
                    </Button>
                    <Button type="primary" onClick={this.onSameRouteBtnClick}>
                        同一路线
                    </Button>
                </div>
            );
        } else if (status == orderStatus.CANCEL || status == orderStatus.REFUNDING
            || status == orderStatus.REFUNDED){
            operationGroup = (
                <div className="order-operation">
                    <Button type="primary" onClick={this.onOtherRouteBtnClick}>
                        其它路线
                    </Button>
                </div>
            );
        } else {
            return null;
        }
        return (
            <div className="order-operation-container">
                {operationGroup}
            </div>
        );
    }
});

module.exports = OrderShow;
