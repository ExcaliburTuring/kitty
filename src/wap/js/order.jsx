/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Tabs, WhiteSpace, WingBlank, Button, Toast, Modal } from 'antd-mobile';
const TabPane = Tabs.TabPane;
const alert = Modal.alert;

import { url, orderType, defaultValue, orderStatus, refundStatus, refundType, priceUtil } from 'config';
import Rabbit from 'rabbit';
import square from '../img/54.png';

import 'antd/lib/index.css';

var OrderBrief = Rabbit.create(url.orderBrief);
var OrderBriefHistory = Rabbit.create(url.orderBrief);
var OrderBriefVisible = Rabbit.create(url.orderBrief);
var Order = React.createClass({

    mixins: [
        Reflux.connect(OrderBrief.store, 'data'),
        Reflux.connect(OrderBriefHistory.store, 'history'),
        Reflux.connect(OrderBriefVisible.store, 'visible')
    ],

    _createOrderList: function(briefOrders) {
        var orderList = null;
        if (briefOrders && briefOrders.length) {
            orderList = briefOrders.map(function(order) {
                return (
                        <OrderItem briefOrder={order} key={order.orderInfo.orderid}/>
                );
            });
        } else {
            orderList = (
                <div className="no-result">
                    <p>暂时没有任何订单</p>
                </div>
            );
        }
        return orderList;
    },

    // callback method

    onSelectOrderType: function(type) {
        this.setState({'orderType': type});
    },

    // compoment specs

    getInitialState: function() {
        OrderBrief.actions.load({'orderType': orderType.CURRENT});
        OrderBriefHistory.actions.load({'orderType': orderType.HISTORY});
        OrderBriefVisible.actions.load({'orderType': orderType.VISIBLE});
        return {
            'data': {
                'status': 1,
                'briefOrders': [],
                'currentOrderCount': 0,
                'historyOrderCount': 0,
                'allOrderCount': 0
            },
            'history': {
                'briefOrders': []
            },
            'visible': {
                'briefOrders': []
            },
            'orderType': this.props.orderType
        };
    },

    componentWillReceiveProps: function(newProps) {
        if (newProps.orderType != this.state.orderType) {
            this.setState({'orderType': newProps.orderType})
        }
    },

    render: function() {
        var currentOrderList = this._createOrderList(this.state.data.briefOrders);;
        var historyOrderList = this._createOrderList(this.state.history.briefOrders);
        var visibleOrderList = this._createOrderList(this.state.visible.briefOrders);
        return (
            <div className="orders-container">
                <Tabs activeKey={`${this.state.orderType}`} onTabClick={this.onSelectOrderType}
                    onChange={this.onSelectOrderType}>
                    <TabPane tab="当前订单" key={`${orderType.CURRENT}`}>
                        <div className="order-list">
                            {currentOrderList}
                        </div>
                    </TabPane>
                    <TabPane tab="历史订单" key={`${orderType.HISTORY}`}>
                        <div className="order-list">
                            {historyOrderList}
                        </div>
                    </TabPane>
                    <TabPane tab="所有订单" key={`${orderType.VISIBLE}`}>
                         <div className="order-list">
                            {visibleOrderList}
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
});

var OrderItem = React.createClass({

    onClick: function() {
        var orderInfo = this.props.briefOrder.orderInfo;
        window.location.href = `${url.order}/${orderInfo.orderid}`;
    },

    render: function() {
        var briefOrder = this.props.briefOrder;
        var orderInfo = briefOrder.orderInfo;
        var travelRoute = briefOrder.travelRoute;
        var travelGroup = briefOrder.travelGroup;
        return (
            <div className="order-item-container" onClick={this.onClick}>
                <div className="order-item-title clearfix">
                    <p className="pull-left">订单编号：{orderInfo.orderNo}</p>
                    <p className="pull-right travel-status">{orderStatus.getDesc(orderInfo.status)}</p>
                </div>
                <div className="order-item-body clearfix">
                    <div className="travel-img pull-left" style={{backgroundImage: `url(${travelRoute.headImg})`}} >
                        <img src={square} className="img-responsive"/>
                    </div>
                    <div className="travel-info pull-left">
                        <p className="travel-name ellipsis fixed">{`【${travelRoute.name}】${travelRoute.title}`}</p>
                        <TravellerList names={briefOrder.travellerNames} keyPrefix={orderInfo.orderid}/>
                        <p className="travel-time">日期：{travelGroup.startDate} ~ {travelGroup.endDate}</p>
                    </div>
                </div>
                <div className="order-item-footer clearfix">
                    <OrderPrice orderInfo={orderInfo} travelGroup={travelGroup}/>
                    <OrderOperation orderInfo={orderInfo}/>
                </div>
            </div>
        );
    }
});

var TravellerList = React.createClass({

    render: function() {
        var keyPrefix = this.props.keyPrefix;
        var length = this.props.names.length - 1;
        var travellers = this.props.names.map(function(name, index) {
            return (
                <span key={`${keyPrefix}-${index}`} className="traveller-name ellipsis">
                    {name} {index >= length ? '': ',' }
                </span>
            );
        });
        return (
            <div className="traveller-names">
                <span className="order-label">成员：</span>
                {travellers}
            </div>
        );
    }
});

var OrderPrice = React.createClass({

    render: function() {
        var orderInfo = this.props.orderInfo;
        if (orderInfo.actualPrice == '￥0') {
            return null;
        }
        return (
            <div className="order-price pull-left">
                <span className="order-label">价格:</span>
                <span className="actual-price">{orderInfo.actualPrice}</span>
            </div>
        );
    }
});

var OrderOperation = React.createClass({

    _doCancelOrder: function(orderInfo) {
        $.ajax({
            url: url.orderOrder,
            type: 'post',
            data: {'orderid': orderInfo.orderid, '_method': 'delete'}
        }).done(function(data) {
            if (data.status != 0) {
                Toast.error(defaultValue.cancelOrderMsg);
            } else {
                Toast.success('取消订单成功');
                setTimeout('location.reload(true);', 300);
            }
        }).fail(function() {
            Toast.error(defaultValue.cancelOrderMsg);
        });
    },

    _doRefundOrder: function(orderInfo) {
        $.ajax({
            url: url.orderRefund,
            type: 'post',
            data: {'orderid': orderInfo.orderid, 'desc': '通过手机端申请退款'}
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

    onClick: function(e) {
        var orderInfo = this.props.orderInfo;
        var status = orderInfo.status;
        if (status == orderStatus.PAYING){
            e.stopPropagation();
            var self = this;
            alert('取消订单？', `如果您对路线有疑问或建议或想修改订单，欢迎直接致电海逍遥:${defaultValue.hotline}`, [
                {
                    text: '再考虑下',
                    onPress: () => {}
                },
                { 
                    text: '确定取消',
                    onPress: function() {
                        self._doCancelOrder(orderInfo);
                    }
                },
            ]);
        } else if (status == orderStatus.PAID) {
            e.stopPropagation();
            var self = this, refundTypeInfo = null;
            $.ajax({
                'url': url.orderRefundType + `?orderid=${orderInfo.orderid}`,
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
                        self._doRefundOrder(orderInfo);
                    }
                }]
            );
        }
    },

    render: function() {
        var status = this.props.orderInfo.status;
        var text = status == orderStatus.PAYING ? '取消' 
                    : status == orderStatus.PAID ? '退款' : '查看'; 
        return (
            <div className="oder-operation pull-right">
                {
                    status == orderStatus.WAITING
                    ? <form className="pull-right" inline onSubmit={(e)=>{e.stopPropagation()}} action="/order/pay" method="GET">
                        <input type="hidden" name="orderid" value={this.props.orderInfo.orderid}></input>
                        <input type="hidden" name="payType" value="1"></input>
                        <Button className="first-btn" inline htmlType="submit" size="small">
                            支付
                        </Button>
                    </form>
                    : <Button inline onClick={this.onClick} size="small">
                        {text}
                    </Button>
                }
            </div>
        );
    }
})

module.exports = Order;
