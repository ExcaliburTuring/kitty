/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Button, Toast, List, InputItem, DatePicker, Switch, ActionSheet, Icon } from 'antd-mobile';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { createForm } from 'rc-form';

import Rabbit from 'rabbit';
import { url, gender, idType, accountStatus } from 'config';
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
            'status': contact.status,
            'name': contact.name,
            'id': contact.id,
            'idType': contact.idType || idType.IDENTIFICATION,
            'gender': contact.gender || gender.MALE,
            'birthday': contact.birthday ?  moment(contact.birthday, 'YYYY-MM-DD') : zhNow,
            'mobile': contact.mobile,
            'email': contact.email,
            'emergency': contact.emergency || false,
            'area': contact.area,
            'address': contact.address
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
             var contact = self.state.contact;
            var oldIdType = contact.idType;
            if (buttonIndex == BUTTONS.length - 1 || oldIdType == buttonIndex) {
                return;
            }
            contact.idType = buttonIndex; // 下标位置刚刚等于idType的取值
            contact.id = '';
            self.setState({ 'contact': contact });
            if (oldIdType != idType.IDENTIFICATION && contact.idType == idType.IDENTIFICATION) {
                $('.gender-birthday-container').removeClass().addClass('gender-birthday-container animated flipOutX')
                .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).css({'display': 'none'}).removeClass('animated flipOutX');
                });
            } else if (oldIdType == idType.IDENTIFICATION && contact.idType != idType.IDENTIFICATION) {
                var $genderBithdayContainer = $('.gender-birthday-container');
                if ($genderBithdayContainer.css('display') == 'none') {
                    $genderBithdayContainer.removeClass().css({'display': 'block'})
                    .addClass('gender-birthday-container animated flipInX')
                    .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $genderBithdayContainer.removeClass('animated flipInX');
                    });
                }
            }
        });
    },

    onIdChange: function(id) {
        var contact = this.state.contact;
        contact.id = id;
        if (contact.idType != idType.IDENTIFICATION) {
            this.setState({'contact': contact});
            return;
        }
        var ret = validator.id(id);
        var $genderBithdayContainer = $('.gender-birthday-container');
        var display = $genderBithdayContainer.css('display');
        if (ret['info']) {
            contact.birthday = moment(ret['info']['birth'], 'YYYY-MM-DD');
            contact.idType = ret['info']['sex'];
            this.setState({'contact': contact});
            if (display == 'none') {
                $genderBithdayContainer.removeClass().css({'display': 'block'})
                .addClass('gender-birthday-container animated flipInX')
                .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $genderBithdayContainer.removeClass('animated flipInX');
                });
            }
        } else {
            this.setState({'contact': contact});
            if (display != 'none') {
                $genderBithdayContainer.removeClass().addClass('gender-birthday-container animated flipOutX')
                .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).css({'display': 'none'}).removeClass('animated flipOutX');
                });
            }
        }
    },

    showGenderSheet: function() {
        if (this.state.contact.idType == idType.IDENTIFICATION) {
            return;
        }
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

    onBirthdayChange: function(date) {
        var contact = this.state.contact;
        if (contact.idType == idType.IDENTIFICATION) {
            return;
        }
        contact.birthday = date;
        this.setState({'contact': contact});
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
        var id = contact.id;
        var idTypeValue = contact.idType || idType.IDENTIFICATION;
        var gender = contact.gender;
        var birthday = contact.birthday.format('YYYY-MM-DD');

        if (idTypeValue == idType.IDENTIFICATION) {
            var ret = validator.id(id);
            if (ret['info']) {
                if (ret['info']['birth'] != birthday) {
                    Toast.fail('生日与身份证信息不符', 1);
                    return;
                }
                if (ret['info']['sex'] != gender) {
                    Toast.fail('性别与身份证信息不符', 1);
                    return;
                }
            } else {
                Toast.fail('证件号输入有误', 1);
                return;
            }
        }
        
        var newContact = {
            'accountid': contact.accountid,
            'name': getFieldProps('name').value,
            'id': id,
            'idType': idTypeValue,
            'gender': gender,
            'birthday': birthday,
            'mobile': getFieldProps('mobile').value.replace(' ', '').replace(' ', ''),
            'area': $('.contact-area-picker input').val(),
            'address': getFieldProps('address').value,
            'email': getFieldProps('email').value
        }
        if (!this.state.isAccount) {
            newContact['contactid'] = contact.contactid;
            newContact['emergency'] = getFieldProps('emergency').value;
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
        if (this.state.isNew || this.state.isAccount) {
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
                self.props.onDeleteSuccessful();
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

    componentDidMount: function() {
        $('.contact-area-picker input').cityPicker({
            title: "请选择地区"
        });
        var contact = this.state.contact;
        if (contact.idType == idType.IDENTIFICATION) {
            var ret = validator.id(contact.id);
            if (!ret['info']) {
                $('.gender-birthday-container').css({'display': 'none'});
            }
        }
    },

    render: function() {
        const { getFieldProps } = this.props.form;
        var contact = this.state.contact;
        return (
            <div className="contact-edit-dialog">
                <div className="contact-form">
                    {
                        this.state.isAccount
                        ? <List className="new-account-tip">
                            <List.Item thumb={<Icon type="exclamation-circle-o"/>}>
                                请完善个人信息
                            </List.Item>
                        </List>
                        : null
                    }
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
                        <InputItem clear
                            placeholder="请输入证件号"
                            value={contact.id}
                            onChange={this.onIdChange}>
                            <div onClick={this.showIdTypeSheet} 
                                className={`idtype-selector ${contact.idType == idType.H_PASSER ? 'h-passer' : ''}`}>
                                {idType.getDesc(contact.idType)}
                                <Icon type="right" className="idtype-icon"/>
                            </div>
                        </InputItem>
                        <div className="gender-birthday-container">
                            <List.Item arrow="horizontal" onClick={this.showGenderSheet}
                                extra={
                                    gender.getDesc(contact.gender)
                                }>性别</List.Item>
                            <DatePicker
                                mode="date"
                                title="选择生日"
                                extra="选择生日"
                                minDate={minDate}
                                maxDate={maxDate}
                                value={contact.birthday}
                                onChange={this.onBirthdayChange}>
                                <List.Item arrow="horizontal" >日期</List.Item>
                            </DatePicker>
                        </div>
                    </List>
                    <List>
                        <InputItem clear type="phone"
                            placeholder="请输入手机"
                            {
                                ...getFieldProps('mobile', {
                                    initialValue: contact.mobile,
                                    rules: [{
                                        'required': true,
                                        'pattern': validator._mobileRe,
                                        'transform': function(value) {
                                            return value ? value.replace(' ', '').replace(' ', '') : value;
                                        }
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
                        <InputItem clear className="contact-area-picker"
                            placeholder="请选择地区"
                            {
                                ...getFieldProps('area', {
                                    initialValue: contact.area,
                                })
                            }>地址</InputItem>
                        <InputItem clear
                            placeholder="街道门牌，无需重复地区信息"
                            {
                                ...getFieldProps('address', {
                                    initialValue: contact.address,
                                })
                            }>街道</InputItem>
                    </List>
                    {
                        this.state.isAccount
                        ? null
                        : <List>
                            <List.Item className="contact-emergency-container"
                                extra={
                                    <Switch checked
                                        {
                                            ...getFieldProps('emergency', {
                                                initialValue: contact.emergency,
                                                valuePropName: 'checked'
                                            })
                                        }/>
                                }>设为紧急联系人</List.Item>
                        </List>
                    }
                </div>
                <div className="contact-btn-container">
                    <Button className="save-btn" onClick={this.onSaveBtnClick}>保存</Button>
                    <Button onClick={this.props.onCancleBtnClick}>返回</Button>
                    {
                        this.state.isNew || this.state.isAccount
                        ? null
                        : <Button type="warning"
                            onClick={this.onDeleteBtnClick}>删除</Button>
                    }
                </div>
            </div>
        );
    }
});

WContact = createForm()(WContact);

module.exports = WContact;
