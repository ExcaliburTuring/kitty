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
        var contact = this.state.contacts[index];
        var contactid = contact.contactid;
        var selectContacts = this.state.selectContacts;
        delete selectContacts[contactid];
        this.setState({'selectContacts': selectContacts});
    },

    onChange: function(e, index) {
        var checked = e.target.checked;
        var contact = this.state.contacts[index];
        var contactid = contact.contactid;
        var selectContacts = this.state.selectContacts;
        if (checked) {
            selectContacts[contactid] = contact;
        } else {
            delete selectContacts[contactid];
        }
        this.setState({'selectContacts': selectContacts});
    },

    getInitialState: function() {
        return {
           'contacts': [],
           'newContacts': [],
           'selectContacts': {}
        }
    },

    componentWillMount: function () {
    },

    componentDidMount: function() {
        AccountContacts.actions.get();
    },

    render: function() {
        var contacts = this.state.contacts;
        var selectContacts = this.state.selectContacts;
        if (contacts.length == 0) {
            return (<div></div>);
        }
        var self = this;
        var names = contacts.map(function(contact, index) {
            return (
                <Name 
                    key={contact.contactid} 
                    index={index} 
                    name={contact.name} 
                    onChange={self.onChange}
                    checked={selectContacts[contact.contactid] ? true : false}/>
            );
        });

        var newContactsList = this.state.newContacts.map(function(contact, index) {
            return (
                <Contact 
                    key={`order-new-contact-${index}`}
                    index={index}
                    readOnly={false} 
                    contact={contact} 
                    onMinusClick={self.onNewContactMinusClick}/>
            );
        });

        var contactsList = contacts.map(function(contact, index) {
            if (selectContacts[contact.contactid]) {
                return (
                    <Contact 
                        key={`order-contact-${contact.contactid}`}
                        index={index}
                        contact={contact} 
                        onMinusClick={self.onContactMinusClick}/>
                );
            } else {
                return null;
            }
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

var Name = React.createClass({

    render: function() {
        return (
            <label className="order-contact-name">
                <Checkbox
                    checked={this.props.checked}
                    defaultChecked={false}
                    disabled={false}
                    onChange={(e)=>{this.props.onChange(e, this.props.index);}}/>
                    {this.props.name}
            </label>
        );
    }

});

module.exports = Contacts;
