/**
 * @author xiezhenzong 
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
import { Table, Form, Button, Modal, Input, message } from 'antd';

import { url, idType, priceUtil, orderStatus, defaultValue } from 'config';
import Title from 'title';
import OrderTip from 'order_tip';
import OrderOperationHelper from 'order_operation';

import 'antd/lib/index.css';

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

var Step3 = React.createClass({

    getTravellersTableData: function() {
        return this.props.orderTravellers.map(function(traveller) {
            return {
                'key': `order-step-discount-${traveller.travellerid}`,
                'name': traveller.name,
                'idType': idType.getDesc(traveller.idType),
                'id': traveller.id,
                'mobile': traveller.mobile,
                'roomate': traveller.roomate ? traveller.roomate : '服从安排'
            };
        });
    },

    getInitialState: function() {
        return {
        }
    },

    render: function() {
        var orderInfo = this.props.orderInfo;
        return (
            <div className="order-step3">
                <Title title="订单详情" className="order-content-title">
                    <p className="order-status-tip">
                        订单状态:
                        <span className="order-status">
                            {orderStatus.getDesc(orderInfo.status)}
                        </span>
                    </p>
                    <OrderTip status={orderInfo.status}
                        timeLeft={this.props.timeLeft} dayLeft={this.props.dayLeft}/>
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
                        policy={this.props.policy}
                        code={this.props.code}
                        student={this.props.student}/>
                </div>
                <div className="step3-section">
                    <h3>紧急联系人</h3>
                    <Emergency emergencyContact={orderInfo.emergencyContact}
                        emergencyMobile={orderInfo.emergencyMobile} />
                </div>
                <Refund orderRefound={this.props.orderRefound} />
                <OrderOperation orderid={orderInfo.orderid} status={orderInfo.status}
                                routeid={orderInfo.routeid}/>
            </div>
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
                'discountDesc': this.props.policy.desc,
                'discountPrice': this.props.policy.value
            });
        }
        if (this.props.code != null) {
            tableData.push( {
                'key': 'order-step3-discount-2',
                'discountName': '优惠码优惠',
                'discountDesc': '优惠码： ' + this.props.code.discountCode,
                'discountPrice': this.props.code.value
            });
        }
        if (this.props.orderInfo.studentCount > 0) {
            tableData.push( {
                'key': 'order-step3-discount-3',
                'discountName': '学生优惠',
                'discountDesc': `共有${this.props.orderInfo.studentCount}名学生`,
                'discountPrice': priceUtil.getPriceStr(priceUtil.getPrice(this.props.student.value) * this.props.orderInfo.studentCount)
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
        var totalDiscount = 0;
        if (this.props.policy != null) {
            totalDiscount += priceUtil.getPrice(this.props.policy.value);
        }
        if (this.props.code != null) {
            totalDiscount += priceUtil.getPrice(this.props.code.value);
        }
        if (this.props.student != null) {
            totalDiscount += priceUtil.getPrice(this.props.student.value) * this.props.orderInfo.studentCount;
        }
        return `实际共优惠了：${priceUtil.getPriceStr(totalDiscount)}`;
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
        return value == null ? [] : value.split(',');
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
        if (this.props.orderRefound == null) {
            content = (<div>本订单暂无任何退款信息</div>);
        } else {
            content = (<div>这里是退款信息</div>); // FIXME
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
                    <Button type="primary">
                        下载合同
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
                        查看其它路线
                    </Button>
                </div>
            );
        } else if (status == orderStatus.TIMEOUT) {
            operationGroup = (
                <div className="order-operation">
                    <Button type="primary" onClick={this.onRefundOrderBtnClick}>
                        重新下单
                    </Button>
                    <Button type="primary" onClick={this.onSameRouteBtnClick}>
                        查看同一路线
                    </Button>
                </div>
            );
        } else if (status == orderStatus.CANCEL || status == orderStatus.REFUNDING
            || status == orderStatus.REFUNDED){
            operationGroup = (
                <div className="order-operation">
                    <Button type="primary" onClick={this.onOtherRouteBtnClick}>
                        查看其它路线
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

module.exports = Step3;
