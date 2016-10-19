/**
 * @author xiezhenzong 
 */
import React from 'react';
import { Button } from 'antd-mobile';
import { createForm } from 'rc-form';

import { url, gender, priceUtil, discountCodeStatus }  from 'config';

var Footer = React.createClass({

    enableBtn: function() {
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
        this.props.onSaveOrderClick();
    },

    onPayOrderClick: function() {
        this._disabledBtn();
        this.props.onPayOrderClick();
    },

    getInitialState: function() {
        return {
            'saveOrderBtnDisabled': false,
            'payOrderBtnDisabled': false
        };
    },
    
    render: function() {
        return (
            <div className="footer-container">
                <div className="clearfix">
                    <p className="pull-left">实际付款{this.props.actualPrice}</p>
                    <form className="pull-right" onSubmit={this.onPayOrderClick} action="/order/pay" method="GET" target="_blank">
                        <input type="hidden" name="orderid" value={this.props.orderid}></input>
                        <Button inline size="small" htmlType="submit" disabled={this.state.payOrderBtnDisabled}>
                            微信支付
                        </Button>
                    </form>
                    <Button className="pull-right" inline size="small" 
                        disabled={this.state.saveOrderBtnDisabled}
                        onClick={this.onSaveOrderClick}>
                        保存订单
                    </Button>
                </div>
            </div>
        );
    }
});

module.exports = Footer;
