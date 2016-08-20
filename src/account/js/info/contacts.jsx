/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Row, Col } from 'react-bootstrap';
import { message } from 'antd'

import { url } from 'config';
import Rabbit from 'rabbit';
import Contact from 'contact';
import Title from 'title';
import FaButton from 'fabutton';
import { NewModal, NewBtn } from 'new';

import 'antd/lib/index.css';

var AccountContacts = Rabbit.create(url.contacts);

var Contacts = React.createClass({

    mixins: [
        Reflux.connect(AccountContacts.store, 'data')
    ],

    onUpdate: function() {
        message.success("成功添加新常用出行人");
        AccountContacts.actions.load({'accountid': this.props.accountInfo.accountid});
        this.setState({'contact': null});
    },

    onEditBtnClick: function(index) {
        var contact = this.state.data.contacts[index];
        this.setState({'contact': contact});
        this.refs.newModal.toggleVisiable();
    },

    onNewBtnClick: function() {
        this.setState({'contact': null});
        this.refs.newModal.toggleVisiable();
    },

    getInitialState: function() {
        AccountContacts.actions.load({'accountid': this.props.accountInfo.accountid});
        return {
           'data': {
                'contacts': []
           },
           'contact': null
        }
    },

    render: function() {
        var contacts = this.state.data.contacts;
        var self = this;
        var ermergencyList = [], contactsList = [];

        if (contacts.length > 0) {
            contacts.forEach(function(contact, index) {
                if (contact.emergency) {
                    ermergencyList.push(
                        <Col md={3} key={`emergency-list-${index}`}>
                            <Contact index={index} contact={contact} onEditBtnClick={self.onEditBtnClick}/>
                        </Col>
                    )
                } else {
                    contactsList.push(
                        <Col md={3} key={`contacts-list-${index}`}>
                            <Contact index={index} contact={contact} totop onEditBtnClick={self.onEditBtnClick}/>
                        </Col>
                    );
                }
            }); 
        }
        if (ermergencyList.length == 0) {
            ermergencyList = (
                <div>
                    <p>通过下方加号添加常用出行人并同时设置为紧急联系人来添加</p>
                </div>
            );
        }
        return (
            <div className="contacts-container info-section">
                <Title title="常用出行人" className="info-title"></Title>
                <div className="contact-group emergency">
                    <h3>紧急联系人</h3>
                    <Row>
                        {ermergencyList}
                    </Row>
                </div>
                <div className="contact-group emergency">
                    <h3>常用出行人</h3>
                    <Row>
                        {contactsList}
                        <Col md={2}>
                            <NewBtn onNewBtnClick={this.onNewBtnClick}/>
                        </Col>
                    </Row>
                </div>
                <NewModal ref="newModal" title="添加联系人" isAccount={false}
                    accountid={this.props.accountInfo.accountid} 
                    contact={this.state.contact}
                    onHandleOk={this.onUpdate}
                    onHandleDelete={this.onUpdate}/>
            </div>
        );
    }
});

module.exports = Contacts;
