/**
 * @author xiezhenzong
 */
import React from 'react';
import { Panel, Form, FormGroup, FormControl, Col, ControlLabel, HelpBlock } from 'react-bootstrap';

import validator from 'validator';
import Email from 'email';
import Mobile from 'mobile';
import Address from 'address';
import Title from './title';
import call from '../../img/call.png';

var Contact = React.createClass({

    getInitialState: function() {
        return {
            'readOnly': true, // 是否不可编辑
            'isChange': false, // 是否被编辑过
        }
    },

    isChange: function(option) {
        
    },

    onChange: function() {

    },

    onRevertBtnClick: function() {
        this.setState(_revert(this.state.original));
    },

    onSubmitBtnClick: function() {
        console.log('ldldlld');
    },

    revert: function() {

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



module.exports = Contact;
