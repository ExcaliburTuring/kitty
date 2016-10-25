import React from 'react';
import Reflux from 'reflux';
import { Image } from 'react-bootstrap';
import { Icon, Button, Checkbox, Toast } from 'antd-mobile';

import AccountBasicInfo from 'account_basicinfo';
import Rabbit from 'rabbit';
import { url, gender } from 'config';
import WContact from 'wcontact';

var AccountContacts = Rabbit.create(url.contacts);
var App = React.createClass({

    mixins: [
        Reflux.connect(AccountBasicInfo.store, 'basicInfo'),
        Reflux.connect(AccountContacts.store, 'contacts')
    ],

    // callback 

    onEditBtnClick: function(contact) {
        this.setState({'contact': contact});
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

    onSaveSuccessful: function() {
        this.setState({'contact': null});
        AccountContacts.actions.load();
    },

    onCancleBtnClick: function() {
        this.setState({'contact': null});
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
            },
            'contact': null 
        };
    },

    render: function() {
        if (this.state.contact) {
            return (
                <WContact contact={this.state.contact}
                    onSaveSuccessful={this.onSaveSuccessful}
                    onCancleBtnClick={this.onCancleBtnClick}/>
            );
        } else {
            return (
                <ContactList 
                    accountInfo={this.state.basicInfo.accountInfo}
                    contacts={this.state.contacts.contacts}
                    onEditBtnClick={this.onEditBtnClick}
                    onDeleteBtnClick={this.onDeleteBtnClick}/>
            );
        }
    }
});

var ContactList = React.createClass({

     /**
     * 创建账户对应的出行人
     */
    _createAccountContact: function() {
        var accountInfo = this.props.accountInfo;
        return {
            'accountid': accountInfo.accountid,
            'contactid': 0,
            'name': accountInfo.name || accountInfo.nickname,
            'id': accountInfo.id,
            'idType': accountInfo.idType,
            'gender': accountInfo.gender,
            'birthday': accountInfo.birthday,
            'email': accountInfo.email,
            'mobile': accountInfo.mobile,
            'avatarUrl': accountInfo.avatarUrl
        };
    },

    render: function() {
        var self = this;
        var accountContact = this._createAccountContact();
        var contactList = this.props.contacts.map(function(contact, index) {
            return (
                <Contact contact={contact} key={contact.contactid} 
                    onEditBtnClick={self.props.onEditBtnClick}
                    onDeleteBtnClick={self.props.onDeleteBtnClick}/>
            );
        })
        return (
            <div>
                <div className="account-contact">
                    <Contact contact={accountContact} key={'account-contact'}
                        onEditBtnClick={this.props.onEditBtnClick}/>
                </div>
                <div className="contact-list">
                    {contactList}
                </div>
                <div className="contact-addbtn-container">
                    <Button type="primary" size="small" onClick={()=>{this.props.onEditBtnClick({})}}><Icon type="plus-circle" /></Button>
                </div>
            </div>
        );
    }

});

var Contact = React.createClass({

    render: function () {
        var contact = this.props.contact;
        var isAccount = contact.contactid == 0;
        var isMale = contact.gender == gender.MALE;
        var avatarUrl = contact.avatarUrl ? contact.avatarUrl 
                            : isMale 
                                ? 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=850188828,2295753763&fm=58'
                                : 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=481252135,1456887421&fm=58';
        return (
            <div className="contact-container">
                <div className="contact-body">
                    <div className="contact-detail">
                        <p>
                            <span>{`${contact.name}`}</span>
                            <span className="pull-right">{`${contact.mobile}`}</span>
                        </p>
                        <p>{`${contact.id}`}</p>
                    </div>
                </div>
                <div className="contact-edit-container clearfix">
                    <div className="pull-left">
                        {
                            isAccount
                            ? <p>本人</p>
                            : <label>
                                <Checkbox checked={contact.emergency} disabled></Checkbox>
                                紧急联系人
                            </label>
                        }
                    </div>
                    <div className="pull-right">
                        <Button inline size="small" onClick={()=>{this.props.onEditBtnClick(contact)}}>
                            <Icon type="edit"/>编辑
                        </Button>
                        {
                            isAccount
                            ? null
                            :  <Button inline size="small" onClick={()=>{this.props.onDeleteBtnClick(contact)}}>
                                <Icon type="delete"/>删除
                            </Button>
                        }
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = App;
