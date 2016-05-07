/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Panel, Button, Row, Col, Image } from 'react-bootstrap';

import AccountContacts from 'account_contacts';
import validator from 'validator';
import Title from './title';
import ContactItem from './contactItem';
import people from '../../img/people.png';

var Contacts = React.createClass({

    mixins: [
        Reflux.connect(AccountContacts.store, 'contacts')
    ],

    getInitialState: function() {
        AccountContacts.actions.get();
        return {
           'contacts': []
        }
    },

    render: function() {
        var contacts = this.state.contacts;
        if (contacts.length == 0) {
            return (<div></div>);
        }
        var contactsList = contacts.map(function(contact) {
            return (
                <ContactItem contact={contact} key={contact.contactid}/>
            );
        });

        const title = (
            <h3 className="panel-title">常用出行人
                <Button className="pull-right title-btn" bsSize="xsmall" onClick={() => {}}>
                    <i className="fa fa-plus" aria-hidden="true"/>{' '}
                </Button>
            </h3>
        );

        return (
            <div className="contacts-container info-section">
                <Panel header={title}>
                    <Row>
                        <Col smHidden xsHidden md={2} >
                            <div className="left-block">
                                <Image src={people}/>
                            </div>
                        </Col>
                        <Col sm={12} xs={12} md={10} >
                            {contactsList}
                        </Col>
                    </Row>
                </Panel>
            </div>
        );
    }
});

module.exports = Contacts;
