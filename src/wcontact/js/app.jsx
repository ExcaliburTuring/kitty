import React from 'react';
import Reflux from 'reflux';
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

    onEmergencyChange: function(e, contact) {
        var checked = e.target.checked;
        var contacts = this.state.contacts.contacts;
        var target = null;
        for (var i = contacts.length - 1; i >= 0; i--) {
            target = contacts[i];
            if (target.contactid == contact.contactid) {
                target.emergency = checked;
                break;
            }
        }
        if (target != null) {
            var self = this;
            $.post(url.contacts, target)
            .complete(function(data) {
                AccountContacts.actions.load();
            });
            this.setState({'contacts': {'contacts': contacts}});
        }
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
                AccountContacts.actions.load();
                Toast.success("删除成功", 1);
            }
        }).fail(function() {
            Toast.fail(defaultValue.deleteContactsMsg, 1);
        });
    },

    onSaveSuccessful: function() {
        var contact = this.state.contact;
        if (contact.accountid && contact.contactid == 0) {
            AccountBasicInfo.actions.load();
        } else {
            AccountContacts.actions.load();
        }
        this.setState({'contact': null});
    },

    onDeleteSuccessful: function() {
        AccountContacts.actions.load();
        this.setState({'contact': null});
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
                    onDeleteSuccessful={this.onDeleteSuccessful}
                    onCancleBtnClick={this.onCancleBtnClick}/>
            );
        } else {
            return (
                <ContactList 
                    accountInfo={this.state.basicInfo.accountInfo}
                    contacts={this.state.contacts.contacts}
                    onEditBtnClick={this.onEditBtnClick}
                    onDeleteBtnClick={this.onDeleteBtnClick}
                    onEmergencyChange={this.onEmergencyChange}/>
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
            'name': accountInfo.name,
            'id': accountInfo.id,
            'idType': accountInfo.idType,
            'gender': accountInfo.gender,
            'birthday': accountInfo.birthday,
            'email': accountInfo.email,
            'mobile': accountInfo.mobile,
            'avatarUrl': accountInfo.avatarUrl,
            'area': accountInfo.area,
            'address': accountInfo.address
        };
    },

    render: function() {
        var self = this;
        var accountContact = this._createAccountContact();
        var contactList = this.props.contacts.map(function(contact, index) {
            return (
                <Contact contact={contact} key={contact.contactid} 
                    onEditBtnClick={self.props.onEditBtnClick}
                    onDeleteBtnClick={self.props.onDeleteBtnClick}
                    onEmergencyChange={self.props.onEmergencyChange}/>
            );
        })
        return (
            <div>
                <div className="contact-list-container">
                    <Contact contact={accountContact} key={'account-contact'}
                        onEditBtnClick={this.props.onEditBtnClick}/>
                    {contactList}
                </div>
                <div className="contact-addbtn-container">
                    <Button onClick={()=>{this.props.onEditBtnClick({})}}>
                        <Icon type="plus-circle-o" />添加新出行人
                    </Button>
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
                    {
                        isAccount
                        ? <img className="img-responsive img-thumbnail pull-left" src={avatarUrl}/>
                        : null
                    }
                    <p className="fixed">
                        {contact.name}
                        <span className="pull-right">{contact.mobile}</span>
                    </p>
                    <p className="contact-id fixed">{contact.id}</p>
                </div>
                <div className="contact-edit-container clearfix">
                    <div className="pull-left">
                        {
                            isAccount
                            ? <p>本人</p>
                            : <label>
                                <Checkbox checked={contact.emergency} onChange={(e)=>{this.props.onEmergencyChange(e, contact)}}></Checkbox>
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
