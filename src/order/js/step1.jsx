/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { Row, Col } from 'react-bootstrap';
import { Alert, Checkbox, Icon, Button, Modal, Input, message } from 'antd';

import AccountBasicInfo from 'account_basicinfo';
import { url, accountStatus } from 'config';
import validator from 'validator';
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

    getEmergency: function() {
        var name = '', mobile = '',emergencyContacts = this.state.emergencyContacts;
        for (var key in emergencyContacts) {
            if (key != 'size' && emergencyContacts.hasOwnProperty(key)) {
                var emergency = emergencyContacts[key];
                name = name + emergency.name + ',';
                mobile = mobile + emergency.mobile + ',';
            }
        }
        if (name.length > 1) {
            name = name.substring(0, name.length - 1);
        } else {
            return {};
        }
        if (mobile.length > 1) {
            mobile = mobile.substring(0, mobile.length - 1);
        } else {
            return {};
        }
        return {'name': name, 'mobile': mobile};
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
            'name': accountInfo.name || accountInfo.nickname,
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

    _createEmergencyNameList: function(travellers, selectTravellers) {
        var self = this, nameList = [], emergencyContacts = this.state.emergencyContacts;
        for (var i = 0, n = travellers.length; i < n; i++) {
            var traveller = travellers[i];
            if (traveller.emergency // 这个联系人是紧急联系人，并且没有选择去旅游
                && !selectTravellers.hasOwnProperty(`${traveller.accountid}-${traveller.contactid}`)) {
                nameList.push(
                    <Name 
                        key={`travellers-name-list-${i}`} 
                        traveller={traveller}
                        name={traveller.name == null ? '您自己' : traveller.name} 
                        onChange={self.onEmergencyNameChange}
                        checked={emergencyContacts.hasOwnProperty(traveller.mobile)}/>
                );
            }
        }
        return nameList;
    },

    _createEmergencyContactList: function() {
        var self = this, contactsList = [], emergencyContacts = this.state.emergencyContacts;
        for (var key in emergencyContacts) {
            if (key != 'size' && emergencyContacts.hasOwnProperty(key)) {
                var emergencyContact = emergencyContacts[key];
                contactsList.push(
                    <Col key={`select-travellers-list-${key}`} md={4}>
                        <Contact contact={emergencyContact} 
                            readOnly needCard={false} closable
                            onEditBtnClick={self.onEditBtnClick} onClose={this.onEmergencyClose}/>
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
            if (size > this.props.quota) {
                message.warn(`本团最多还可以报${this.props.quota}人`);
                return;
            } else if (size > 5) {
                message.warn('每个订单最多可以报5人');
                return;
            } else {
                selectTravellers.push(traveller);
            }
        } else {
            for (var i = selectTravellers.length - 1; i >= 0; i--) {
                var t = selectTravellers[i];
                if (t.accountid == traveller.accountid && t.contactid == traveller.contactid) {
                    selectTravellers.splice(i, 1);
                    break;
                }
            }
        }
        this.setState({'selectTravellers': selectTravellers});
    },

    onEmergencyNameChange: function(e, traveller) {
        var emergencyContacts = this.state.emergencyContacts;
        if (e.target.checked) {
            if (emergencyContacts.size > 3) {
                message.warn('每个订单最多可以有3个紧急联系人');
                return;
            } else {
                emergencyContacts[traveller.mobile] = { // 手机作为key，避免同一个手机
                    'name': traveller.name, 
                    'mobile': traveller.mobile, 
                    'relationship': '紧急联系人'
                };
                emergencyContacts.size = emergencyContacts.size + 1;
            }
        } else {
            delete emergencyContacts[traveller.mobile];
            emergencyContacts.size = emergencyContacts.size - 1;
        }
        this.setState({'emergencyContacts': emergencyContacts});
    },

    onNewBtnClick: function() {
        this.setState({'contact': null, 'title': '添加出行人'});
        this.refs.newModal.toggleVisiable();
    },

    onEditBtnClick: function(contact) {
        this.setState({'contact': contact, 'title': '编辑出行人'});
        this.refs.newModal.toggleVisiable();
    },

    onNewEmergencyBtnClick: function() {
        var self = this;
        var modalContent = (
            <div>
                <label>
                    姓名：
                    <Input id="emergency-name-input" placeholder="请输入" />
                </label>
                <label>
                    电话：
                    <Input id="emergency-mobile-input" placeholder="请输入" />
                </label>
            </div>
        );
        Modal.confirm({
            title: '添加紧急联系人',
            okText: '添加',
            content: modalContent,
            onOk: function() {
                var name = $("#emergency-name-input").val();
                var mobile = $("#emergency-mobile-input").val();
                if (name && name.length > 1 && mobile && mobile.length > 1) {
                    var ret = validator.mobile(mobile, '手机号输入有误');
                    if (ret.state != 'success') {
                        message.error('输入的手机号有误，请重新添加!');
                        return;
                    }
                    var emergencyContacts = self.state.emergencyContacts;
                    emergencyContacts[mobile] = { // 手机作为key，避免同一个手机
                        'name': name, 
                        'mobile': mobile, 
                        'relationship': '紧急联系人'
                    };
                    emergencyContacts.size = emergencyContacts.size + 1;
                    self.setState({'emergencyContacts': emergencyContacts});
                }
            },
            onCancel: function() {}
        });
    },

    onEmergencyClose: function(contact) {
        var emergencyContacts = this.state.emergencyContacts;
        delete emergencyContacts[contact.mobile];
        emergencyContacts.size = emergencyContacts.size - 1;
        this.setState({'emergencyContacts': emergencyContacts});
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
            if (t.accountid == contact.accountid && t.contactid == contact.contactid) {
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
            message.error('请先完善个人信息。可先勾选自己，然后点击小铅笔按钮进行编辑。');
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
            'title': '',
            'emergencyContacts': {
                'size' : 0
            }
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
        // 出行人选择
        var nameList = this._createNameList(travellers, selectTravellers);
        var contactsList = this._createContactsList(travellers, selectTravellers);
        // 紧急联系人选择
        var emergencyNameList = this._createEmergencyNameList(travellers, selectTravellers);
        var emergencyContactList = this._createEmergencyContactList();
        // 新用户提示
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
                    <Title title="选择出行人" className="order-content-title">
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
                    <div className="order-emergency-contianer">
                        <span className="order-emergency-title">紧急联系人:</span>
                        {emergencyNameList}
                        <Button type="ghost" size="small" onClick={this.onNewEmergencyBtnClick}>
                            <Icon type="plus"/>添加
                        </Button>
                    </div>
                    <div className="order-emergency-show">
                        <Row>
                            {emergencyContactList}
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
