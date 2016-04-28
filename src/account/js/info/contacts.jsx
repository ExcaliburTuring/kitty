/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Panel, Button, Form, FormGroup, FormControl, Col, ControlLabel, HelpBlock, Modal  } from 'react-bootstrap';

import AccountContacts from 'account_contacts';
import validator from 'validator';
import Title from './title';
import Input from './input';

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
                    {contactsList}
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
                        <Input
                            controlId="add-contact-name"
                            validationState={nameState.state}
                            label="姓名"
                            value={nameState.value}
                            onChange={this.onNameChange}
                            msg={nameState.msg}/>
                        <Input
                            controlId="add-contact-id"
                            validationState={idState.state}
                            label="证件号"
                            value={idState.value}
                            onChange={this.onIdChange}
                            msg={idState.msg}/>
                        <Input
                            controlId="add-contact-gender"
                            validationState={genderState.state}
                            label="性别"
                            value={genderState.value}
                            onChange={this.onGenderChange}
                            msg={genderState.msg}/>
                        <Input
                            controlId="add-contact-birthday"
                            validationState={birthdayState.state}
                            label="生日"
                            value={birthdayState.value}
                            onChange={this.onBirthdayChange}
                            msg={birthdayState.msg}/>
                        <Input
                            readOnly={this.state.readOnly}
                            controlId="add-contact-email"
                            validationState={emailState.state}
                            label="邮箱"
                            value={emailState.value}
                            onChange={this.onEmailChange}
                            msg={emailState.msg}/>
                        <Input
                            readOnly={this.state.readOnly}
                            controlId="add-contact-mobile"
                            validationState={mobileState.state}
                            label="手机"
                            value={mobileState.value}
                            onChange={this.onMobileChange}
                            msg={mobileState.msg}/>
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

var ContactItem = React.createClass({

    getInitialState: function() {
        var contact = this.props.contact;
        return {
            'original': {
                'contactid': contact.contactid,
                'name': contact.name,
                'id': contact.id,
                'gender': contact.gender,
                'birthday': contact.birthday,
                'mobile': contact.mobile,
                'email': contact.email
            },
            'readOnly': true, // 是否可以编辑
            'isChange': false, // 是否被编辑过
            'name': _init(contact.name),
            'id': _init(contact.id),
            'gender': _init(contact.gender),
            'birthday': _init(contact.birthday),
            'mobile': _init(contact.mobile),
            'email': _init(contact.email)
        }
    },

    isChange: function(option) {
        if (option === undefined) { // 没有传option则比较全部
            option = ['name', 'id', 'gender', 'birthday', 'mobile', 'email'];
        }
        var state = this.state;
        var original = state.original;
        for (var i = option.length - 1; i >= 0; i--) {
            var key = option[i];
            if (state[key].value != original[key]) {
                return true;
            }
        }
        return false;
    },

    onNameChange: function(e) {
        var value = e.target.value;
        var original = this.state.original;
        if (value === original.name) {
            var isChange = this.isChange(['id', 'gender', 'birthday']);
            if (isChange) {
                this.setState({'name': _init(original.name)})
            } else {
                this.setState(_revert(original));
            }
        } else {
            var ret = validator.hasText(value, '名字不能为空');
            this.setState({
                'isChange': true,
                'name': {
                    'value': value,
                    'state': ret['state'],
                    'msg': ret['msg']
                }
            });
        }
    },

    onIdChange: function(e) {
        var value = e.target.value;
        var original = this.state.original;
        if (value === original.id) {
            var isChange = this.isChange();
            if (isChange) {
                this.setState({'id': _init(original.id)})
            } else {
                this.setState(_revert(original));
            }
        } else {
            var ret = validator.hasText(value, '证件不能为空');
            this.setState({
                'isChange': true,
                'id': {
                    'value': value,
                    'state': ret['state'],
                    'msg': ret['msg']
                }
            });
        }
    },

    onGenderChange: function(e) {
        var value = e.target.value;
        var original = this.state.original;
        if (value === original.gender) {
            var isChange = this.isChange(['name', 'id', 'birthday']);
            if (isChange) {
                this.setState({'gender': _init(original.gender)})
            } else {
                this.setState(_revert(original));
            }
        } else {
            var ret = validator.hasText(value, '性别不能为空');
            this.setState({
                'isChange': true,
                'gender': {
                    'value': value,
                    'state': ret['state'],
                    'msg': ret['msg']
                }
            });
        }
    },

    onBirthdayChange: function(e) {
        var value = e.target.value;
        var original = this.state.original;
        if (value === original.birthday) {
            var isChange = this.isChange(['name', 'id', 'gender']);
            if (isChange) {
                this.setState({'birthday': _init(original.birthday)})
            } else {
                this.setState(_revert(original));
            }
        } else {
            var ret = validator.hasText(value, '生日不能为空');
            this.setState({
                'isChange': true,
                'birthday': {
                    'value': value,
                    'state': ret['state'],
                    'msg': ret['msg']
                }
            });
        }
    },

    onEmailChange: function(e) {
        var value = e.target.value;
        var original = this.state.original;
        if (value === original.email) {
            var isChange = this.isChange(['mobile', 'wxid']);
            if (isChange) {
                this.setState({'email': _init(original.email)})
            } else {
                this.setState(_revert(original));
            }
        } else {
            var ret = validator.email(value);
            this.setState({
                'isChange': true,
                'email': {
                    'value': value,
                    'state': ret['state'],
                    'msg': ret['msg']
                }
            });
        }
    },

    onMobileChange: function(e) {
        var value = e.target.value;
        var original = this.state.original;
        if (value === original.mobile) {
            var isChange = this.isChange(['email', 'wxid']);
            if (isChange) {
                this.setState({'mobile': _init(original.mobile)})
            } else {
                this.setState(_revert(original));
            }
        } else {
            var ret = validator.hasText(value, '手机不能为空');
            this.setState({
                'isChange': true,
                'mobile': {
                    'value': value,
                    'state': ret['state'],
                    'msg': ret['msg']
                }
            });
        }
    },

    onRevertBtnClick: function() {
         this.setState(_revert(this.state.original));
    },

    onSubmitBtnClick: function() {
        console.log('onSubmitBtnClick');
    },

    render: function() {
        var state = this.state;
        var nameState = state.name;
        var idState = state.id;
        var genderState = state.gender;
        var birthdayState = state.birthday;
        var mobileState = state.mobile;
        var emailState = state.email;

        var title = (<Title
                        title={this.state.original.name}
                        readOnly={this.state.readOnly}
                        isChange={this.state.isChange}
                        onEditBtnClick={() => {this.setState({'readOnly': false});}}
                        onCancelBtnClick={() => {this.setState({'readOnly': true});}}
                        onRevertBtnClick={this.onRevertBtnClick}
                        onSubmitBtnClick={this.onSubmitBtnClick}/>);
        return (
            <div className="contact-item-container">
                <Panel header={title} bsStyle="info">
                    <Form inline>
                        <FormGroup
                            controlId={`contact-item-${this.state.original.contactid}-container-name`}
                            validationState={nameState.state}>
                            <ControlLabel>姓名</ControlLabel>
                            <FormControl
                                type="input" 
                                value={nameState.value}
                                onChange={this.onNameChange}
                                readOnly={this.state.readOnly}/>
                            <FormControl.Feedback />
                            <HelpBlock>{nameState.msg}</HelpBlock> 
                        </FormGroup>
                        <FormGroup
                            controlId={`contact-item-${this.state.original.contactid}-container-id`}
                            validationState={idState.state}>
                            <ControlLabel>id</ControlLabel>
                            <FormControl
                                type="input" 
                                value={idState.value}
                                onChange={this.onIdChange}
                                readOnly={this.state.readOnly}/>
                            <FormControl.Feedback />
                            <HelpBlock>{idState.msg}</HelpBlock> 
                        </FormGroup>
                    </Form>
                    <Form inline>
                        <FormGroup
                            controlId={`contact-item-${this.state.original.contactid}-container-gender`}
                            validationState={genderState.state}>
                            <ControlLabel>性别</ControlLabel>
                            <FormControl
                                type="input" 
                                value={genderState.value}
                                onChange={this.onGenderChange}
                                readOnly={this.state.readOnly}/>
                            <FormControl.Feedback />
                            <HelpBlock>{genderState.msg}</HelpBlock> 
                        </FormGroup>
                        <FormGroup
                            controlId={`contact-item-${this.state.original.contactid}-container-birthday`}
                            validationState={birthdayState.state}>
                            <ControlLabel>生日</ControlLabel>
                            <FormControl
                                type="input" 
                                value={birthdayState.value}
                                onChange={this.onBirthdayChange}
                                readOnly={this.state.readOnly}/>
                            <FormControl.Feedback />
                            <HelpBlock>{birthdayState.msg}</HelpBlock> 
                        </FormGroup>
                    </Form>
                    <Form inline>
                        <FormGroup
                            controlId={`contact-item-${this.state.original.contactid}-container-mobile`}
                            validationState={mobileState.state}>
                            <ControlLabel>手机</ControlLabel>
                            <FormControl
                                type="input" 
                                value={mobileState.value}
                                onChange={this.onMobileChange}
                                readOnly={this.state.readOnly}/>
                            <FormControl.Feedback />
                            <HelpBlock>{mobileState.msg}</HelpBlock> 
                        </FormGroup>
                        <FormGroup
                            controlId={`contact-item-${this.state.original.contactid}-container-email`}
                            validationState={emailState.state}>
                            <ControlLabel>邮箱</ControlLabel>
                            <FormControl
                                type="input" 
                                value={emailState.value}
                                onChange={this.onEmailChange}
                                readOnly={this.state.readOnly}/>
                            <FormControl.Feedback />
                            <HelpBlock>{emailState.msg}</HelpBlock> 
                        </FormGroup>
                    </Form>
                </Panel>
            </div>
        );
    }
});

module.exports = Contacts;
