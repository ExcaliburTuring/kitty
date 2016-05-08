/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';

import { url } from 'config';
import Rabbit from 'rabbit';
import UnpayedList from './order/unpayeds';

var OrderInfo = Rabbit.create(url.orderBrief); 

var Orders = React.createClass({

    mixins: [Reflux.connect(OrderInfo.store, 'data')],

    getInitialState: function() {
        return {
            'data': {
                'status': 1,
                'orders': []
            }
        }
    },

    componentDidMount: function() {
    	 OrderInfo.actions.load({'accountid': 1});
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
        var orders = data.orders;

        var ordersList = orders.map(function(order) {
            return (
                <Item order={order} key={order.orderid}/>
            );
        });

        return (
            <div className="container"> 
                {ordersList}
            </div>
        );
    }
});

var Item = React.createClass({

    render: function() {
        var order = this.props.order;
        return (
            <div className="order-container">
                <UnpayedList order={order}/>
            </div>
        );
    }
});

module.exports = Orders;
