/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Button, Toast, List, InputItem, DatePicker, Switch, ActionSheet } from 'antd-mobile';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { createForm } from 'rc-form';

import Rabbit from 'rabbit';
import { url, gender, idType } from 'config';
import validator from 'validator';

import './wcontact.less';

const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment('2018-12-30 +0800', 'YYYY-MM-DD').utcOffset(8);
const minDate = moment('1879-01-01 +0800', 'YYYY-MM-DD').utcOffset(8);

var WContact = React.createClass({

    // helper method

    _createContact: function(contact) {
        return {
            'accountid': contact.accountid,
            'contactid': contact.contactid,
            'name': contact.name,
            'id': contact.id,
            'idType': contact.idType || idType.IDENTIFICATION,
            'gender': contact.gender || gender.MALE,
            'birthday': contact.birthday ?  moment(contact.birthday, 'YYYY-MM-DD') : zhNow,
            'mobile': contact.mobile,
            'email': contact.email,
            'emergency': contact.emergency || false
        }
    },

     _createInitState: function(contact) {
        var contact = this.props.contact;
        return {
            'contact': this._createContact(contact),
            'isNew': !contact.accountid, // 空对象是要新建
            'isAccount': contact.accountid && contact.contactid == 0  // contactid为0，则是账户
        };
    },

    // callback method

    showIdTypeSheet: function() {
        var self = this;
        var BUTTONS = ['身份证', '护照', '港澳通行证', '台胞证', '取消'];
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            message: '请选择证件类型',
            maskClosable: true
        }, function(buttonIndex) {
            if (buttonIndex == BUTTONS.length - 1) {
                return;
            }
            var contact = self.state.contact;
            contact.idType = buttonIndex;
            self.setState({ 'contact': contact });
        });
    },

    showGenderSheet: function() {
        var self = this;
        var BUTTONS = ['男', '女', '未知', '取消'];
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            message: '请选择性别',
            maskClosable: true
        }, function(buttonIndex) {
            if (buttonIndex == BUTTONS.length - 1) {
                return;
            }
            var contact = self.state.contact;
            contact.gender = buttonIndex == 0 ? gender.MALE 
                                : buttonIndex == 1 ? gender.FEMALE : gender.UNKNOW;
            self.setState({ 'contact': contact });
        });
    },

    onSaveBtnClick: function() {
        const { getFieldProps, validateFields } = this.props.form;
        var ret = true;
        validateFields(function(error, value) {
            if (error) {
                Toast.fail('信息未完全正确', 1);
                ret = false;
            }
        });
        if (!ret) {
            return;
        }

        var contact = this.state.contact;
        var id = getFieldProps('id').value;
        var idTypeValue = contact.idType || idType.IDENTIFICATION;
        var gender = contact.gender;
        var birthday = getFieldProps('birthday').value.format('YYYY-MM-DD');

        if (idTypeValue == idType.IDENTIFICATION) {
            var ret = validator.id(id);
            if (ret['info']) {
                if (ret['info']['birth'] != birthday) {
                    Toast.fail('生日与身份证信息不符', 1);
                    return;
                }
                if ( ret['info']['sex'] != gender) {
                    Toast.fail('性别与身份证信息不符', 1);
                    return;
                }
            } else {
                Toast.fail('id输入有误', 1);
                return;
            }
        }
        
        var newContact = {
            'accountid': contact.accountid,
            'contactid': contact.contactid,
            'name': getFieldProps('name').value,
            'id': id,
            'idType': idTypeValue,
            'gender': gender,
            'birthday': birthday,
            'mobile': getFieldProps('mobile').value.replace(' ', '').replace(' ', ''),
            'email': getFieldProps('email').value,
            'emergency': getFieldProps('emergency').value
        }
        var self = this;
        $.post(this.state.isAccount ? url.accountInfo : url.contacts, newContact)
        .done(function(data) {
            if (data.status != 0) {
                Toast.fail(defaultValue.updateContactsMsg, 1);
            } else {
                self.props.onSaveSuccessful();
            }
        }).fail(function() {
            Toast.error(defaultValue.updateContactsMsg, 1);
        });
    },

    onDeleteBtnClick: function() {
        if (isNew) {
            return;
        }
        var self = this;
        $.ajax({
            url: url.contacts,
            type: 'post',
            data: {'contactid': this.state.contact.contactid, '_method': 'delete'}
        }).done(function(data) {
            if (data.status != 0) {
                Toast.fail(defaultValue.deleteContactsMsg, 1);
            } else {
                Toast.success('删除成功', 1);
                AccountContacts.actions.load();
            }
        }).fail(function() {
            Toast.fail(defaultValue.deleteContactsMsg, 1);
        });
    },

    // component specs

    getInitialState: function() {
        return this._createInitState(this.props.contact);
    },

    componentWillReceiveProps: function(newProps) {
        if (newProps.contact != this.props.contact) {
            this.setState(this._createInitState(newProps));
        }
    },

    render: function() {
        const { getFieldProps } = this.props.form;
        var contact = this.state.contact;
        return (
            <div className="contact-edit-dialog">
                <div className="contact-form">
                    <List>
                        <InputItem clear
                            placeholder="请输入姓名"
                            {
                                ...getFieldProps('name', {
                                    initialValue: contact.name,
                                    rules: [{
                                        'required': true,
                                        'range': {'min': 1, 'max': 10}
                                    }]
                                })
                            }>姓名</InputItem>
                        <List.Item arrow="horizontal" onClick={this.showIdTypeSheet}
                            extra={
                                idType.getDesc(contact.idType)
                            }>证件类型</List.Item>
                        <InputItem clear
                            placeholder="请输入证件号"
                            {
                                ...getFieldProps('id', {
                                    initialValue: contact.id,
                                    rules: [{
                                        'required': true,
                                        'range': {'min': 1, 'max': 20}
                                    }]
                                })
                            }>证件</InputItem>
                        <List.Item arrow="horizontal" onClick={this.showGenderSheet}
                            extra={
                                gender.getDesc(contact.gender)
                            }>性别</List.Item>
                        <DatePicker
                            mode="date"
                            title="选择日期"
                            extra="可选,小于结束日期"
                            minDate={minDate}
                            maxDate={maxDate}
                            {
                                ...getFieldProps('birthday', {
                                    initialValue: contact.birthday
                                })
                            }>
                            <List.Item arrow="horizontal">日期</List.Item>
                        </DatePicker>
                        <InputItem clear type="phone"
                            placeholder="请输入手机"
                            {
                                ...getFieldProps('mobile', {
                                    initialValue: contact.mobile,
                                    rules: [{
                                        'required': true,
                                        'pattern': validator._mobileRe
                                    }],
                                })
                            }>手机</InputItem>
                        <InputItem clear
                            placeholder="请输入邮箱"
                            {
                                ...getFieldProps('email', {
                                    initialValue: contact.email,
                                    rules: [{
                                        'required': true,
                                        'type': 'email'
                                    }]
                                })
                            }>邮箱</InputItem>
                        <List.Item className="contact-emergency-container"
                            extra={
                                <Switch checked
                                    {
                                        ...getFieldProps('emergency', {
                                            initialValue: contact.emergency,
                                            valuePropName: 'checked'
                                        })
                                    }/>
                            }>设置为紧急联系人</List.Item>
                    </List>
                </div>
                <div className="contact-btn-container">
                    <Button size="small" onClick={this.onSaveBtnClick}>保存</Button>
                    {
                        this.state.isNew || this.state.isAccount
                        ? null
                        : <Button type="warning" size="small"
                            onClick={this.onDeleteBtnClick}>删除</Button>
                    }
                    <Button size="small" onClick={this.props.onCancleBtnClick}>返回</Button>
                </div>
            </div>
        );
    }
});

WContact = createForm()(WContact);

module.exports = WContact;
