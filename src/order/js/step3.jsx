/**
 * @author xiezhenzong 
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
import { Table, Form, Button, Modal, Input, message } from 'antd';

import { url, idType, priceUtil, orderStatus, defaultValue } from 'config';
import Title from 'title';

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
}];

const _discountTableColumn = [{
    'title': '支付与优惠信息',
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
                'roomate': traveller.roomate ? traveller.roomate : '服从安排'
            };
        });
    },

    getInitialState: function() {
        return {
        }
    },

    render: function() {
        return (
            <div className="order-step3">
                <Title title="订单详情" className="order-content-title">
                    <p className="order-status-tip">
                        订单状态:
                        <span className="order-status">
                            {orderStatus.getDesc(this.props.orderInfo.status)}
                        </span>
                    </p>
                    <OrderTip 
                        orderStatus={this.props.orderInfo.status}
                        timeLeft={this.props.timeLeft} />
                </Title>
                <div className="step3-section">
                    <h3>参加旅行的人</h3>
                    <Table
                        columns={_travellerTableColumn}
                        dataSource={this.getTravellersTableData()}
                        bordered 
                        pagination={false} />
                </div>
                <div className="step3-section">
                    <h3>支付金额和优惠</h3>
                    <Discount 
                        orderInfo={this.props.orderInfo} 
                        policy={this.props.policy}
                        code={this.props.code}
                        student={this.props.student}/>
                </div>
                <div className="step3-section">
                    <h3>紧急联系人</h3>
                    <div>未设置紧急联系人</div>
                </div>
                <Refund orderRefound={this.props.orderRefound} />
                <OrderOperation orderInfo={this.props.orderInfo} />
            </div>
        );
    }
});

var OrderTip = React.createClass({

    _countdown: function() {
        this.setState({
            'timeLeft': this.state.timeLeft - 1
        });
    },

    getInitialState: function() {
        return {
            'timeLeft': this.props.timeLeft
        };
    },

    componentDidMount: function() {
        this._countdown();
        setInterval(this._countdown, 1000);
    },

    render: function() {
        if (this.props.orderStatus == orderStatus.WAITING) {
            var timeLeft = this.state.timeLeft;
            var hour = Math.floor(timeLeft / 3600);
            var minute = Math.floor((timeLeft - hour * 3600) / 60);
            var second = timeLeft - hour * 3600 - minute * 60;

            return (
                <p className="order-tip">还剩余：
                    <span className="order-countdown">{hour}</span>小时
                    <span className="order-countdown">{minute}</span>分钟
                    <span className="order-countdown">{second}</span>秒
                </p>
            );
        } else {

        }
        return null;
    }

});

var Discount = React.createClass({

    getDiscountTableData: function() {
        var tableData = [];
        tableData.push({
            'key': 'order-price',
            'discountName': '订单金额',
            'discountDesc': `共${this.props.orderInfo.count}人出行`,
            'discountPrice': this.props.orderInfo.price
        });
        if (this.props.policy != null) {
            tableData.push({
                'key': 'order-step3-discount-1',
                'discountName': '优惠政策',
                'discountDesc': this.props.policy.desc,
                'discountPrice': this.props.policy.value
            });
        }
        if (this.props.code != null) {
            tableData.push( {
                'key': 'order-step3-discount-2',
                'discountName': '优惠码优惠',
                'discountDesc': '优惠码： ' + this.props.code.discountCode,
                'discountPrice': this.props.code.value
            });
        }
        if (this.props.orderInfo.studentCount > 0) {
            tableData.push( {
                'key': 'order-step3-discount-3',
                'discountName': '学生优惠',
                'discountDesc': `共有${this.props.orderInfo.studentCount}名学生`,
                'discountPrice': priceUtil.getPriceStr(priceUtil.getPrice(this.props.student.value) * this.props.orderInfo.studentCount)
            });
        }
        tableData.push({
            'key': 'order-actual-price',
            'discountName': '实际支付',
            'discountDesc': '',
            'discountPrice': this.props.orderInfo.actualPrice
        });
        return tableData;
    },

    getFooter: function() {
        var totalDiscount = 0;
        if (this.props.policy != null) {
            totalDiscount += priceUtil.getPrice(this.props.policy.value);
        }
        if (this.props.code != null) {
            totalDiscount += priceUtil.getPrice(this.props.code.value);
        }
        if (this.props.student != null) {
            totalDiscount += priceUtil.getPrice(this.props.student.value) * this.props.orderInfo.studentCount;
        }
        return `实际共优惠了：${priceUtil.getPriceStr(totalDiscount)}`;
    },

    render: function() {
        if (this.props.policy == null && this.props.code == null && this.props.student == null) {
            return (
                <div> 本订单不享受任何折扣</div>
            );
        } else {
            return (
                <Table
                    columns={_discountTableColumn} 
                    dataSource={this.getDiscountTableData()} 
                    bordered 
                    pagination={false}
                    footer={this.getFooter} />
            );
        }
    }
});

var Refund = React.createClass({

    render: function() {
        var content = null;
        if (this.props.orderRefound == null) {
            content = (<div>本订单暂无任何退款信息</div>);
        } else {
            content = (<div>这里是退款信息</div>); // FIXME
        }

        return (
            <div className="step3-section">
                <h3>退款信息</h3>
                {content}
            </div>
        );
    }
});

var OrderOperation = React.createClass({

    // help method
    _doCancelOrder: function() {
        var self = this;
        $.ajax({
            url: url.orderOrder,
            type: 'post',
            data: {'orderid': this.props.orderInfo.orderid, '_method': 'delete'}
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
        var desc = $("#refund-reason-input").text();
        var self = this;
        $.ajax({
            url: url.orderRefund,
            type: 'post',
            data: {'orderid': this.props.orderInfo.orderid, 'desc': desc}
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
            content: refundModalContent,
            onOk: function() {
                self._doRefundOrder();
            },
            onCancel: function() {}
        });
    },

    render: function() {
        var status = this.props.orderInfo.status;
        var operationGroup = null;
        if (status == orderStatus.WAITING) {
            operationGroup = (
                <div className="order-operation">
                    <Form inline onSubmit={()=>{}} action="/order/pay" method="GET" target="_blank">
                        <input type="hidden" name="orderid" value={this.props.orderInfo.orderid}></input>
                        <Button type="primary" htmlType="submit">
                            马上支付
                        </Button>
                    </Form>
                    <Button type="primary" onClick={this.onCancelOrderBtnClick}>
                        取消订单
                    </Button>
                    <Button type="primary">
                        下载合同
                    </Button>
                </div>
            );
        } else if (status == orderStatus.PAID) {
            operationGroup = (
                <div className="order-operation">
                    <Button type="primary" onClick={this.onRefundOrderBtnClick}>
                        订单退款
                    </Button>
                    <Button type="primary">
                        查看其它路线
                    </Button>
                </div>
            );
        } else {
            return null;
        }
        return (
            <div className="order-operation-container">
                {operationGroup}
            </div>
        );
    }
});

module.exports = Step3;
