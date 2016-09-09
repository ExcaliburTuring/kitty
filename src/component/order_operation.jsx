/**
 * @author xiezhenzong
 */
import React from 'react';
import { Modal, Input, Alert, Select, message } from 'antd';
const Option = Select.Option;

import { url, orderStatus, defaultValue, refundType } from 'config';

import 'antd/lib/index.css';
import './order_operation.less'

var _refundReasonConfig = {
    'refund-reason-1': "买不到车票/飞机票",
    'refund-reason-2': "同伴退出",
    'refund-reason-3' : "公司/家庭突发事件处理",
    'refund-reason-4': "感冒/受伤等身体健康原因"
};

var OrderOperationHelper = {

    _refundReason: '',

    _refundReasonSelect: [],

    // help method

    _doCancelOrder: function() {
        var self = this;
        $.ajax({
            url: url.orderOrder,
            type: 'post',
            data: {'orderid': this.props.orderid, '_method': 'delete'}
        }).done(function(data) {
            if (data.status != 0) {
                message.error(defaultValue.cancelOrderMsg);
            } else {
                message.success('取消订单成功');
                setTimeout('location.reload(true);', 300);
            }
        }).fail(function() {
            message.error(defaultValue.cancelOrderMsg);
        });
    },

    _doGetRefundOrderType: function() {
        var refundTypeInfo = null;
        $.ajax({
            'url': url.orderRefundType + `?orderid=${this.props.orderid}`,
            'type': 'GET',
            'async': false,
            'success': function(data) {
                if (data.status != 0) {
                    message.error(`获取退款策略失败，您可以联系${defaultValue.hotline}`);
                } else {
                    refundTypeInfo = data;   
                }
            },
            'error': function() {
                message.error(`获取退款策略失败，您可以联系${defaultValue.hotline}`);
            }
        });
        return refundTypeInfo;
    },

    _doRefundOrder: function() {
        var desc = this._getRefundReasonDescFromState();
        var self = this;
        $.ajax({
            url: url.orderRefund,
            type: 'post',
            data: {'orderid': this.props.orderid, 'desc': desc}
        }).done(function(data) {
            if (data.status != 0) {
                var errMsg = data.errors[0].message;
                var content = (
                    <div>
                        <p>由于：<span className="order-refund-failed">{errMsg}</span> 
                            的原因，申请订单退款失败！但请您不要担心，海逍遥客服将主动与您联系，您也可直接致电海逍遥客服：
                            {defaultValue.hotline}
                        </p>
                    </div>
                )
                Modal.error({
                    title: '订单退款失败',
                    content: content
                });
            } else {
                Modal.success({
                    title: '订单退款成功',
                    content: '您已经成功申请订单退款！如可自动退款，将按原路返回到您的账户中。如无法自动退款，海逍遥工作人员将很快与您取得联系，请您耐心等候！'
                });
                setTimeout('location.reload(true);', 300);
            }
        }).fail(function() {
            var content = (
                <div>
                    <p>由于：<span className="order-refund-failed">系统处理失败</span> 
                        的原因，申请订单退款失败！但请您不要担心，海逍遥客服将主动与您联系，您也可直接致电海逍遥客服：
                        {defaultValue.hotline}
                    </p>
                </div>
            )
            Modal.error({
                title: '订单退款失败',
                content: content
            });
        });
    },

    _getRefundReasonDescFromState: function() {
        var refundReason = this._refundReasonSelect;
        var desc = this._refundReason == '' ? '' : this._refundReason + ';';
        for (var i = 0, n = refundReason.length; i < n; i++) {
            var t = refundReason[i];
            if (_refundReasonConfig.hasOwnProperty(t)) {
                desc = desc + _refundReasonConfig[t] + ';';
            }
        }
        return desc.length > 0 ? desc.substring(0, desc.length - 1) : '';
    },

    _doRefundReasonChange: function(value) {
        this._refundReason = value;
    },

    _doRefundReasonSelect: function(value) {
        var refundReason = this._refundReasonSelect;
        refundReason.push(value);
    },

    _doRefundReasonDeselect: function(value) {
        var refundReason = this._refundReasonSelect;
        for (var i = refundReason.length - 1; i >= 0; i--) {
            var t = refundReason[i];
            if (t == value) {
                refundReason.splice(i, 1);
                break;
            }
        }
    },

    // callback method

    onCancelOrderBtnClick: function() {
        var self = this;
        Modal.confirm({
            title: '取消订单',
            content: `您是否确认要取消这个订单?如果您对我们的路线有疑问或建议或想修改订单，欢迎直接致电我们客服:${defaultValue.hotline}`,
            onOk: function() {
                self._doCancelOrder();
            },
            onCancel: function() {}
        });
    },

    onRefundOrderBtnClick: function() {
        var refundTypeInfo = this._doGetRefundOrderType();
        var self = this;
        var refundModalContent = (
            <div>
                {
                    refundTypeInfo != null ?
                        <div>
                            <p>退款策略：{refundType.getDesc(refundTypeInfo.type)}</p>
                            <p>
                                实际支付：<span className="refund-price-text">{this.props.actualPrice}</span>
                                退款金额：<span className="refund-price-text">{refundTypeInfo.refundPrice}</span>
                                扣减金额：<span className="refund-price-text">{refundTypeInfo.deductPrice}</span>
                            </p>
                        </div>
                    : null
                }
                <Alert 
                    message="友情提示"
                    description={
                        <p>
                            {`如果您对订单不满意或者因某些原因想重新下订单可直接联系我们客服: ${defaultValue.hotline}，并且申请退款有可能不能全额返还的哦，参考退款政策。`}
                        </p>
                    } type="warn" closable />
                <Select 
                    tags style={{ width: '100%' }}
                    searchPlaceholder="请输入或选择申请退款理由"
                    onSearch={this._doRefundReasonChange}
                    onSelect={this._doRefundReasonSelect}
                    onDeselect={this._doRefundReasonDeselect}>
                    <Option key="refund-reason-1">买不到车票/飞机票</Option>
                    <Option key="refund-reason-2">同伴退出</Option>
                    <Option key="refund-reason-3">公司/家庭突发事件处理</Option>
                    <Option key="refund-reason-4">感冒/受伤等身体健康原因</Option>
                </Select>
            </div>
        );
        Modal.confirm({
            title: '订单退款',
            okText: '确定',
            content: refundModalContent,
            onOk: function() {
                self._doRefundOrder();
            },
            onCancel: function() {}
        });
        $('.ant-modal-container').addClass('order-refund-modal');
    },

    onSameRouteBtnClick: function() {
        window.location.href = `/travel/${this.props.routeid}`;
    },

    onOtherRouteBtnClick: function() {
        window.location.href = `/routes`;
    },

    onReorderBtnClick: function() {
        $.post(url.orderNew, {'routeid': this.props.routeid, 'groupid': this.props.groupid})
        .done(function(data) {
            if (data.status != 0) {
                message.error(defaultValue.newOrderMsg);
            } else {
                window.location.pathname = `${url.order}/${data.orderid}`;
            }
        })
        .fail(function() {
            message.error(defaultValue.newOrderMsg);
        });
    },

    onDownloadTravelContractBtnClick: function() {
        console.log('download contract')
    }
};

module.exports = OrderOperationHelper;
