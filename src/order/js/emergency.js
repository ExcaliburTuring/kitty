/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';

import AccountBaiscInfo from 'account_basicinfo';
import AccountContacts from 'account_contacts';
import AccountOrders from 'account_orders';

var Emergency = React.createClass({

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

        var emergencyInfoList = mockTravellers.map(function(traveller) {
        	var accountid = traveller.accountid;
            var contactid = traveller.contactid;
            var emergencyInfo = null;
        	if (contactid == 0) {
        		emergencyInfo = {
        			'name': basicInfo.accountInfo.name,
        			'emergencyContact': basicInfo.accountSetting.emergencyContact,
        			'emergencyMobile': basicInfo.accountSetting.emergencyMobile
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
                emergencyInfo = {
        			'name': contact.name,
        			'emergencyContact': contact.emergencyContact,
        			'emergencyMobile': contact.emergencyMobile
        		}
        	}
        	return (
        		<Item emergencyInfo={emergencyInfo} key={traveller.travellerid}/>
        	)
        });
        return (
            <div className="emergency-container section-container"> 
                <h3>紧急联系人</h3>
                {emergencyInfoList}
            </div>
        );
    }
});

var Item = React.createClass({

	render: function() {
		var emergencyInfo = this.props.emergencyInfo;
		return (
			<div>
				<div>
					<p>姓名：{emergencyInfo.name}</p>
				</div>
				<div>
					<p>紧急联系人姓名：{emergencyInfo.emergencyContact}</p>
				</div>
				<div>
					<p>紧急联系人电话：{emergencyInfo.emergencyMobile}</p>
				</div>
			</div>
		);
	}

});

module.exports = Emergency;