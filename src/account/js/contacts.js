/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';

import AccountBasicInfo from 'account_basicinfo';
import AccountContacts from 'account_contacts';

var ContactList = React.createClass({

    mixins: [
        Reflux.connect(AccountBasicInfo.store, 'basicInfo'), 
        Reflux.connect(AccountContacts.store, 'contacts')
    ],

    getInitialState: function() {
        return {
           'basicInfo': {
                'login': false
           },
           'contacts': []
        }
    },

    componentDidMount: function() {
        AccountContacts.actions.get();
    },

    render: function() {
        var contacts = this.state.contacts;
        if (contacts.length == 0) {
            return (<div></div>);
        }
        var contactsList = contacts.map(function(contact) {
            return (
                <Item contact={contact} key={contact.contactid}/>
            );
        });
        return (
            <div className="container"> 
                {contactsList}
            </div>
        );
    }
});

var Item = React.createClass({

    render: function() {
        var contact = this.props.contact;
        return (
            <div className="contact-container">
                <div>
                    <p>姓名: {contact.name}</p>
                </div>
                <div>
                    <p>id_type: {contact.idType}</p>
                </div>
                <div>
                    <p>id: {contact.id}</p>
                </div>
                <div>
                    <p>性别: {contact.gender}</p>
                </div>
                <div>
                    <p>生日: {contact.birthday}</p>
                </div>
                <div>
                    <p>手机: {contact.mobile}</p>
                </div>
                <div>
                    <p>邮箱: {contact.email}</p>
                </div>
            </div>
        );
    }
});

module.exports = ContactList;
