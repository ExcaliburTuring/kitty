/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Col } from 'react-bootstrap';
import { Checkbox, message } from 'antd'; 

import { url } from 'config';
import Rabbit from 'rabbit';
import Contact from 'contact';
import Title from 'title';
import FaButton from 'fabutton';

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
        var contact = this.state.contacts.contacts[index];
        var contactid = contact.contactid;
        var selectContacts = this.state.selectContacts;
        delete selectContacts[contactid];
        this.setState({'selectContacts': selectContacts});
    },

    onNewContactSuccessSubmit: function(index) {
        message.success("成功添加新常用出行人");
        this.onNewContactMinusClick(index);
        AccountContacts.actions.load();
    },

    onContactSuccessSubmit: function(index) {
        message.success('成功更新常用出行人');
        AccountContacts.actions.load();
    },

    onChange: function(e, index) {
        var checked = e.target.checked;
        var contacts = this.state.contacts.contacts;
        var contact = contacts[index];
        var contactid = contact.contactid;
        var selectContacts = this.state.selectContacts;
        if (checked) {
            selectContacts[contactid] = contact;
        } else {
            delete selectContacts[contactid];
        }
        this.setState({'selectContacts': selectContacts});
        var names = [];
        for (var i = 0, n = contacts.length; i < n; i++) {
            if (selectContacts[contacts[i].contactid]) {
                names.push(contacts[i].name);
            }
        }
        this.props.onContactChange(names);
    },

    getInitialState: function() {
        AccountContacts.actions.load();
        return {
           'contacts': {
                'contacts': []
           },
           'newContacts': [],
           'selectContacts': {}
        }
    },

    render: function() {
        var contacts = this.state.contacts.contacts;
        var selectContacts = this.state.selectContacts;
        var self = this;
        var nameList = [], contactsList = [], newContactsList = [];

        if (contacts.length > 0 ) {
            nameList = contacts.map(function(contact, index) {
                return (
                    <Name 
                        key={contact.contactid} 
                        index={index} 
                        name={contact.name} 
                        onChange={self.onChange}
                        checked={selectContacts[contact.contactid] ? true : false}/>
                );
            });

            for (var i = 0, n = contacts.length; i < n; i++) {
                var contact = contacts[i];
                if (selectContacts[contact.contactid]) {
                    contactsList.push(
                        <Contact 
                            key={`order-contact-${contact.contactid}`}
                            index={i}
                            contact={contact} 
                            onMinusClick={self.onContactMinusClick}
                            onSuccessSubmit={self.onContactSuccessSubmit}/>
                    );
                }
            }
        }

        if (this.state.newContacts.length > 0 ) {
            newContactsList = this.state.newContacts.map(function(contact, index) {
                return (
                    <Contact 
                        key={`order-new-contact-${index}`}
                        index={index}
                        readOnly={false} 
                        contact={contact} 
                        onMinusClick={self.onNewContactMinusClick}
                        onSuccessSubmit={self.onNewContactSuccessSubmit}/>
                );
            });
        }

        if (newContactsList.length == 0 && contactsList.length == 0) {
            contactsList = (<div>可以选择一个常用出行人，或者点击上方加号添加一个常用出行人</div>)
        }

        return (
            <div className="order-contact-container">
                <Title title="常用出行人" className="order-contact-title">
                    <div className="order-contact-name-container">
                        {nameList}
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
            <Checkbox
                checked={this.props.checked}
                defaultChecked={false}
                disabled={false}
                onChange={(e)=>{this.props.onChange(e, this.props.index);}}>
                {this.props.name}
            </Checkbox>
        );
    }

});

module.exports = Contacts;
