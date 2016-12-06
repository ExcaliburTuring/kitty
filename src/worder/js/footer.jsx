/**
 * @author xiezhenzong 
 */
import React from 'react';
import { Button, Modal, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
const alert = Modal.alert;

import { url, gender, priceUtil, orderStatus, defaultValue, refundType }  from 'config';

var Footer = React.createClass({

    _doCancelOrder: function() {
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

    _doRefundOrder: function() {
        $.ajax({
            url: url.orderRefund,
            type: 'post',
            data: {'orderid': this.props.orderid, 'desc': '通过手机端申请退款'}
        }).done(function(data) {
            if (data.status != 0) {
                var errMsg = data.errors[0].message;
                alert('订单退款失败', (
                        <div>
                            <p>由于：<span className="order-refund-failed">{errMsg}</span> 
                                的原因，申请订单退款失败！但请您不要担心，海逍遥客服将主动与您联系，您也可直接致电海逍遥客服：
                                {defaultValue.hotline}
                            </p>
                        </div>
                    ), [{text: '确定', onPress: ()=>{}}]
                );
            } else {
                alert('订单退款失败', 
                    '您已经成功申请订单退款！如可自动退款，将按原路返回到您的账户中。如无法自动退款，海逍遥工作人员将很快与您取得联系，请您耐心等候！', 
                    [{text: '确定', onPress: ()=>{setTimeout('location.reload(true);', 300);}}]
                );
            }
        }).fail(function() {
            alert('订单退款失败', (
                <div>
                    <p>由于：<span className="order-refund-failed">系统处理失败</span> 
                        的原因，申请订单退款失败！但请您不要担心，海逍遥客服将主动与您联系，您也可直接致电海逍遥客服：
                        {defaultValue.hotline}
                    </p>
                </div>
                ), [{text: '确定', onPress: ()=>{}}]
            );
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
        var self = this, refundTypeInfo = null;
        $.ajax({
            'url': url.orderRefundType + `?orderid=${this.props.orderid}`,
            'type': 'GET',
            'async': false,
            'success': function(data) {
                if (data.status != 0) {
                    Toast.fail(`获取退款策略失败，您可以联系${defaultValue.hotline}`, 1);
                } else {
                    refundTypeInfo = data;
                }
            },
            'error': function() {
                Toast.fail(`获取退款策略失败，您可以联系${defaultValue.hotline}`, 1);
            }
        });

        if (refundTypeInfo == null) {
            return;
        }
        alert(
            '订单退款',
            (
                <div>
                    <p>{refundType.getDesc(refundTypeInfo.type)}</p>
                    <p>实际支付：<span className="refund-price-text">{refundTypeInfo.actualPrice}</span></p>
                    <p>退款金额：<span className="refund-price-text">{refundTypeInfo.refundPrice}</span></p>
                    <p>扣减金额：<span className="refund-price-text">{refundTypeInfo.deductPrice}</span></p>
                    <p>欢迎直接致电海逍遥:{defaultValue.hotline}</p>
                </div>
            ),
            [{
                text: '再考虑下',
                onPress: () => {}
            }, { 
                text: '确定退款',
                onPress: function() {
                    self._doRefundOrder();
                }
            }]
        );
    },

    onOtherRouteBtnClick: function() {
        window.location.href = '/';
    },

    onDownloadContractBtnClick: function() {
        window.open(`/order/contract?orderid=${this.props.orderid}`);
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
                    <form className="pull-right" inline onSubmit={()=>{}} action="/order/pay" method="GET">
                        <input type="hidden" name="orderid" value={this.props.orderid}></input>
                        <input type="hidden" name="payType" value="1"></input>
                        <Button className="first-btn" inline htmlType="submit">
                            继续支付
                        </Button>
                    </form>
                    <Button className="second-btn pull-right" inline onClick={this.onCancelOrderBtnClick}>
                        取消订单
                    </Button>
                </div>
            );
        } else if (status == orderStatus.PAID) {
            operationGroup = (
                <div className="order-operation clearfix">
                    <Button className="first-btn pull-right" inline onClick={this.onDownloadContractBtnClick}>
                        查看合同
                    </Button>
                    <Button className="second-btn pull-right" inline onClick={this.onRefundOrderBtnClick}>
                        订单退款
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
