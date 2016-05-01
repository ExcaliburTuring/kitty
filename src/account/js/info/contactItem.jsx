/**
 * @author xiezhenzong
 */
import React from 'react';
import { FormGroup, FormControl, Col, ControlLabel, HelpBlock, Panel } from 'react-bootstrap';
import Title from './title2.jsx';
import validator from 'validator';

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
        var readOnly = state.readOnly;

        var content = null;

        if (readOnly == true) {
            content = (
                <div className="item-container">
                    <FormGroup>
                        <Col md={2}>
                            <p className="left-info">姓名:</p>
                        </Col>
                        <Col md={4}>
                            <p>{nameState.value}</p>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col md={2} mdPull={1}>
                            <p className="left-info">id:</p>
                        </Col>
                        <Col md={4} mdPull={1}>
                            <p>{idState.value}</p>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col md={2}>
                            <p className="left-info">性别:</p>
                        </Col>
                        <Col md={4}>
                            <p>{genderState.value}</p>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col md={2} mdPull={1}>
                            <p className="left-info">生日:</p>
                        </Col>
                        <Col md={4} mdPull={1}>
                            <p>{birthdayState.value}</p>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col md={2}>
                            <p className="left-info">手机:</p>
                        </Col>
                        <Col md={4}>
                            <p>{mobileState.value}</p>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col md={2} mdPull={1}>
                            <p className="left-info">邮箱:</p>
                        </Col>
                        <Col md={4} mdPull={1}>
                            <p>{emailState.value}</p>
                        </Col>
                    </FormGroup>    
                </div>
            )
        } else if (readOnly == false) {
            content = (
                <div className="item-container">
                    <FormGroup
                        controlId={`contact-item-${this.state.original.contactid}-container-name`}
                        validationState={nameState.state}>
                        <Col md={2}>
                            <p className="left-info">姓名:</p>
                        </Col>
                        <Col md={4}>
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
                        controlId={`contact-item-${this.state.original.contactid}-container-id`}
                        validationState={idState.state}>
                        <Col md={2}>
                            <p className="left-info">id:</p>
                        </Col>
                        <Col md={4}>
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
                        controlId={`contact-item-${this.state.original.contactid}-container-gender`}
                        validationState={genderState.state}>
                        <Col md={2}>
                            <p className="left-info">性别:</p>
                        </Col>
                        <Col md={4}>
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
                        controlId={`contact-item-${this.state.original.contactid}-container-birthday`}
                        validationState={birthdayState.state}>
                        <Col md={2}>
                            <p className="left-info">生日:</p>
                        </Col>
                        <Col md={4}>
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
                        controlId={`contact-item-${this.state.original.contactid}-container-mobile`}
                        validationState={mobileState.state}>
                        <Col md={2}>
                            <p className="left-info">手机:</p>
                        </Col>
                        <Col md={4}>
                            <FormControl
                                type="input" 
                                value={mobileState.value}
                                onChange={this.onMobileChange}
                                readOnly={this.state.readOnly}/>
                            <FormControl.Feedback />
                            <HelpBlock>{mobileState.msg}</HelpBlock> 
                        </Col>
                    </FormGroup>
                    <FormGroup
                        controlId={`contact-item-${this.state.original.contactid}-container-email`}
                        validationState={emailState.state}>
                        <Col md={2}>
                            <p className="left-info">邮箱:</p>
                        </Col>
                        <Col md={4}>
                            <FormControl
                                type="input" 
                                value={emailState.value}
                                onChange={this.onEmailChange}
                                readOnly={this.state.readOnly}/>
                            <FormControl.Feedback />
                            <HelpBlock>{emailState.msg}</HelpBlock> 
                        </Col>
                    </FormGroup>
                    <Col md={4} mdOffset={4}>
                        <Col md={5}>
                            <button className="save"  onClick={this.onSubmitBtnClick}>保存</button>
                        </Col>
                        <Col md={5} mdOffset={2}>
                            <button className="cancel"  onClick={() => {this.setState({'readOnly': true});}} >取消</button>
                        </Col>
                    </Col>
                </div>
            )
        }

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
                    {content}
                </Panel>
            </div>
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

module.exports = ContactItem;