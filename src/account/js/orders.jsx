/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Grid } from 'react-bootstrap';

import { url } from 'config';
import Rabbit from 'rabbit';
import OrderItem from './order/order';

var OrderBrief = Rabbit.create(url.orderBrief); 

var Orders = React.createClass({

    mixins: [Reflux.connect(OrderBrief.store, 'data')],

    getInitialState: function() {
        OrderBrief.actions.load();
        return {
            'data': {
                'status': 1,
                'briefOrders': []
            }
        }
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
        var ordersList = data.briefOrders.map(function(order) {
            return (
                    <OrderItem order={order} key={order.orderid}/>
            );
        });

        return (
            <Grid> 
                <div className="order-container">
                    {ordersList}
                </div>
            </Grid>
        );
    }
});

module.exports = Orders;
