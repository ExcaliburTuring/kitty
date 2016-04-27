/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';

import AccountBaiscInfo from 'account_basicinfo';
import AccountContacts from 'account_contacts';
import AccountOrders from 'account_orders';

var Roommate = React.createClass({

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
        var mockTravellers = order.travellers[mockOrder.orderid] // 假装取到订单的出行人列表

        var roommateList = mockTravellers.map(function(traveller) {
            var accountid = traveller.accountid;
            var contactid = traveller.contactid;
            var roommateInfo = null;
            if (contactid == 0) {
                roommateInfo = {
                    'name': basicInfo.accountInfo.name,
                    'roommate': traveller.roommate,
                }
            } else {
                var contact = null;
                for (var i = 0; i < contacts.length; i++) {
                    contact = contacts[i];
                    if (contact.contactid = contactid) {
                        break;
                    }
                }
                if (contact == null) {
                    return (
                        <div>找不到这个人{contactid}</div>
                    );
                }
                roommateInfo = {
                    'name': contact.name,
                    'roommate': traveller.roommate
                }
            }
            return (
                <Item roommateInfo={roommateInfo} key={traveller.travellerid}/>
            )
        });
        return (
            <div className="roommate-container section-container"> 
                <h3>房间安排</h3>
                {roommateList}
            </div>
        );
    }
});

var Item = React.createClass({

    render: function() {
        var roommateInfo = this.props.roommateInfo;
        return (
            <div>
                <div>
                    <p>姓名：{roommateInfo.name}</p>
                </div>
                <div>
                    <p>有自己的睡友：{roommateInfo.roommate}</p>
                </div>
            </div>
        );
    }

});

module.exports = Roommate;