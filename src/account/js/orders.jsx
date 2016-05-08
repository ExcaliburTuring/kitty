/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';

import { url } from 'config';
import Rabbit from 'rabbit';
import OrderList from './order/orders';

var OrderInfo = Rabbit.create(url.orderBrief); 

var Orders = React.createClass({

    mixins: [Reflux.connect(OrderInfo.store, 'data')],

    getInitialState: function() {
        return {
            'data': {
                'status': 1,
                'briefOrders': []
            }
        }
    },

    componentDidMount: function() {
    	 OrderInfo.actions.load({'accountid': '10001'});
    },

    render: function() {
        var data = this.state.data;
        if (data.status != 0) {
            return (
                <div>
                    <p>订单查询失败, 请联系客服： 15001028030</p>
                </div>
            );
        }
        var orders = data.briefOrders;

        var ordersList = orders.map(function(order) {
            return (
                    <OrderList order={order} key={order.orderid}/>
            );
        });

        return (
            <div className="container"> 
                <div className="order-container">
                    {ordersList}
                </div>
            </div>
        );
    }
});

module.exports = Orders;
