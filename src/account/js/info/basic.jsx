/**
 * @author xiezhenzong
 */
import React from 'react';
import { Panel, Form, FormGroup, FormControl, Col, ControlLabel, HelpBlock } from 'react-bootstrap';
import validator from 'validator';
import Title from './title';
import info from  '../../img/person.png'

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
    }
}

var BasicInfo = React.createClass({

    getInitialState: function() {
        var accountInfo = this.props.basicInfo.accountInfo;
        var accountSetting = this.props.basicInfo.accountSetting;
        return {
            'original': {
                'name': accountInfo.name,
                'id': accountInfo.id,
                'gender': accountSetting.gender,
                'birthday': accountSetting.birthday
            },
            'readOnly': true, // 是否可以编辑
            'isChange': false, // 是否被编辑过
            'name': _init(accountInfo.name),
            'id': _init(accountInfo.id),
            'gender': _init(accountSetting.gender),
            'birthday': _init(accountSetting.birthday)
        }
    },

    isChange: function(option) {
        if (option === undefined) { // 没有传option则比较全部
            option = ['name', 'id', 'gender', 'birthday'];
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

    onRevertBtnClick: function() {
        this.setState(_revert(this.state.original));
    },

    onSubmitBtnClick: function() {
        console.log('kdkdk');
    },

    render: function() {
        var state = this.state;
        var nameState = state.name;
        var idState = state.id;
        var genderState = state.gender;
        var birthdayState = state.birthday;
        var readOnly= state.readOnly;

        var content = null;

        if (readOnly == true) {
            content = (
                <div>
                    <FormGroup>
                        <Col componentClass={ControlLabel} md={2}>
                            姓名:
                        </Col>
                        <Col md={5}>
                            <p>{nameState.value}</p>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} md={2}>
                            证件号:
                        </Col>
                        <Col md={5}>
                            <p>{idState.value}</p>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} md={2}>
                            性别:
                        </Col>
                        <Col md={5}>
                            <p>{genderState.value}</p>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} md={2}>
                            生日:
                        </Col>
                        <Col md={5}>
                            <p>{birthdayState.value}</p>
                        </Col>
                    </FormGroup>
                </div>
            )
        } else if (readOnly == false) {
            content = (
                <div>
                    <FormGroup
                        controlId="basic-container-name"
                        validationState={nameState.state}>
                        <Col componentClass={ControlLabel} md={2}>
                            姓名:
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
                        controlId="basic-container-id"
                        validationState={idState.state}>
                        <Col componentClass={ControlLabel} md={2}>
                            证件号:
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
                        controlId="basic-container-gender"
                        validationState={genderState.state}>
                        <Col componentClass={ControlLabel} md={2}>
                            性别:
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
                        controlId="basic-container-birthday"
                        validationState={birthdayState.state}>
                        <Col componentClass={ControlLabel} md={2}>
                            生日:
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
                </div>
            )
        }

        var title = (<Title
                        title="基本信息"
                        readOnly={this.state.readOnly}
                        isChange={this.state.isChange}
                        onEditBtnClick={() => {this.setState({'readOnly': false});}}
                        onCancelBtnClick={() => {this.setState({'readOnly': true});}}
                        onRevertBtnClick={this.onRevertBtnClick}
                        onSubmitBtnClick={this.onSubmitBtnClick}/>);
        return (
            <div className="basic-container info-section">
                <Panel header={title}>
                    <Col md={2} >
                        <div className="left-block">
                            <img src={info}/>
                        </div>
                    </Col>
                    <Col md={10}>
                            <Form horizontal>
                                {content}
                            </Form>
                    </Col>
                </Panel>
            </div>
        );
    }

});

module.exports = BasicInfo;
