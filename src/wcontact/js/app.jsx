import React from 'react';
import Reflux from 'reflux';
import { Image } from 'react-bootstrap';

import AccountBasicInfo from 'account_basicinfo';
import Rabbit from 'rabbit';
import { url } from 'config';

var AccountContacts = Rabbit.create(url.contacts);
var App = React.createClass({

    mixins: [
        Reflux.connect(AccountBasicInfo.store, 'basicInfo'),
        Reflux.connect(AccountContacts.store, 'contacts')
    ],

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
        var contactList = this.state.contacts.contacts.map(function(contact, index) {
            return (
                <Contact contact={contact} key={contact.contactid} />
            );
        })

        return (
            <div>
                {contactList}
            </div>
        );
    }
});

var Contact = React.createClass({

    render: function () {
        var contact = this.props.contact;
        return (
            <div className="contact-container clearfix">
                <div className="contact-avatar pull-left">
                    <Image href="#" alt="头像" responsive
                        src={"https://c3-q.mafengwo.net/s9/M00/C7/A1/wKgBs1fDSCmAH_MLAA25B6q9eNw96.jpeg?imageMogr2%2Fthumbnail%2F%21450x180r%2Fgravity%2FCenter%2Fcrop%2F%21450x180%2Fquality%2F90"} />
                </div>
                <div className="contact-body pull-left">
                    <p>{`${contact.name}`}</p>
                    <p>{`${contact.id}`}</p>
                    <p>{`${contact.birthday}`}</p>
                </div>
                <div className="contact-body pull-left">
                    <p>{`${contact.mobile}`}</p>
                    <p>{`${contact.email}`}</p>
                </div>
            </div>
        );
    }

});

module.exports = App;
