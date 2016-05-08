/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Col } from 'react-bootstrap';

import AccountContacts from 'account_contacts';
import Contact from 'contact';
import Title from 'title';
import FaButton from 'fabutton';

var Contacts = React.createClass({

    mixins: [
        Reflux.connect(AccountContacts.store, 'contacts')
    ],

    onMinusClick: function() {

    },

    getInitialState: function() {
        return {
           'contacts': [],
           'checked': [],
           'ccc': [],
           'visible': [],
        }
    },

    componentWillMount: function () {
    },

    componentDidMount: function() {
        AccountContacts.actions.get();
    },

    handleChange: function(event) {

    },

    render: function() {
        var contacts = this.state.contacts;
        var checked = this.state.checked;
        var self = this;

        if (contacts.length == 0) {
            return (<div></div>);
        }
        var self = this;
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
            var itemchecked= checked[contact.contactid];
            return (
                <div className="names" key={contact.contactid}>
                    <input 
                        type="checkbox" 
                        value={contact.contactid} 
                        onChange={self.handleChange} 
                        checked={itemchecked}/>
                        {contact.name}
                </div>
            );
        });

        return (
            <div className="order-contact-container">
                <Title title="常用出行人" className="order-contact-title">
                    {}
                    <FaButton faClass="fa fa-plus" onClick={this.onAddBtnClick} />
                </Title>
                {contactsList}
            </div>
        );
    }
});

module.exports = Contacts;
