/**
 * @author xiezhenzong
 */
import React from 'react';
import { Modal, Input, message } from 'antd';

import { url, orderStatus, defaultValue } from 'config';

import 'antd/lib/index.css';

var OrderOperationHelper = {

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

    _doRefundOrder: function() {
        var desc = $("#refund-reason-input").val();
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

    // callback method

    onCancelOrderBtnClick: function() {
        var self = this;
        Modal.confirm({
            title: '删除订单',
            content: `您是否确认要删除这个订单?如果您对我们的路线有疑问或建议，欢迎直接致电我们客服:${defaultValue.hotline}`,
            onOk: function() {
                self._doCancelOrder();
            },
            onCancel: function() {}
        });
    },

    onRefundOrderBtnClick: function() {
        var self = this;
        var refundModalContent = (
            <div>
                <p>{`如果您对订单不满意或者因某些原因想重新下订单可直接联系我们客服: ${defaultValue.hotline}，并且申请退款有可能不能全额返还的哦，参考退款政策。`}</p>
                <Input id="refund-reason-input" placeholder="请输入您申请退款的理由"></Input>
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
    },

    onSameRouteBtnClick: function() {
        window.location.href = `/travel/${this.props.routeid}`;
    },

    onOtherRouteBtnClick: function() {
        window.location.href = `/routes`;
    }
};

module.exports = OrderOperationHelper;
