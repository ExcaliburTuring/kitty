/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Col, Image } from 'react-bootstrap';
import { message } from 'antd'

import { url, defaultValue } from 'config';
import Rabbit from 'rabbit';
import Contact from 'contact';
import Title from 'title';
import FaButton from 'fabutton';
import people from '../../img/people.png';

import 'antd/lib/index.css';

var AccountContacts = Rabbit.create(url.contacts);

var Contacts = React.createClass({

    mixins: [
        Reflux.connect(AccountContacts.store, 'contacts')
    ],

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
        var contacts = this.state.contacts.contacts;
        var contact = contacts.splice(index, 1);
        var self = this;
        $.ajax({
            url: url.contacts,
            type: 'post',
            data: {'contactid': contact[0].contactid, '_method': 'delete'}
        }).done(function(data) {
            if (data.status != 0) {
                 message.error(defaultValue.deleteContactsMsg);
            } else {
                self.setState({
                    'contacts': {
                        'contacts': contacts
                    }
                });
                AccountContacts.actions.load({'accountid': self.props.accountInfo.accountid});
                message.success('成功删除常用联系人');
            }
        }).fail(function() {
            message.error(defaultValue.deleteContactsMsg);
        })
    },

    onNewContactSuccessSubmit: function(index) {
        message.success("成功添加新常用出行人");
        this.onNewContactMinusClick(index);
        AccountContacts.actions.load({'accountid': this.props.accountInfo.accountid});
    },

    onContactSuccessSubmit: function(index) {
        message.success('成功更新常用出行人');
        AccountContacts.actions.load({'accountid': this.props.accountInfo.accountid});
    },

    getInitialState: function() {
        AccountContacts.actions.load({'accountid': this.props.accountInfo.accountid});
        return {
           'contacts': {
                'contacts': []
           },
           'newContacts': []
        }
    },

    render: function() {
        var contacts = this.state.contacts.contacts;
        var self = this;
        var contactsList = [], newContactsList = [];
        if (this.state.newContacts.length > 0) {
            newContactsList = this.state.newContacts.map(function(contact, index) {
                return (
                    <Contact 
                        key={`new-contact-${index}`}
                        accountid={self.props.accountInfo.accountid}
                        index={index}
                        readOnly={false} 
                        contact={contact} 
                        onMinusClick={self.onNewContactMinusClick}
                        onSuccessSubmit={self.onNewContactSuccessSubmit}/>
                );
            });
        }
        if (contacts.length > 0) {
            contactsList = contacts.map(function(contact, index) {
                return (
                    <Contact 
                        key={contact.contactid}
                        accountid={self.props.accountInfo.accountid}
                        index={index}
                        contact={contact} 
                        onMinusClick={self.onContactMinusClick}
                        onSuccessSubmit={self.onContactSuccessSubmit}/>
                );
            }); 
        }
        if (newContactsList.length == 0 && contactsList.length == 0) {
            contactsList = (<div>没有常用出行人，可以点击上方加号进行添加</div>)
        }
        return (
            <div className="contacts-container info-section">
                <Title title="常用出行人" className="info-title">
                    <FaButton faClass="fa fa-plus" onClick={this.onAddBtnClick} />
                </Title>
                <Col xsHidden md={2} >
                    <div className="left-block">
                        <Image responsive src={people}/>
                    </div>
                </Col>
                <Col xs={12} md={9} >
                    {newContactsList}
                    {contactsList}
                </Col>
            </div>
        );
    }
});

module.exports = Contacts;
