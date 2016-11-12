/**
 * @author xiezhenzong 
 */
import React from 'react';
import { Button, Modal, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
const alert = Modal.alert;

import { url, gender, priceUtil, discountCodeStatus, orderStatus, defaultValue }  from 'config';

var Footer = React.createClass({

    _doCancelOrder: function() {
        var self = this;
        $.ajax({
            url: url.orderOrder,
            type: 'post',
            data: {'orderid': this.props.orderid, '_method': 'delete'}
        }).done(function(data) {
            if (data.status != 0) {
                Toast.fail(defaultValue.cancelOrderMsg, 1);
            } else {
                Toast.success('取消订单成功');
                setTimeout('location.reload(true);', 300);
            }
        }).fail(function() {
            Toast.fail(defaultValue.cancelOrderMsg, 1);
        });
    },

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

    // 已经保存的订单的操作的回调方法

    onCancelOrderBtnClick: function() {
        var self = this;
        alert('取消订单？', `如果您对路线有疑问或建议或想修改订单，欢迎直接致电海逍遥:${defaultValue.hotline}`, [
            {
                text: '再考虑下',
                onPress: () => {}
            },
            { 
                text: '确定取消',
                onPress: function() {
                    self._doCancelOrder();
                }
            },
        ]);
    },

    onRefundOrderBtnClick: function() {

    },

    onOtherRouteBtnClick: function() {
        window.location.href = '/';
    },

    onDownloadContractBtnClick: function() {

    },

    onReorderBtnClick: function() {
        $.post(url.orderNew, {
            'routeid': this.props.orderInfo.routeid, 
            'groupid': this.props.orderInfo.groupid
        })
        .done(function(data) {
            if (data.status != 0) {
                Toast.fail(defaultValue.newOrderMsg, 1);
            } else {
                window.location.href = `${url.order}/${data.orderid}`;
            }
        })
        .fail(function() {
            Toast.fail(defaultValue.newOrderMsg, 1);
        });
    },

    onSameRouteBtnClick: function() {
        window.location.href = `${url.travel}/${this.props.orderInfo.routeid}`;
    },

    getInitialState: function() {
        return {
            'saveOrderBtnDisabled': false,
            'payOrderBtnDisabled': false
        };
    },
    
    render: function() {
        var orderInfo = this.props.orderInfo;
        var status = orderInfo.status;
        var operationGroup = null;
        if (status == orderStatus.NEW) {
            operationGroup = (
                <div className="order-operation clearfix">
                    <form className="pull-right" onSubmit={this.onPayOrderClick} action="/order/pay" method="GET">
                        <input type="hidden" name="orderid" value={this.props.orderid}></input>
                        <input type="hidden" name="payType" value="1"></input>
                        <Button className="first-btn" inline htmlType="submit" disabled={this.state.payOrderBtnDisabled}>
                            微信支付
                        </Button>
                    </form>
                    <Button className="second-btn pull-right" inline
                        disabled={this.state.saveOrderBtnDisabled}
                        onClick={this.onSaveOrderClick}>
                        保存订单
                    </Button>
                </div>
            );
        } else if (status == orderStatus.WAITING) {
            operationGroup = (
                <div className="order-operation clearfix">
                    <form className="pull-right" inline onSubmit={()=>{}} action="/order/pay" method="GET">
                        <input type="hidden" name="orderid" value={this.props.orderid}></input>
                        <input type="hidden" name="payType" value="1"></input>
                        <Button className="first-btn" inline htmlType="submit">
                            马上支付
                        </Button>
                    </form>
                    <Button className="second-btn pull-right" inline onClick={this.onCancelOrderBtnClick}>
                        取消订单
                    </Button>
                </div>
            );
        } else if (status == orderStatus.PAYING) {
            operationGroup = (
                <div className="order-operation clearfix">
                    <form inline onSubmit={()=>{}} action="/order/pay" method="GET">
                        <input type="hidden" name="orderid" value={orderid}></input>
                        <input type="hidden" name="payType" value="1"></input>
                        <Button inline htmlType="submit">
                            继续支付
                        </Button>
                    </form>
                    <Button inline onClick={this.onCancelOrderBtnClick}>
                        取消订单
                    </Button>
                </div>
            );
        } else if (status == orderStatus.PAID) {
            operationGroup = (
                <div className="order-operation clearfix">
                    <Button className="first-btn pull-right" inline onClick={this.onRefundOrderBtnClick}>
                        订单退款
                    </Button>
                    <Button className="second-btn pull-right" inline onClick={this.onDownloadContractBtnClick}>
                        下载合同
                    </Button>
                </div>
            );
        } else if (status == orderStatus.TIMEOUT) {
            operationGroup = (
                <div className="order-operation clearfix">
                    <Button className="first-btn pull-right"  inline onClick={this.onReorderBtnClick}>
                        重新下单
                    </Button>
                    <Button className="second-btn pull-right" inline onClick={this.onSameRouteBtnClick}>
                        同一路线
                    </Button>
                </div>
            );
        } else if (status == orderStatus.CANCEL || status == orderStatus.REFUNDING
            || status == orderStatus.REFUNDED || status == orderStatus.CLOSED){
            operationGroup = (
                <div className="order-operation clearfix">
                    <Button className="first-btn pull-right" inline onClick={this.onOtherRouteBtnClick}>
                        其它路线
                    </Button>
                </div>
            );
        } else {
            return null;
        }
        return (
            <div className="footer-container clearfix">
                <p className="pull-left">合计：¥
                    <span className="order-price">{this.props.actualPrice.replace("￥", "")}</span>
                </p>
                {operationGroup}
            </div>
        );
    }
});

module.exports = Footer;
