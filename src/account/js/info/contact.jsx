/**
 * @author xiezhenzong
 */
import React from 'react';
import { Panel, Form, FormGroup, FormControl, Col, ControlLabel, HelpBlock } from 'react-bootstrap';

import validator from 'validator';
import Title from './title';
import call from '../../img/call.png';

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
        'email': _init(original.email),
        'mobile': _init(original.mobile),
        'wxid': _init(original.wxid),
    }
}

var Contact = React.createClass({

    getInitialState: function() {
        var accountInfo = this.props.basicInfo.accountInfo;
        var accountSetting = this.props.basicInfo.accountSetting;
        return {
            'original': {
                'email': accountInfo.email,
                'mobile': accountInfo.mobile,
                'wxid': accountSetting.wxid,
            },
            'readOnly': true, // 是否可以编辑
            'isChange': false, // 是否被编辑过
            'email': _init(accountInfo.email),
            'mobile': _init(accountInfo.mobile),
            'wxid': _init(accountSetting.wxid),
        }
    },

    isChange: function(option) {
        if (option === undefined) { // 没有传option则比较全部
            option = ['email', 'mobile', 'wxid'];
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

    onWxidChange: function(e) {
        var value = e.target.value;
        var original = this.state.original;
        if (value === original.wxid) {
            var isChange = this.isChange(['email', 'mobile']);
            if (isChange) {
                this.setState({'wxid': _init(original.wxid)})
            } else {
                this.setState(_revert(original));
            }
        } else {
            var ret = validator.hasText(value, '微信号不能为空');
            this.setState({
                'isChange': true,
                'wxid': {
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
        console.log('ldldlld');
    },

    render: function() {
        var state = this.state;
        var emailState = state.email;
        var mobileState = state.mobile;
        var wxidState = state.wxid;
        var readOnly= state.readOnly;

        var content = null;

        if (readOnly == true) {
            content = (
                <div>
                    <FormGroup>
                        <Col componentClass={ControlLabel} md={2}>
                            邮箱:
                        </Col>
                        <Col md={5}>
                            <p>{emailState.value}</p>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} md={2}>
                            手机:
                        </Col>
                        <Col md={5}>
                            <p>{mobileState.value}</p>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} md={2}>
                            微信号:
                        </Col>
                        <Col md={5}>
                            <p>{wxidState.value}</p>
                        </Col>
                    </FormGroup>    
                </div>
            )
        } else if (readOnly == false) {
            content = (
                <div>
                    <FormGroup
                        controlId="contact-container-email"
                        validationState={emailState.state}>
                        <Col componentClass={ControlLabel} md={2}>
                            邮箱:
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
                        controlId="contact-container-mobile"
                        validationState={mobileState.state}>
                        <Col componentClass={ControlLabel} md={2}>
                            手机:
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
                    <FormGroup
                        controlId="contact-container-wxid"
                        validationState={wxidState.state}>
                        <Col componentClass={ControlLabel} md={2}>
                            微信号:
                        </Col>
                        <Col md={5}>
                            <FormControl
                                type="input"
                                value={wxidState.value}
                                onChange={this.onWxidChange}
                                readOnly={this.state.readOnly}/>
                            <FormControl.Feedback />
                            <HelpBlock>{wxidState.msg}</HelpBlock> 
                        </Col>
                    </FormGroup>
                </div>
            )
        }

        var title = (<Title
                        title="联系信息"
                        readOnly={this.state.readOnly}
                        isChange={this.state.isChange}
                        onEditBtnClick={() => {this.setState({'readOnly': false});}}
                        onCancelBtnClick={() => {this.setState({'readOnly': true});}}
                        onRevertBtnClick={this.onRevertBtnClick}
                        onSubmitBtnClick={this.onSubmitBtnClick}/>);
        return (
            <div className="contact-container info-section">
                <Panel header={title}>
                <Col md={2} >
                    <div className="left-block">
                        <img src={call} />
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

module.exports = Contact;
