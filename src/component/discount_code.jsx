/**
 * @author xiezhenzong
 */
import React from 'react'; 
import { Popover, Table, Button } from 'antd';

import Rabbit from 'rabbit';
import { discountCodeStatus } from 'config';

import 'antd/lib/index.css';
import './discount_code.less';

const _discountCodeTableColumn = [{
    'title': '优惠码',
    'dataIndex': 'discountCode'
}, {
    'title': '折扣价格（减）',
    'dataIndex': 'value',
}, {
    'title': '使用截至日期',
    'dataIndex': 'info',
}];

var DiscountCodeTable = React.createClass({

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

    _getDiscountCodeList: function() {
        var discountCodeData = this.props.discountCode, self = this;
        if (discountCodeData.discountCodes.length == 0 || discountCodeData.status != 0) {
            return (<div>您暂时没有优惠券</div>);
        }
        var _discountCodeTableData = [];
        for (var index in discountCodeData.discountCodes) {
            var discountCode = discountCodeData.discountCodes[index];
            var usable = discountCodeStatus.usable(discountCode.status);
            _discountCodeTableData.push({
                'key': `discountcode-${index}`,
                'discountCode': discountCode.discountCode,
                'value': discountCode.value,
                'info': usable ?  discountCode.endTime : discountCodeStatus.getDesc(discountCode.status),
                'code': discountCode
            });
        }
        var discountCodeTableColumn = this._copyArray(_discountCodeTableColumn);
        if (this.props.needAddBtn) {
            discountCodeTableColumn.push({
                'title': '',
                'dataIndex': 'code',
                render: function(code) {
                    if (discountCodeStatus.usable(code.status)) {
                        return (
                            <Button type="primary" onClick={() => {self.props.onAddBtnClick(code)}}>
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
            <Table columns={discountCodeTableColumn} 
                dataSource={_discountCodeTableData} pagination={false}/>
        );
    },

    // compoment specs

    render: function() {
        return (
           <Popover overlay={this._getDiscountCodeList()} trigger="hover" placement={this.props.placement}>
                {this.props.children}
            </Popover>
        );
    }
});

module.exports = DiscountCodeTable;
