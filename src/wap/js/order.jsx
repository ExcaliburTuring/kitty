/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Image } from 'react-bootstrap';
import { Icon, Tooltip } from 'antd';

import { url, orderType, defaultValue, orderStatus, refundStatus, refundType, priceUtil } from 'config';
import Rabbit from 'rabbit';

import 'antd/lib/index.css';

var OrderBrief = Rabbit.create(url.orderBrief);
var Order = React.createClass({

    orderType: orderType.CURRENT,

    mixins: [Reflux.connect(OrderBrief.store, 'data')],

    // callback method

    onSelectOrderType: function(type) {
        if (this.orderType == type) {
            return;
        }
        OrderBrief.actions.load({'orderType': type});
        this.orderType = type;
    },

    // compoment specs

    getInitialState: function() {
        OrderBrief.actions.load({'orderType': orderType.CURRENT});
        return {
            'data': {
                'status': 1,
                'briefOrders': [],
                'currentOrderCount': 0,
                'historyOrderCount': 0,
                'allOrderCount': 0
            },
        };
    },

    render: function() {
        var data = this.state.data;
        if (data.status != 0) {
            <div>
                <p>订单查询失败, 请联系客服： {defaultValue.hotline}</p>
            </div>
        }
        var orderList = null;
        if (data.briefOrders != null && data.briefOrders.length > 0) {
            orderList = data.briefOrders.map(function(order) {
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

        return (
            <div className="order-container">
                <div className="order-header row">
                    <div className="order-count-container Afourth">
                        <span>当前：</span>
                        <a onClick={()=>{this.onSelectOrderType(orderType.CURRENT);}} className="order-count">
                            {data.currentOrderCount}
                        </a>
                    </div>
                    <div className="order-count-container Afourth">
                        <span>历史：</span>
                        <a onClick={()=>{this.onSelectOrderType(orderType.HISTORY);}} className="order-count">
                            {data.historyOrderCount}
                        </a>
                    </div>
                    <div className="order-count-container Afourth">
                        <span>所有：</span>
                        <a onClick={()=>{this.onSelectOrderType(orderType.VISIBLE);}} className="order-count">
                            {data.allOrderCount}
                        </a>
                    </div>
                </div>
                <div className="order-list">
                    {orderList}
                </div>
            </div>
        );
    }
});

var OrderItem = React.createClass({

    render: function() {
        var briefOrder = this.props.briefOrder;
        var orderInfo = briefOrder.orderInfo;
        var travelRoute = briefOrder.travelRoute;
        var travelGroup = briefOrder.travelGroup;
        return (
            <div className="order-item-container">
                <a href={`/travel/${travelRoute.routeid}`} target="_blank">
                    <Image src={travelRoute.headImg} responsive/>
                </a>

                <div className="travel-info">
                    <span className="travel-name">{travelRoute.name}</span>
                </div>
                <span className="travel-time">{travelGroup.startDate} 到 {travelGroup.endDate}</span>
                <div className="order-info">
                    <TravellerList names={briefOrder.travellerNames} keyPrefix={orderInfo.orderid}/>
                    <OrderPrice orderInfo={orderInfo} travelGroup={travelGroup}
                        policy={briefOrder.policy} code={briefOrder.code} student={briefOrder.student}/>
                    <Refund status={orderInfo.status} orderRefound={briefOrder.orderRefound}/>
                </div>

            </div>
        );
    }

});

var TravellerList = React.createClass({

    render: function() {
        var keyPrefix = this.props.keyPrefix;
        var travellers = this.props.names.map(function(name, index) {
            return (
                <span key={`${keyPrefix}-${index}`} className="traveller-name ellipsis">
                    <i className="fa fa-check-square-o" />
                    {name}
                </span>
            );
        });
        return (
            <div className="traveller-names">
                <span className="order-label">成员</span>
                {travellers}
            </div>
        );
    }
});

var OrderPrice = React.createClass({

    render: function() {
        var policy = this.props.policy;
        var code = this.props.code;
        var student = this.props.student;
        var priceTip = (
            <div>
                {this.props.travelGroup.price}
                <Icon type="cross" />
                {this.props.orderInfo.count}
            </div>
        );
        if (policy == null && code == null && student == null) {
            return (
                <div className="order-price">
                    <span className="order-label">价格</span>
                    <Tooltip placement="top" title={priceTip}>
                        <span className="price">{this.props.orderInfo.actualPrice}</span>
                    </Tooltip>
                </div>
            );
        }
        var totalDiscount = 0;
        if (policy != null) {
            totalDiscount += priceUtil.getPrice(policy.value);
        }
        if (code != null) {
            totalDiscount += priceUtil.getPrice(code.value);
        }
        if (this.props.student != null) {
            totalDiscount += priceUtil.getPrice(student.value) * this.props.orderInfo.studentCount;
        }
        var discountTip = (
            <div>
                {policy != null ? <p>{policy.desc}:减{policy.value}</p> : null }
                {code != null ? <p>优惠码{code.discountCode}:减{code.value}</p> : null }
                {student != null ? <p>学生优惠每人减{student.value},共{this.props.orderInfo.studentCount}人</p> : null }
            </div>
        );

        return (
            <div className="order-price">
                <span className="order-label">价格</span>
                <Tooltip placement="top" title={discountTip}>
                    <span className="price-before">{this.props.orderInfo.price}</span>
                </Tooltip>
                <span className="price">  {this.props.orderInfo.actualPrice}</span>
            </div>
        );
    }
});

var Refund = React.createClass({

    render: function() {
        var status = this.props.status;
        var orderRefound = this.props.orderRefound;
        if (orderRefound == null
            || (status != orderStatus.REFUNDING && status != orderStatus.REFUNDED)) {
            return null;
        }
        return (
            <div className="order-price">
                <span className="order-label">退款</span>
                <span className="price">{orderRefound.refund}</span>
                （{refundStatus.getDesc(orderRefound.status)}）
            </div>
        );
    }
});


module.exports = Order;
