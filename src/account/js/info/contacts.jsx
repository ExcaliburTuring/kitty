/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Panel, Button, Form, FormGroup, FormControl, Col, ControlLabel, HelpBlock, Modal  } from 'react-bootstrap';

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
        return {
           'contacts': [],
           'showModal': false
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
                <ContactItem contact={contact} key={contact.contactid}/>
            );
        });

        const title = (
            <h3 className="panel-title">常用出行人
                <Button className="pull-right title-btn" bsSize="xsmall" onClick={() => {this.setState({'showModal': true});}}>
                    <i className="fa fa-plus" aria-hidden="true"/>{' '}
                </Button>
            </h3>
        );

        return (
            <div className="contact-container info-section">
                <Panel header={title}>
                    <Col md={2} >
                        <div className="left-block">
                            <img src={people}/>
                        </div>
                    </Col>
                    <Col md={10}>
                        {contactsList}
                    </Col>
                </Panel>
                <AddModal showModal={this.state.showModal} onHide={() => {this.setState({'showModal': false});}} />
            </div>
        );
    }
});

var AddModal = React.createClass({

    getInitialState: function() {
        return {
            'name': _create(null, null, ''),
            'id': _create(null, null, ''),
            'gender':  _create(null, null, ''),
            'birthday':  _create(null, null, ''),
            'mobile':  _create(null, null, ''),
            'email':  _create(null, null, '')
        }
    },

    onNameChange: function(e) {
        var value = e.target.value;
        var ret = validator.hasText(value, '名字不能为空');
        this.setState({
            'name': {
                'value': value,
                'state': ret['state'],
                'msg': ret['msg']
            }
        });
    },

    onIdChange: function(e) {
        var value = e.target.value;
        var ret = validator.hasText(value, '证件不能为空');
        this.setState({
                   'id': {
                'value': value,
                'state': ret['state'],
                'msg': ret['msg']
            }
        });
    },

    onGenderChange: function(e) {
        var value = e.target.value;
        var ret = validator.hasText(value, '性别不能为空');
        this.setState({
                'gender': {
                'value': value,
                'state': ret['state'],
                'msg': ret['msg']
            }
        });
    },

    onBirthdayChange: function(e) {
        var value = e.target.value;
        var ret = validator.hasText(value, '生日不能为空');
        this.setState({
            'birthday': {
                'value': value,
                'state': ret['state'],
                'msg': ret['msg']
            }
        });
    },

    onEmailChange: function(e) {
        var value = e.target.value;
        var ret = validator.email(value);
        this.setState({
            'email': {
                'value': value,
                'state': ret['state'],
                'msg': ret['msg']
            }
        });
    },

    onMobileChange: function(e) {
        var value = e.target.value;
        var ret = validator.hasText(value, '手机不能为空');
        this.setState({
            'mobile': {
                'value': value,
                'state': ret['state'],
                'msg': ret['msg']
            }
        });
    },

    onSubmitBtnClick: function(e) {
        console.log('kdkdkkdk');
    },

    render: function() {
        var state = this.state;
        var nameState = state.name;
        var idState = state.id;
        var genderState = state.gender;
        var birthdayState = state.birthday;
        var emailState = state.email;
        var mobileState = state.mobile;

        return (
            <Modal show={this.props.showModal} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>添加联系人</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup
                            controlId="add-contact-name"
                            validationState={nameState.state}>
                            <Col componentClass={ControlLabel} md={2}>
                                姓名
                            </Col>
                            <Col md={5}>
                                <FormControl
                                    type="input"
                                    value={nameState.value}
                                    onChange={this.onNameChange}
                                    readOnly={this.state.readOnly}/>
                                <FormControl.Feedback />
                                <HelpBlock>{nameState.msg}</HelpBlock> 
                            </Col>
                        </FormGroup>
                        <FormGroup
                            controlId="add-contact-id"
                            validationState={idState.state}>
                            <Col componentClass={ControlLabel} md={2}>
                                证件号
                            </Col>
                            <Col md={5}>
                                <FormControl
                                    type="input"
                                    value={idState.value}
                                    onChange={this.onIdChange}
                                    readOnly={this.state.readOnly}/>
                                <FormControl.Feedback />
                                <HelpBlock>{idState.msg}</HelpBlock> 
                            </Col>
                        </FormGroup>
                        <FormGroup
                            controlId="add-contact-gender"
                            validationState={genderState.state}>
                            <Col componentClass={ControlLabel} md={2}>
                                性别
                            </Col>
                            <Col md={5}>
                                <FormControl
                                    type="input"
                                    value={genderState.value}
                                    onChange={this.onGenderChange}
                                    readOnly={this.state.readOnly}/>
                                <FormControl.Feedback />
                                <HelpBlock>{genderState.msg}</HelpBlock> 
                            </Col>
                        </FormGroup>
                        <FormGroup
                            controlId="add-contact-birthday"
                            validationState={birthdayState.state}>
                            <Col componentClass={ControlLabel} md={2}>
                                生日
                            </Col>
                            <Col md={5}>
                                <FormControl
                                    type="input"
                                    value={birthdayState.value}
                                    onChange={this.onBirthdayChange}
                                    readOnly={this.state.readOnly}/>
                                <FormControl.Feedback />
                                <HelpBlock>{birthdayState.msg}</HelpBlock> 
                            </Col>
                        </FormGroup>
                        <FormGroup
                            controlId="add-contact-email"
                            validationState={emailState.state}>
                            <Col componentClass={ControlLabel} md={2}>
                                邮箱
                            </Col>
                            <Col md={5}>
                                <FormControl
                                    type="input"
                                    value={emailState.value}
                                    onChange={this.onEmailChange}
                                    readOnly={this.state.readOnly}/>
                                <FormControl.Feedback />
                                <HelpBlock>{emailState.msg}</HelpBlock> 
                            </Col>
                        </FormGroup>
                        <FormGroup
                            controlId="add-contact-mobile"
                            validationState={mobileState.state}>
                            <Col componentClass={ControlLabel} md={2}>
                                手机
                            </Col>
                            <Col md={5}>
                                <FormControl
                                    type="input"
                                    value={mobileState.value}
                                    onChange={this.onMobileChange}
                                    readOnly={this.state.readOnly}/>
                                <FormControl.Feedback />
                                <HelpBlock>{mobileState.msg}</HelpBlock> 
                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.onSubmitBtnClick}>确定</Button>
                    <Button onClick={this.props.onHide}>取消</Button>
                </Modal.Footer>
            </Modal>
        );
    }

});


function _create(value, state, msg) {
    return {
        'value': value,
        'state': state,
        'msg': msg
    };
}

function _init(value) {
    return _create(value, null, '');
}

function _revert(original) {
    return {
        'readOnly': false, // 是否可以编辑
        'isChange': false, // 是否被编辑过
        'name': _init(original.name),
        'id': _init(original.id),
        'gender': _init(original.gender),
        'birthday': _init(original.birthday),
        'mobile': _init(original.mobile),
        'email': _init(original.email)
    }
}

module.exports = Contacts;
