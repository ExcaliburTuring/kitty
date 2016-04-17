/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';

import AccountBaiscInfo from 'account_basicinfo';
import AccountContacts from 'account_contacts';
import AccountOrders from 'account_orders';

var Discount = React.createClass({

    mixins: [
        Reflux.connect(AccountBaiscInfo.store, 'basicInfo'),
        Reflux.connect(AccountContacts.store, 'contacts'),
        Reflux.connect(AccountOrders.store, 'order')
    ],

    getInitialState: function() {
        return {
            'basicInfo': {
                'login': false
            },
            'contacts': [],
            'order': {
                'status': 1,
                'orders': [],
                'travellers': {}
            }
        }
    },

    componentDidMount: function() {
        AccountBaiscInfo.actions.get();
        AccountContacts.actions.get();
        AccountOrders.actions.get();
    },

    render: function() {
        var basicInfo = this.state.basicInfo;
        var contacts = this.state.contacts;
        var order = this.state.order;
        if (!basicInfo.login || contacts.length == 0 || order.status !=0) {
            return (
                <div></div>
            );
        }
        var mockOrder = order.orders[1]; // 假装只取到一个订单，因为应该是有orderid的，
        var mockDiscount = order.discounts[mockOrder.orderid] // 假装取到打折信息

        var discountList = mockDiscount.map(function(discount) {
            return (
                <Item discount={discount} key={discount.discountid}/>
            )
        });
        return (
            <div className="discount-container section-container"> 
                <h3>优惠</h3>
                <p>总价：{mockOrder.price}</p>
                {discountList}
                <p>实际：{mockOrder.actualPrice}</p>
            </div>
        );
    }
});

var Item = React.createClass({

    render: function() {
        var discount = this.props.discount;
        return (
            <div>
                <div>
                    <p>优惠类型：{discount.type}</p>
                </div>
                <div>
                    <p>优惠码：{discount.discountCode}</p>
                </div>
                <div>
                    <p>优惠价格：{discount.discountPrice}</p>
                </div>
            </div>
        );
    }

});


module.exports = Discount;