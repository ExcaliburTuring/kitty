/**
 * @author xiezhenzong 
 */
import React from 'react';
import { Button, WingBlank } from 'antd-mobile';
import { createForm } from 'rc-form';

import { url, gender, priceUtil, discountCodeStatus }  from 'config';

var Footer = React.createClass({

    _enableBtn: function() {
        this.setState({
            'saveOrderBtnDisabled': false,
            'payOrderBtnDisabled': false,
        });
    },

    _disabledBtn: function() {
        this.setState({
            'saveOrderBtnDisabled': true,
            'payOrderBtnDisabled': true,
        });
    },

    onSaveOrderClick: function() {
        this._disabledBtn();
        var result = this.props.onSaveOrderClick();
        if (!result) {
            this._enableBtn();
        }
    },

    onPayOrderClick: function(e) {
        this._disabledBtn();
        var result =  this.props.onPayOrderClick();
        if (!result) {
            e.preventDefault();
            this._enableBtn();
        }
        return result;
    },

    getInitialState: function() {
        return {
            'saveOrderBtnDisabled': false,
            'payOrderBtnDisabled': false
        };
    },
    
    render: function() {
        return (
            <div className="footer-container clearfix">
                <WingBlank>
                    <p className="pull-left">合计：¥
                        <span className="order-price">{this.props.actualPrice.replace("￥", "")}</span>
                    </p>
                </WingBlank>
                <form className="pull-right" onSubmit={this.onPayOrderClick} action="/order/pay" method="GET">
                    <input type="hidden" name="orderid" value={this.props.orderid}></input>
                    <input type="hidden" name="payType" value="1"></input>
                    <Button inline htmlType="submit" disabled={this.state.payOrderBtnDisabled}>
                        微信支付
                    </Button>
                </form>
                <Button className="pull-right" inline
                    disabled={this.state.saveOrderBtnDisabled}
                    onClick={this.onSaveOrderClick}>
                    保存订单
                </Button>
            </div>
        );
    }
});

module.exports = Footer;
