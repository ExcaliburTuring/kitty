/**
 * @author xiezhenzong
 */
import React from 'react'; 
import { Popover, Table, Button } from 'antd';

import Rabbit from 'rabbit';
import { couponStatus } from 'config';

import 'antd/lib/index.css';
import './coupon.less';

const _couponTableColumn = [{
    'title': '优惠券',
    'dataIndex': 'name'
}, {
    'title': '折扣价格（减）',
    'dataIndex': 'value',
}, {
    'title': '使用截至日期',
    'dataIndex': 'info',
}];

var CouponTable = React.createClass({

    // helper method

    _copyArray: function(array) {
        if (!array) {
            return [];
        }
        var copy = [];
        for (var i = 0, n = array.length; i < n; i++) {
            copy.push(array[i]);
        }
        return copy;
    },

    _getCouponList: function() {
        var coupons = this.props.coupons, self = this, now = new Date().getTime();
        if (coupons.coupons.length == 0 || coupons.status != 0) {
            return (<div>您暂时没有优惠券</div>);
        }
        var _couponTableData = [];
        for (var index in coupons.coupons) {
            var coupon = coupons.coupons[index];
            var usable = couponStatus.isUsable(coupon.status) && Date.parse(coupon.startTime) <= now && now <=Date.parse(coupon.endTime);
            _couponTableData.push({
                'key': `coupon-${index}`,
                'name': coupon.name,
                'value': coupon.value,
                'info': usable ?  coupon.endTime : couponStatus.getDesc(coupon.status),
                'code': coupon
            });
        }
        var couponTableColumn = this._copyArray(_couponTableColumn);
        if (this.props.needAddBtn) {
            couponTableColumn.push({
                'title': '',
                'dataIndex': 'code',
                render: function(coupon) {
                    if (couponStatus.isUsable(coupon.status)) {
                        return (
                            <Button type="primary" onClick={() => {self.props.onAddBtnClick(coupon)}}>
                                使用
                            </Button>
                        );
                    } else {
                        return (
                            <Button type="primary" disabled>
                                使用
                            </Button>
                        );
                    }
                }
            });
        }

        return (
            <Table columns={couponTableColumn} 
                dataSource={_couponTableData} pagination={false}/>
        );
    },

    // compoment specs

    render: function() {
        return (
           <Popover overlay={this._getCouponList()} trigger="hover" placement={this.props.placement}>
                {this.props.children}
            </Popover>
        );
    }
});

module.exports = CouponTable;
