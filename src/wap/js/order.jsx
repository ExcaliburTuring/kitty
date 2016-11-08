/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Tabs, WhiteSpace, WingBlank, Button } from 'antd-mobile';
const TabPane = Tabs.TabPane;

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

    onImgClick: function(e) {
        e.stopPropagation();
        var travelRoute = this.props.briefOrder.travelRoute;
        window.location.href = `${url.travel}/${travelRoute.routeid}`;
    },

    render: function() {
        var briefOrder = this.props.briefOrder;
        var orderInfo = briefOrder.orderInfo;
        var travelRoute = briefOrder.travelRoute;
        var travelGroup = briefOrder.travelGroup;
        var bg = {
            backgroundImage: `url(${travelRoute.headImg})`
        };
        return (
            <div className="order-item-container" onClick={this.onClick}>
                <div className="order-item-title clearfix">
                    <p className="pull-left">订单号：{orderInfo.orderid}</p>
                    <p className="pull-right travel-status">{orderStatus.getDesc(orderInfo.status)}</p>
                </div>
                <div className="order-item-body clearfix">
                    <div className="travel-img pull-left" style={bg} onClick={this.onImgClick}>
                        <img src={square}/>
                    </div>
                    <div className="travel-info pull-left">
                        <p className="travel-name ellipsis">【{travelRoute.name}】{travelRoute.title}</p>
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
        if (orderInfo.status == orderStatus.REFUNDING 
            || orderInfo.status == orderStatus.REFUNDED
            || orderInfo.actualPrice == '￥0') {
            return null;
        }
        return (
            <div className="order-price pull-left">
                <span className="order-label">价格:</span>
                {
                    orderInfo.price == orderInfo.actualPrice
                    ? null
                    : <span className="price">{orderInfo.price}</span>
                }
                <span className="actual-price">{orderInfo.actualPrice}</span>
            </div>
        );
    }
});

var OrderOperation = React.createClass({

    btnText: {
        1: '支付',
        2: '取消订单',
        3: '退款'
    },

    _doCancelOrder: function(orderInfo) {
        var self = this;
        $.ajax({
            url: url.orderOrder,
            type: 'post',
            data: {'orderid': orderInfo.orderid, '_method': 'delete'}
        }).done(function(data) {
            if (data.status != 0) {
                Toast.error(defaultValue.cancelOrderMsg);
            } else {
                setTimeout('location.reload(true);', 300);
            }
        }).fail(function() {
            Toast.error(defaultValue.cancelOrderMsg);
        });
    },

    _doRefundOrder: function(orderInfo) {

    },

    onClick: function(e) {
        e.stopPropagation();
        var orderInfo = this.props.orderInfo;
        var status = orderInfo.status;
        if (status == orderStatus.WAITING) {
            // XieZhenzong: 微信支付
        } else if (status == orderStatus.PAYING){
            this._doCancelOrder(orderInfo);
        } else if (status == orderStatus.PAID) {
            this._doRefundOrder(orderInfo);
        }
    },

    render: function() {
        var status = this.props.orderInfo.status
        if (status != orderStatus.WAITING
                && status != orderStatus.PAYING
                && status != orderStatus.PAID) {
            return null;
        }
        return (
            <div className="oder-operation pull-right">
                <Button inline onClick={this.onClick} size="small">
                    {this.btnText[status]}
                </Button>
            </div>
        );
    }
})

module.exports = Order;
