/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Image } from 'react-bootstrap';
import { Icon, Tooltip } from 'antd';

import { Tabs, WhiteSpace } from 'antd-mobile';

import { url, orderType, defaultValue, orderStatus, refundStatus, refundType, priceUtil } from 'config';
import Rabbit from 'rabbit';

import 'antd/lib/index.css';

function callback(key) {
  console.log(key);
}

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
        const TabPane = Tabs.TabPane;
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
                <div className="order-header">
                    <Tabs defaultActiveKey="1" onChange={callback}>
                      <TabPane tab="所有订单" key="1">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 100 }}>
                            {data.allOrderCount}
                        </div>
                      </TabPane>
                      <TabPane tab="当前订单" key="2">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 100 }}>
                            {data.currentOrderCount}
                        </div>
                      </TabPane>
                      <TabPane tab="历史订单" key="3">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 100 }}>
                            {data.historyOrderCount}
                        </div>
                      </TabPane>
                    </Tabs>
                    <WhiteSpace />
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
                <div className="travel-img">
                    <a href={`/travel/${travelRoute.routeid}`} target="_blank">
                        <Image src={travelRoute.headImg} responsive/>
                    </a>
                </div>
                <div className="travel-info">
                    <p className="travel-name">{travelRoute.name}</p>
                    <p className="travel-time">{travelGroup.startDate} 到 {travelGroup.endDate}</p>
                    <TravellerList names={briefOrder.travellerNames} keyPrefix={orderInfo.orderid}/>
                    <OrderPrice orderInfo={orderInfo} travelGroup={travelGroup}
                        policy={briefOrder.policy} code={briefOrder.code} student={briefOrder.student}/>
                    <Refund status={orderInfo.status} orderRefound={briefOrder.orderRefound}/>
                </div>
                <div className="other-info">
                    <p className="travel-status">已付款</p>
                    <div className="buttons">查看</div>
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
                    {name} 
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
