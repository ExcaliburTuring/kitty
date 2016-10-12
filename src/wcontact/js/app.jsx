import React from 'react';
import Reflux from 'reflux';
import { Image } from 'react-bootstrap';
import { Icon, Button, Checkbox, Toast, List, InputItem, DatePicker, Switch, ActionSheet } from 'antd-mobile';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { createForm } from 'rc-form';

import AccountBasicInfo from 'account_basicinfo';
import Rabbit from 'rabbit';
import { url, gender } from 'config';

const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment('2018-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2015-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);

var AccountContacts = Rabbit.create(url.contacts);
var App = React.createClass({

    mixins: [
        Reflux.connect(AccountBasicInfo.store, 'basicInfo'),
        Reflux.connect(AccountContacts.store, 'contacts')
    ],

    // callback 

    onEditBtnClick: function(contact) {

    },

    onDeleteBtnClick: function(contact) {
        if (!contact || !contact.contactid) {
            return;
        }
        var self = this;
        $.ajax({
            url: url.contacts,
            type: 'post',
            data: {'contactid': contact.contactid, '_method': 'delete'}
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
        AccountBasicInfo.actions.load();
        AccountContacts.actions.load();
        return {
            'basicInfo': {
                'accountInfo': {
                    'name': '',
                    'avatarUrl': ''
                }
            },
            'contacts': {
                'contacts': []
            }
        };
    },

    render: function() {
        return (
            <ContactEditDialog />
        );
        
        // return (
        //     <ContactList contacts={this.state.contacts.contacts}
        //         onEditBtnClick={this.onEditBtnClick}
        //         onDeleteBtnClick={this.onDeleteBtnClick}/>
        // );
    }
});

var ContactList = React.createClass({

    render: function() {
        var self = this;
        var contactList = this.props.contacts.map(function(contact, index) {
            return (
                <Contact contact={contact} key={contact.contactid} 
                    onEditBtnClick={self.props.onEditBtnClick}
                    onDeleteBtnClick={self.props.onDeleteBtnClick}/>
            );
        })

        return (
            <div>
                <div className="contact-list">
                    {contactList}
                </div>
                <div className="contact-addbtn-container">
                    <Button type="primary" size="small">添加新联系人</Button>
                </div>
            </div>
        );
    }

});

var Contact = React.createClass({

    onChange(date) {
        this.setState({
            'date': date
        });
    },

    getInitialState() {
        return {
          date: zhNow,
        };
    },

    render: function () {
        var contact = this.props.contact;
        var isMale = contact.gender == gender.MALE;
        return (
            <div className="contact-container">
                <div className="contact-body clearfix">
                     <div className="contact-avatar pull-left">
                        <Image alt="头像" responsive
                            src={isMale 
                                ? 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=850188828,2295753763&fm=58'
                                : 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=481252135,1456887421&fm=58'}/>
                    </div>
                    <div className="contact-detail pull-left">
                        <div className="clearfix">
                            <p className="pull-left">{`${contact.name}`}</p>
                            <p className="pull-right">{`${contact.mobile}`}</p>
                        </div>
                        <div className="clearfix">
                            <p className="pull-left">{`${contact.id}`}</p>
                            <p className="pull-right">{`${contact.birthday}`}</p>
                        </div>
                        <p>{`${contact.email}`}</p>
                    </div>
                </div>
                <div className="contact-edit-container clearfix">
                    <div className="pull-left">
                        <label>
                            <Checkbox checked={contact.emergency} disabled></Checkbox>
                            紧急联系人
                        </label>
                    </div>
                    <div className="pull-right">
                        <Button inline size="small" onClick={()=>{this.props.onEditBtnClick(contact)}}>
                            <Icon type="edit"/>编辑
                        </Button>
                        <Button inline size="small" onClick={()=>{this.props.onDeleteBtnClick(contact)}}>
                            <Icon type="delete"/>删除
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
});

var ContactEditDialog = React.createClass({

    getInitialState: function() {
        return {
        };
    },

    showGenderSheet() {
        var self = this;
        const BUTTONS = ['男', '女', '未知', '取消'];
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            message: '请选择性别',
            maskClosable: true
        }, function(buttonIndex) {
            self.setState({ clicked: BUTTONS[buttonIndex] });
        });
    },

    render: function() {
        const { getFieldProps } = this.props.form;
        return (
            <div className="contact-edit-dialog">
                <div className="contact-form">
                    <List>
                        <InputItem clear
                            placeholder="请与证件姓名一致">姓名</InputItem>
                        <InputItem clear
                            placeholder="输入证件号">证件</InputItem>
                        <List.Item arrow="horizontal" onClick={this.showGenderSheet}>性别</List.Item>
                        <DatePicker
                            mode="date"
                            title="选择日期"
                            extra="可选,小于结束日期"
                            minDate={minDate}
                            maxDate={maxDate}
                             {...getFieldProps('date1', {
            initialValue: zhNow,
          })}>
                            <List.Item arrow="horizontal">日期</List.Item>
                        </DatePicker>
                        <InputItem clear type="phone"
                            placeholder="请输入正确手机号">手机号码</InputItem>
                        <InputItem clear
                            placeholder="输入证件号">邮箱</InputItem>
                        <List.Item className="contact-emergency-container"
                            extra={<Switch checked
                                {...getFieldProps('Switch1', {
                                    initialValue: true,
                                    valuePropName: 'checked',
                            })}/>}>设置为紧急联系人</List.Item>
                    </List>
                </div>
                <div className="contact-btn-container">
                    <Button type="primary" size="small">删除新联系人</Button>
                    <Button type="primary" size="small">保存新联系人</Button>
                </div>
            </div>
        );
    }
});

ContactEditDialog = createForm()(ContactEditDialog);

module.exports = App;
