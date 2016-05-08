/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Col } from 'react-bootstrap';
import { Checkbox} from 'antd'; 
const CheckboxGroup = Checkbox.Group;

import AccountContacts from 'account_contacts';
import Contact from 'contact';
import Title from 'title';
import FaButton from 'fabutton';

import 'antd/lib/index.css';

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
        var contacts = this.state.contacts;
        contacts.splice(index, 1);
        this.setState({'contacts': contacts});
        //AccountContacts.actions.get();
    },

    onChange: function() {

    },

    getInitialState: function() {
        return {
           'contacts': [],
           'newContacts': [],
           'checked': {}
        }
    },

    componentWillMount: function () {
    },

    componentDidMount: function() {
        AccountContacts.actions.get();
    },

    render: function() {
        var contacts = this.state.contacts;
        var checked = this.state.checked;
        if (contacts.length == 0) {
            return (<div></div>);
        }
        var self = this;
        var newContactsList = this.state.newContacts.map(function(contact, index) {
            return (
                <Contact 
                    key={`new-contact-${index}`}
                    index={index}
                    readOnly={false} 
                    contact={contact} 
                    onMinusClick={self.onNewContactMinusClick}/>
            );
        });
        var contactsList = contacts.map(function(contact, index) {
            return (
                <Contact 
                    key={contact.contactid}
                    index={index}
                    contact={contact} 
                    onMinusClick={self.onContactMinusClick}/>
            );
        });


        var names = contacts.map(function(contact) {
            return (
                <label key={contact.contactid} className="order-contact-name">
                    <Checkbox
                        contactid={contact.contactid}
                        defaultChecked={false}
                        disabled={false}/>
                      {contact.name}
                </label>
            );
        });

        return (
            <div className="order-contact-container">
                <Title title="常用出行人" className="order-contact-title">
                    <div className="order-contact-name-container">
                        {names}
                    </div>
                    <FaButton faClass="fa fa-plus" onClick={this.onAddBtnClick} />
                </Title>
                {newContactsList}
                {contactsList}
            </div>
        );
    }
});

module.exports = Contacts;
