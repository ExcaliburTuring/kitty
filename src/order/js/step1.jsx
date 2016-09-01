/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { Row, Col } from 'react-bootstrap';
import { Alert, Checkbox, Icon, Button, message } from 'antd';

import AccountBasicInfo from 'account_basicinfo';
import { url, accountStatus } from 'config';
import Rabbit from 'rabbit';
import Contact from 'contact';
import Title from 'title';
import { NewModal, NewBtn } from 'new';

import 'antd/lib/index.css';

var AccountContacts = Rabbit.create(url.contacts);

var Step1 = React.createClass({

    mixins: [
        Reflux.connect(AccountBasicInfo.store, 'basicInfo'),
        Reflux.connect(AccountContacts.store, 'data')
    ],

    // api method

    getSelectTravellers: function() {
        return this.state.selectTravellers;
    },

    // helper method

    _createTravellers: function() {
        var accountTraveller = this._createAccountTraveller(this.state.basicInfo.accountInfo);
        var contacts = this._copyArray(this.state.data.contacts);
        if (contacts.length == 0) {
            return [accountTraveller];
        } else {
            contacts.unshift(accountTraveller);
            return contacts;
        }
    },

    _createAccountTraveller: function(accountInfo) {
        return {
            'accountid': accountInfo.accountid,
            'contactid': 0,
            'name': accountInfo.name,
            'id': accountInfo.id,
            'idType': accountInfo.idType,
            'gender': accountInfo.gender,
            'birthday': accountInfo.birthday,
            'email': accountInfo.email,
            'mobile': accountInfo.mobile
        };
    },

    _copyArray: function(array) {
        if (!array) {
            return [];
        }
        var copy = [];
        for (var i = 0, n = array.length; i < n; i++) {
            copy.push(array[i]);
        }
        return copy;
    },

    _createSelectTravellers: function() {
        var travellers = this.state.selectTravellers;
        var selectTravellers = {};
        for (var i = travellers.length - 1; i >= 0; i--) {
            var traveller = travellers[i];
            selectTravellers[`${traveller.accountid}-${traveller.contactid}`] = traveller;  
        }
        return selectTravellers;
    },

    _createNameList: function(travellers, selectTravellers) {
        var self = this, nameList = [];
        for (var i = 0, n = travellers.length; i < n; i++) {
            var traveller = travellers[i];
            var checked = selectTravellers.hasOwnProperty(`${traveller.accountid}-${traveller.contactid}`);
            nameList.push(
                <Name 
                    key={`travellers-name-list-${i}`} 
                    traveller={traveller}
                    name={traveller.name == null ? '您自己' : traveller.name} 
                    onChange={self.onNameChange}
                    checked={checked}/>
            );
        }
        return nameList;
    },

    _createContactsList: function(travellers, selectTravellers) {
        var self = this, contactsList = [];
        for (var i = 0, n = travellers.length; i < n; i++) {
            var traveller = travellers[i];
            var checked = selectTravellers.hasOwnProperty(`${traveller.accountid}-${traveller.contactid}`);
            if (checked) {
                contactsList.push(
                    <Col key={`select-travellers-list-${i}`} md={4}>
                        <Contact contact={traveller} onEditBtnClick={self.onEditBtnClick}/>
                    </Col>
                );
            }
        }
        return contactsList;
    },

    // callback method

    onNameChange: function(e, traveller) {
        var selectTravellers = this.state.selectTravellers;
        var size = selectTravellers.length;
        if (e.target.checked) {
            if (size >= this.props.quota) {
                message.warn(`本团最多还可以报${this.props.quota}人`);
                return;
            } else if (size >= 5) {
                message.warn('每个订单最多可以报5人');
                return;
            } else {
                selectTravellers.push(traveller);
            }
        } else {
            for (var i = selectTravellers.length - 1; i >= 0; i--) {
                var t = selectTravellers[i];
                if (t.accountid == traveller.accountid 
                    && t.contactid == traveller.contactid) {
                    selectTravellers.splice(i, 1);
                    break;
                }
            }
        }
        this.setState({'selectTravellers': selectTravellers});
    },

    onNewBtnClick: function() {
        this.setState({'contact': null, 'title': '添加出行人'});
        this.refs.newModal.toggleVisiable();
    },

    onEditBtnClick: function(contact) {
        this.setState({'contact': contact, 'title': '编辑出行人'});
        this.refs.newModal.toggleVisiable();
    },

    onHandleOk: function() {
        message.success("成功更新常用出行人");
        AccountBasicInfo.actions.load();
        AccountContacts.actions.load();
        this.setState({'contact': null, 'title': ''});
    },

    onHandleDelete: function() {
        var contact = this.state.contact;
        var selectTravellers = this.state.selectTravellers;
        for (var i = selectTravellers.length - 1; i >= 0; i--) {
            var t = selectTravellers[i];
            if (t.accountid == contact.accountid 
                && t.contactid == contact.contactid) {
                selectTravellers.splice(i, 1);
                break;
            }
        }
        this.setState({'contact': null, 'title': '', 'selectTravellers': selectTravellers});
        message.success("成功更新常用出行人");
        AccountBasicInfo.actions.load();
        AccountContacts.actions.load();
    },

    onNextBtnClick: function() {
        var travellers = this.state.selectTravellers;
        if (travellers.length == 0) {
            message.error('请选择出行人');
            return;
        } 
        if (!this.props.isAgreed) {
            message.error('请同意安全协议');
            return;
        }
        if (this.state.basicInfo.accountInfo.status == accountStatus.WAIT_COMPLETE_INFO) {
            message.error('请先完善个人信息');
            return;
        }
        this.props.onNextBtnClick();
    },

    // component specs

    getInitialState: function() {
        AccountBasicInfo.actions.get();
        AccountContacts.actions.load();
        return {
            'basicInfo': {},
            'data': {
                'contacts': []
            },
            'selectTravellers': this._copyArray(this.props.travellers),
            'contact': null,
            'title': ''
        };
    },

    componentWillReceiveProps: function(newProps) {
        this.setState(this._copyArray(newProps.travellers));
    },

    render: function() {
        if (this.state.basicInfo.accountInfo == null) {
            return (<div></div>);
        }
        var travellers = this._createTravellers();
        var selectTravellers = this._createSelectTravellers();
        var nameList = this._createNameList(travellers, selectTravellers);
        var contactsList = this._createContactsList(travellers, selectTravellers);
        var newAccountTip = null;
        if (this.state.basicInfo.accountInfo.status == accountStatus.WAIT_COMPLETE_INFO) {
            newAccountTip = (
                <Alert message="新用户提醒信息" type="info" closable
                    description="您还是新用户，强烈建议您完善个人信息，方便以后下单。"/>
            );
        }
        return (
            <div className="order-step1 clearfix">
                <div className="order-contact-container">
                    <Title title="常用出行人" className="order-content-title">
                        <p className="order-contact-tip">
                            本团还可报
                            <span className="order-group-quota">{this.props.quota}</span>
                            人
                        </p>
                        <p></p>
                    </Title>
                    {newAccountTip}
                    <div className="order-traveller-select-container">
                        <span>请选择:</span>
                        {nameList}
                        <Button type="ghost" size="small" onClick={this.onNewBtnClick}>
                            <Icon type="plus"/>添加
                        </Button>
                    </div>
                    <div className="order-traveller-show">
                        <Row>
                            {contactsList}
                        </Row>
                    </div>
                </div>
                <div className="submit pull-right">
                    <Agreement 
                        isAgreed={this.props.isAgreed}
                        onAgreementCheck={this.props.onAgreementCheck} />
                    <Button type="primary" size="large"
                        onClick={this.onNextBtnClick}>下一步</Button>
                </div>
                <NewModal ref="newModal" title={this.state.title} 
                    isAccount={this.state.contact ? this.state.contact.contactid == 0 : false}
                    accountid={this.state.basicInfo.accountInfo.accountid} 
                    contact={this.state.contact}
                    onHandleOk={this.onHandleOk}
                    onHandleDelete={this.onHandleDelete}/>
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
                    onChange={(e)=>{this.props.onChange(e, this.props.traveller);}}/>
                {this.props.name} 
            </label>
        );
    }

});

var Agreement = React.createClass({

    render: function() {
        var text = this.props.isAgreed ? '我已经同意安全协议' : '同意安全协议';
        return (
            <label className="order-agree">
                <Checkbox
                    defaultChecked={this.props.isAgreed} 
                    onChange={this.props.onAgreementCheck}/>
                {text}
            </label>
        );
    }

});

module.exports = Step1;
