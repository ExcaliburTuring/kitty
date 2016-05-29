/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Col } from 'react-bootstrap';
import { Checkbox, message } from 'antd'; 

import AccountBasicInfo from 'account_basicinfo';
import { url } from 'config';
import Rabbit from 'rabbit';
import Contact from 'contact';
import Title from 'title';
import FaButton from 'fabutton';

import 'antd/lib/index.css';

var AccountContacts = Rabbit.create(url.contacts);

var Contacts = React.createClass({

    mixins: [
        Reflux.connect(AccountContacts.store, 'contacts')
    ],

    createAccountTraveller: function(props) {
        var accountInfo = props.accountInfo;
        var accountSetting = props.accountSetting;
        return  {
            'accountid': accountInfo.accountid,
            'contactid': 0,
            'name': accountInfo.name,
            'id': accountInfo.id,
            'idType': accountInfo.idType,
            'gender': accountSetting.gender,
            'birthday': accountSetting.birthday,
            'email': accountInfo.email,
            'mobile': accountInfo.mobile
        };
    },

    onAddBtnClick: function() {
        var newContacts = this.state.newContacts;
        newContacts.push({});
        this.setState({'newContacts': newContacts});
    },

    onNewContactMinusClick: function(index) {
        var newContacts = this.state.newContacts;
        newContacts.splice(index, 1);
        this.setState({'newContacts': newContacts});
    },

    onContactMinusClick: function(index) {
        var contact = this.state.contacts.contacts[index];
        var contactid = contact.contactid;
        var selectContacts = this.state.selectContacts;
        delete selectContacts[contactid];
        selectContactsSize = selectContactsSize - 1;
        this.setState({
            'selectContacts': selectContacts,
            'selectContactsSize': selectContactsSize 
        });
        this.props.onContactChange(selectContacts, selectContactsSize);
    },

    onAccountSuccessSubmit: function() {
        message.success('成功更新用户信息');
        AccountBasicInfo.actions.load();
    },

    onNewContactSuccessSubmit: function(index) {
        message.success("成功添加新常用出行人");
        this.onNewContactMinusClick(index);
        AccountContacts.actions.load();
    },

    onContactSuccessSubmit: function(index) {
        message.success('成功更新常用出行人');
        AccountContacts.actions.load();
    },

    onAccountChange: function(checked) {
        this.props.onAccountChange(checked, this.state.accountTraveller);
    },

    onChange: function(e, index) {
        var checked = e.target.checked;
        var contacts = this.state.contacts.contacts;
        var contact = contacts[index];
        var contactid = contact.contactid;
        var selectContacts = this.state.selectContacts;
        var selectContactsSize = this.state.selectContactsSize;
        if (checked) {
            if (selectContactsSize > this.props.quota) {
                message.warn(`本团最多还可以报${this.props.quota}人`)
                return;
            } else {
                selectContacts[contactid] = contact;
                selectContactsSize = selectContactsSize + 1;
            }
        } else {
            delete selectContacts[contactid];
            selectContactsSize = selectContactsSize - 1;
        }
        this.setState({
            'selectContacts': selectContacts,
            'selectContactsSize': selectContactsSize 
        });
        this.props.onContactChange(selectContacts, selectContactsSize);
    },

    getInitialState: function() {
        AccountContacts.actions.load();
        this.props.onAccountChange(true, this.createAccountTraveller(this.props));
        return {
           'contacts': {
                'contacts': []
           },
           'accountTraveller': this.createAccountTraveller(this.props),
           'newContacts': [],
           'selectContacts': {},
           'selectContactsSize': 0
        }
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            'accountTraveller': this.createAccountTraveller(nextProps)
        });
    },

    render: function() {
        var accountTraveller = this.state.accountTraveller;
        var contacts = this.state.contacts.contacts;
        var selectContacts = this.state.selectContacts;
        var self = this;
        var nameList = [(
            <Name 
                key={`account-${accountTraveller.accountid}`} 
                index={0} 
                name={accountTraveller.name} 
                onChange={(e)=>{self.onAccountChange(e.target.checked)}}
                checked={this.props.isAccountSelect}/>
        )];
        var contactsList = [];
        if (self.props.isAccountSelect) {
            contactsList.push((
                <Contact 
                    key={`order-account-${accountTraveller.accountid}`}
                    isAccount={true}
                    index={0}
                    contact={this.state.accountTraveller} 
                    onMinusClick={()=>{self.onAccountChange(false)}}
                    onSuccessSubmit={self.onAccountSuccessSubmit}/>
            ));
        }
        var newContactsList = [];

        if (contacts.length > 0 ) {
            for (var i = 0, n = contacts.length; i < n; i++) {
                var contact = contacts[i];
                nameList.push(
                    <Name 
                        key={`contact-${contact.contactid}`} 
                        index={i} 
                        name={contact.name} 
                        onChange={self.onChange}
                        checked={selectContacts[contact.contactid] ? true : false}/>
                );
                if (selectContacts[contact.contactid]) {
                    contactsList.push(
                        <Contact 
                            key={`order-contact-${contact.contactid}`}
                            index={i}
                            contact={contact} 
                            onMinusClick={self.onContactMinusClick}
                            onSuccessSubmit={self.onContactSuccessSubmit}/>
                    );
                }
            }
        }

        if (this.state.newContacts.length > 0 ) {
            newContactsList = this.state.newContacts.map(function(contact, index) {
                return (
                    <Contact 
                        key={`order-new-contact-${index}`}
                        index={index}
                        readOnly={false} 
                        contact={contact} 
                        onMinusClick={self.onNewContactMinusClick}
                        onSuccessSubmit={self.onNewContactSuccessSubmit}/>
                );
            });
        }

        if (newContactsList.length == 0 && contactsList.length == 0) {
            contactsList = (<div>可以选择一个常用出行人，或者点击上方加号添加一个常用出行人</div>)
        }

        return (
            <div className="order-contact-container">
                <Title title="常用出行人" className="order-contact-title">
                    <p className="order-contact-tip">本团还可报{this.props.quota}人</p>
                    <div className="order-contact-name-container">
                        {nameList}
                    </div>
                    <FaButton faClass="fa fa-plus" onClick={this.onAddBtnClick} />
                </Title>
                {newContactsList}
                {contactsList}
            </div>
        );
    }
});

var Name = React.createClass({

    render: function() {
        return (
            <label>
                <Checkbox
                    className="order-contact-name"
                    checked={this.props.checked}
                    defaultChecked={false}
                    disabled={false}
                    onChange={(e)=>{this.props.onChange(e, this.props.index);}}/>
                {this.props.name} 
            </label>
        );
    }

});

module.exports = Contacts;
