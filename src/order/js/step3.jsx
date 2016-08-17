/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { Table, Form, Button } from 'antd';

import { idType, priceUtil, orderStatus, defaultValue } from 'config';

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

    getInitialState: function() {
        return {
        }
    },

    render: function() {
        return (
            <div className="order-step3">
                <OrderStatus orderInfo={this.props.orderInfo}/>
                <Table
                    className="step3-section"
                    columns={_travellerTableColumn}
                    dataSource={this.getTravellersTableData()}
                    bordered 
                    pagination={false} />
                <Table
                    className="step3-section"
                    columns={_discountTableColumn} 
                    dataSource={this.getDiscountTableData()} 
                    bordered 
                    pagination={false}
                    footer={this.getFooter} />
            </div>
        );
    }
});

var OrderStatus = React.createClass({

    onOrderPaySubmit: function() {

    },

    render: function() {
        var payBtn = null;
        if (this.props.orderInfo.status == orderStatus.WAITING) {
            payBtn = (
                 <Form inline onSubmit={this.onOrderPaySubmit} action="/order/pay" method="GET">
                    <input type="hidden" name="orderid" value={this.props.orderInfo.orderid}></input>
                    <Button type="primary" htmlType="submit">
                        马上支付
                    </Button>
                </Form>
            );
        }
        return (
            <div className="step3-section">
                <div className="order-status-title">
                    <p className="order-status-text pull-left">订单状态: </p>
                    <p className="order-status-content pull-left">{ orderStatus.getDesc(this.props.orderInfo.status)}</p>
                    {payBtn}
                </div>
            </div>
        );
    }

});

module.exports = Step3;
