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
            <WContact onSaveSuccessful={()=>{console.log('kdkdkdk')}}/>
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

module.exports = App;
