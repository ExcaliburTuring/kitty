/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Button,  ButtonToolbar } from 'react-bootstrap';

import AccountBaiscInfo from 'account_basicinfo';
import AccountContacts from 'account_contacts';
import AccountOrders from 'account_orders';

var Travellers = React.createClass({

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
        return (
            <div className="traveller-container section-container"> 
                <Contacts basicInfo={basicInfo} contacts={contacts}/>
                <TravellerList basicInfo={basicInfo} contacts={contacts} order={mockOrder} travellers={mockTravellers}/>
                <Button bsStyle="primary" bsSize="large" type="submit">添加出行人</Button>
            </div>
        );
    }
});

var Contacts = React.createClass({

    render: function() {
        var basicInfo = this.props.basicInfo;
        var contacts = this.props.contacts;

        var candidates = [{
            'name': basicInfo.accountInfo.name,
            'id': `checkbox-account-${basicInfo.accountInfo.accountid}`,
            'value': basicInfo.accountInfo.accountid
        }];
        if (contacts.length != 0) {
            for (var i = 0; i < contacts.length; i++) {
                var contact = contacts[i];
                candidates.push({
                    'name': contact.name,
                    'id': `checkbox-contact-${contact.contactid}`,
                    'value': contact.contactid
                })
            }
        }
        // XieZhenzong: <input>不能有子元素
        var contactsList = candidates.map(function(candidate) {
            return (
                <label className="checkbox-inline" key={candidate.id}>
                    <input type="checkbox" id={candidate.id} value={candidate.value} />
                    {candidate.name}
                </label>
            );
        });
        return (
            <div>
                <div>
                    <p>出行人信息:</p>
                </div>
                <div>
                    {contactsList}
                </div>
            </div>
        );
    }

});

var TravellerList = React.createClass({
    render: function() {
        var basicInfo = this.props.basicInfo;
        var contacts = this.props.contacts;
        var order = this.props.order;
        var travellers = this.props.travellers
        if (travellers.length == 0) {
            return (
                <div>没有出行人啊？选一个吧</div>
            );
        }
        var travellerList = travellers.map(function(traveller) {
            var accountid = traveller.accountid;
            var contactid = traveller.contactid;
            var travellerInfo = null;
            if (contactid == 0) {
                var accountInfo = basicInfo.accountInfo;
                var accountSetting = basicInfo.accountSetting;
                travellerInfo = {
                    'name': accountInfo.name,
                    'idType': accountInfo.idType,
                    'id': accountInfo.id,
                    'gender': accountSetting.gender,
                    'birthday': accountSetting.birthday,
                    'mobile': accountInfo.mobile,
                    'email': accountInfo.email,
                    'address': accountSetting.address
                };
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
                travellerInfo = {
                    'name': contact.name,
                    'idType': contact.idType,
                    'id': contact.id,
                    'gender': contact.gender,
                    'birthday': contact.birthday,
                    'mobile': contact.mobile,
                    'email': contact.email,
                    'address': contact.address
                };
            }
            return (
                <TravellerItem traveller={travellerInfo} key={traveller.travellerid}/>
            );
        });
        return (
            <div>
                {travellerList}
            </div>
        );
    }
});

var TravellerItem = React.createClass({

    render: function(){
        var traveller = this.props.traveller;
        return (
            <div className="traveller-container section-container">
                <div>{traveller.name}</div>
                <div>
                    <ButtonToolbar>
                        <Button bsStyle="primary" bsSize="large" type="submit">编辑</Button>
                        <Button bsStyle="primary" bsSize="large" type="submit">删除</Button>
                    </ButtonToolbar>
                </div>
                <hr />
                <div>
                    <p>姓名: {traveller.name}</p>
                </div>
                <div>
                    <p>id_type: {traveller.idType}</p>
                </div>
                <div>
                    <p>id: {traveller.id}</p>
                </div>
                <div>
                    <p>性别: {traveller.gender}</p>
                </div>
                <div>
                    <p>生日: {traveller.birthday}</p>
                </div>
                <div>
                    <p>手机: {traveller.mobile}</p>
                </div>
                <div>
                    <p>邮箱: {traveller.email}</p>
                </div>
                <div>
                    <p>地址: {traveller.address}</p>
                </div>
            </div>
        );
    }

});

module.exports = Travellers;