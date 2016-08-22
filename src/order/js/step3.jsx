/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { Table, Form, Button } from 'antd';

import { idType, priceUtil, orderStatus, defaultValue } from 'config';
import Title from 'title';

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
    'title': '优惠信息',
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
}]

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
        return (
            <div className={`order-step3 ${this.props.hide ? "hide" : ""}`}>
                <Title title="订单详情" className="order-content-title">
                    <p className="order-status-tip">
                        订单状态:
                        <span className="order-status">
                            {orderStatus.getDesc(this.props.orderInfo.status)}
                        </span>
                    </p>
                    <p></p>
                </Title>
                <div className="step3-section">
                    <h3>参加旅行的人</h3>
                    <Table
                        columns={_travellerTableColumn}
                        dataSource={this.getTravellersTableData()}
                        bordered 
                        pagination={false} />
                </div>
                <div className="step3-section">
                    <h3>使用的优惠</h3>
                    <Discount 
                        orderInfo={this.props.orderInfo} 
                        policy={this.props.policy}
                        code={this.props.code}
                        student={this.props.student}/>
                </div>
                <div className="step3-section">
                    <h3>紧急联系人</h3>
                    <div>未设置紧急联系人</div>
                </div>
                <Refund orderRefound={this.props.orderRefound} />
                <OrderOperation orderInfo={this.props.orderInfo} />
            </div>
        );
    }
});

var Discount = React.createClass({

    getDiscountTableData: function() {
        var tableData = [];
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
        if (this.props.policy == null && this.props.code == null && this.props.student == null) {
            return (
                <div> 本订单不享受任何折扣</div>
            );
        } else {
            return (
                <Table
                    columns={_discountTableColumn} 
                    dataSource={this.getDiscountTableData()} 
                    bordered 
                    pagination={false}
                    footer={this.getFooter} />
            );
        }
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

    onOrderPaySubmit: function() {

    },

    render: function() {
        var status = this.props.orderInfo.status;
        var operationGroup = null;
        if (status == orderStatus.WAITING || status == orderStatus.PAYING) {
            operationGroup = (
                <div className="order-operation">
                    <Form inline onSubmit={this.onOrderPaySubmit} action="/order/pay" method="GET">
                        <input type="hidden" name="orderid" value={this.props.orderInfo.orderid}></input>
                        <Button type="primary" htmlType="submit">
                            马上支付
                        </Button>
                    </Form>
                    <Button type="primary">
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
                    <Form inline onSubmit={this.onOrderPaySubmit} action="/order/pay" method="GET">
                        <input type="hidden" name="orderid" value={this.props.orderInfo.orderid}></input>
                        <Button type="primary" htmlType="submit">
                            马上支付
                        </Button>
                    </Form>
                    <Button type="primary">
                        订单退款
                    </Button>
                    <Button type="primary">
                        下载合同
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
