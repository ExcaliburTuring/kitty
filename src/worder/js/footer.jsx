/**
 * @author xiezhenzong 
 */
import React from 'react';
import { Button } from 'antd-mobile';
import { createForm } from 'rc-form';

import { url, gender, priceUtil, discountCodeStatus }  from 'config';

var Footer = React.createClass({

    /**
     * 获取原始价格
     */
    _getPrice: function() {
        var travelGroup = this.props.travelGroup;
        var count = this.props.selectTravellers.length; 
        return priceUtil.getPrice(travelGroup.price) * count;
    },

    /**
     * 获取优惠后的实际价格
     */
    _getActualPrice: function() {
        return priceUtil.getPriceStr(
                    this._getPrice()
                    - priceUtil.getPrice(this.props.policyDiscount.value)
                    - priceUtil.getPrice(this.props.discountCode.value)
                    - priceUtil.getPrice(this.props.studentDiscount.value)
                );
    },
    
    render: function() {
        return (
            <div className="footer-container">
                <div className="clearfix">
                    <p className="pull-left">实际付款{this._getActualPrice()}</p>
                    <Button className="pull-right" inline size="small" onClick={this.props.onSaveOrderClick}>保存订单</Button>
                    <Button className="pull-right" inline size="small" onClick={this.props.onPayOrderClick}>微信支付</Button>
                </div>
            </div>
        );
    }
});

module.exports = Footer;
