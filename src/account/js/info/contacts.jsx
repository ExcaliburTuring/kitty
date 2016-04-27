/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Panel } from 'react-bootstrap';

import AccountContacts from 'account_contacts';
import Input from 'input';

const _title = (
    <h3>常用出行人</h3>
);

var Contacts = React.createClass({

    mixins: [
        Reflux.connect(AccountContacts.store, 'contacts')
    ],

    getInitialState: function() {
        return {
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
            <div className="contact-container info-section">
                <Panel header={_title}>
                    {contactsList}
                </Panel>
            </div>
        );
    }
});

var Item = React.createClass({

    render: function() {
        var contact = this.props.contact;
        return (
            <div className="contact-container">
                <Input
                    type="text"
                    label="姓名:"
                    value={contact.name}/>
                <Input
                    type="text"
                    label="id:"
                    value={contact.id}/>
                <Input
                    type="text"
                    label="性别:"
                    value={contact.gender}/>
                <Input
                    type="text"
                    label="生日:"
                    value={contact.birthday}/>
                <Input
                    type="text"
                    label="手机:"
                    value={contact.mobile}/>
                <Input
                    type="text"
                    label="邮箱:"
                    value={contact.email}/>
            </div>
        );
    }
});

module.exports = Contacts;
