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
import { NewModal, NewBtn } from 'new';

import 'antd/lib/index.css';

var AccountContacts = Rabbit.create(url.contacts);

var Contacts = React.createClass({

    mixins: [
        Reflux.connect(AccountContacts.store, 'data')
    ],

    onUpdate: function() {
        message.success("成功更新常用出行人");
        AccountContacts.actions.load();
        this.setState({'contact': null, 'title': ''});
    },

    onNewBtnClick: function() {
        this.setState({'contact': null, 'title': '添加出行人'});
        this.refs.newModal.toggleVisiable();
    },

    onEditBtnClick: function(contact) {
        this.setState({'contact': contact, 'title': '编辑出行人'});
        this.refs.newModal.toggleVisiable();
    },

    getInitialState: function() {
        AccountContacts.actions.load();
        return {
           'data': {
                'contacts': []
           },
           'contact': null,
           'title': ''
        }
    },

    render: function() {
        var contacts = this.state.data.contacts;
        var self = this;
        var ermergencyList = [], contactsList = [];

        if (contacts.length > 0) {
            contacts.forEach(function(contact, index) {
                contactsList.push(
                    <Col md={3} key={`contacts-list-${index}`}>
                        <Contact contact={contact} totop onEditBtnClick={self.onEditBtnClick}/>
                    </Col>
                );
                if (contact.emergency) {
                    ermergencyList.push(
                        <Col md={3} key={`emergency-list-${index}`}>
                            <Contact contact={contact} onEditBtnClick={self.onEditBtnClick}/>
                        </Col>
                    )
                }
            }); 
        }
        if (ermergencyList.length == 0) {
            ermergencyList = (
                <div>
                    <p>通过上方加号添加常用出行人并同时设置为紧急联系人来添加</p>
                </div>
            );
        }
        return (
            <div className="contacts-container info-section">
                <Title title="常用出行人" className="info-title" />
                <div className="basic-info-container"/>
                <div className="contact-group emergency">
                    <Row>
                        {contactsList}
                        <Col md={2}>
                            <NewBtn onNewBtnClick={this.onNewBtnClick}/>
                        </Col>
                    </Row>
                </div>
                <Title title="紧急联系人" className="info-title" />
                <div className="basic-info-container"/>
                <div className="contact-group emergency">
                    <Row>
                        {ermergencyList}
                    </Row>
                </div>
                <NewModal ref="newModal" title={this.state.title} isAccount={false}
                    accountid={this.props.accountInfo.accountid} 
                    contact={this.state.contact}
                    onHandleOk={this.onUpdate}
                    onHandleDelete={this.onUpdate}/>
            </div>
        );
    }
});

module.exports = Contacts;
