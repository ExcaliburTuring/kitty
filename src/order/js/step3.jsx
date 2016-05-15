/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { Col } from 'react-bootstrap';
import { Table } from 'antd';

import { idType } from 'config';

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
}, {
    'title': '紧急联系电话',
    'dataIndex': 'emergencyMobile'
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
                'roomate': traveller.roomate ? traveller.roomate : '服从安排',
                'emergencyMobile': traveller.emergencyMobile
            };
        });
    },

    getDiscountTableData: function() {
        return [{
            'key': 'order-step3-discount-1',
            'discountName': '优惠政策',
            'discountDesc': this.props.policy.desc,
            'discountPrice': this.props.policy.value
        }, {
            'key': 'order-step3-discount-2',
            'discountName': '优惠码优惠',
            'discountDesc': '优惠码： ' + this.props.code.discountCode,
            'discountPrice': this.props.code.value
        }, {
            'key': 'order-step3-discount-3',
            'discountName': '学生优惠',
            'discountDesc': `共有${this.props.orderInfo.count}名学生`,
            'discountPrice': this.props.student.value * this.props.orderInfo.count
        }];
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
                    footer={() => `实际共优惠了： ${
                        this.props.policy.value 
                        + this.props.code.value
                        + this.props.student.value * this.props.orderInfo.count
                    }` } />

            </div>
        );
    }
});

var OrderStatus = React.createClass({

    render: function() {
        return (
            <div className="step3-section">
                <p>订单状态:{this.props.orderInfo.status}</p>
            </div>
        );
    }

});

module.exports = Step3;
