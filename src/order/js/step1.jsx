/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Alert, Checkbox, message, Tooltip } from 'antd';

import AccountBasicInfo from 'account_basicinfo';
import { url, accountStatus } from 'config';
import Rabbit from 'rabbit';
import Contact from 'contact';
import Title from 'title';
import FaButton from 'fabutton';

import 'antd/lib/index.css';

var AccountContacts = Rabbit.create(url.contacts);

var Step1 = React.createClass({

     mixins: [
        Reflux.connect(AccountContacts.store, 'contacts')
    ],

    onAddBtnClick: function() {
        var newContact = this.state.newContact;
        if (newContact != null) {
            message.warn('您有一个新建的联系人还没有添加完毕，请先完成添加！');
        } else {
            this.setState({'newContact': {}});
        }
    },

    onNewContactMinusClick: function() {
        this.setState({'newContact': null});
    },

    onContactMinusClick: function(index) {
        var contact = this.state.contacts.contacts[index];
        var contactid = contact.contactid;
        var selectContacts = this.state.selectContacts;
        var selectContactsSize = this.state.selectContactsSize - 1;
        delete selectContacts[contactid];
        this.setState({
            'selectContacts': selectContacts,
            'selectContactsSize': selectContactsSize 
        });
    },

    onAccountSuccessSubmit: function() {
        message.success('成功更新用户信息');
        AccountBasicInfo.actions.load();
    },

    onNewContactSuccessSubmit: function(index) {
        message.success("成功添加新常用出行人");
        this.onNewContactMinusClick();
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
                message.warn(`本团最多还可以报${this.props.quota}人`);
                return;
            } else if (selectContactsSize > 5) {
                message.warn('每个订单最多可以报5人');
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
    },

    onNextBtnClick: function() {
        this.props.onNextBtnClick(this.convertSelectContacts(this.state.selectContacts));
    },

    convertTravellers: function(travellers) {
        var selectContacts = {};
        if (travellers.length > 0) {
            for (var i = 0; i < travellers.length; i++) {
                var traveller = travellers[i];
                selectContacts[traveller.contactid] = traveller;
            }
        }
        return selectContacts;
    },

    convertSelectContacts: function(selectContacts) {
        var travellers = [];
        if (selectContacts != null) {
            for (var contactid in selectContacts) {
                travellers.push(selectContacts[contactid]);
            }
        }
        return travellers;
    },

    getInitialState: function() {
        AccountContacts.actions.load();
        return {
            'contacts': {
                'contacts': []
            },
            'newContact': null,
            'accountTraveller': this.props.accountTraveller,
            'selectContacts': this.convertTravellers(this.props.travellers),
            'selectContactsSize': this.props.travellers.length
        };
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            'accountTraveller': nextProps.accountTraveller
        })
    },

    render: function() {
        var accountTraveller = this.state.accountTraveller;
        var contacts = this.state.contacts.contacts;
        var selectContacts = this.state.selectContacts;
        var self = this;
        var newAccountTip = null, nameList = [], contactsList = [], newContact = [], addBtnTip = null;
        if (accountTraveller != null) {
            nameList.push(
                <Name 
                    key={`account-${accountTraveller.accountid}`} 
                    index={0} 
                    name={accountTraveller.name == null ? '您自己' : accountTraveller.name} 
                    onChange={(e)=>{self.onAccountChange(e.target.checked)}}
                    checked={this.props.isAccountSelect}/>
            );

            if (self.props.isAccountSelect) {
                if (accountTraveller.status == accountStatus.WAIT_COMPLETE_INFO) {
                    newAccountTip = (
                        <Alert message="新用户提醒信息"
                            description="您还是新用户，强烈建议您完善个人信息，方便以后下单。"
                            type="info"
                            closable/>
                    );
                }
                contactsList.push(
                    <Contact 
                        key={`order-account-${accountTraveller.accountid}`}
                        isAccount={true}
                        index={0}
                        contact={this.state.accountTraveller} 
                        onMinusClick={()=>{self.onAccountChange(false)}}
                        onSuccessSubmit={self.onAccountSuccessSubmit}/>
                );
            }
        }

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

        if (this.state.newContact != null ) {
            addBtnTip = '您有一个新建的联系人正在编辑中，请先完成添加！';
            newContact = (
                <Contact 
                    key="order-new-contact"
                    readOnly={false} 
                    contact={this.state.newContact} 
                    onMinusClick={self.onNewContactMinusClick}
                    onSuccessSubmit={self.onNewContactSuccessSubmit}/>
            );
        } else {
            addBtnTip = '添加一个联系人到您的帐户中，方便以后下单使用!'
        }

        if (newContact == null && contactsList.length == 0) {
            contactsList = (<div>可以选择一个常用出行人，或者点击上方加号添加一个常用出行人</div>)
        }

        return (
            <div className="order-step1">
                <div className="order-contact-container">
                    <Title title="常用出行人" className="order-contact-title">
                        <p className="order-contact-tip">本团还可报{this.props.quota}人</p>
                        <div className="order-contact-name-container">
                            {nameList}
                        </div>
                        <Tooltip placement="top" title={addBtnTip}>
                            <FaButton faClass="fa fa-plus" onClick={this.onAddBtnClick} />
                        </Tooltip>
                    </Title>
                    {newAccountTip}
                    {newContact}
                    {contactsList}
                </div>
                <div className="submit pull-right">
                    <Agreement 
                        isAgreed={this.props.isAgreed}
                        onAgreementCheck={this.props.onAgreementCheck} />
                    <Button 
                        bsStyle="primary"
                        bsSize="large" 
                        type="submit" 
                        onClick={this.onNextBtnClick}>下一步</Button>
                </div>
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

var Agreement = React.createClass({

    render: function() {
        var text = this.props.isAgreed ? '我已经同意安全协议' : '同意安全协议';
        return (
            <label>
                <Checkbox
                    defaultChecked={this.props.isAgreed} 
                    onChange={ this.props.onAgreementCheck}/>
                {text}
            </label>
        );
    }

});

module.exports = Step1;
