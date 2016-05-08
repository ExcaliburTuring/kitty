/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Col, Image } from 'react-bootstrap';

import AccountContacts from 'account_contacts';
import Contact from 'contact';
import Title from 'title';
import FaButton from 'fabutton';
import people from '../../img/people.png';

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

    getInitialState: function() {
        AccountContacts.actions.get();
        return {
           'contacts': [],
           'newContacts': []
        }
    },

    render: function() {
        var contacts = this.state.contacts;
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

        return (
            <div className="contacts-container info-section">
                <Title title="常用出行人" className="info-title">
                    <FaButton faClass="fa fa-plus" onClick={this.onAddBtnClick} />
                </Title>
                <Col smHidden xsHidden md={2} >
                    <div className="left-block">
                        <Image responsive src={people}/>
                    </div>
                </Col>
                <Col sm={12} xs={12} md={9} >
                    {newContactsList}
                    {contactsList}
                </Col>
            </div>
        );
    }
});

module.exports = Contacts;
