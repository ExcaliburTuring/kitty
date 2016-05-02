/**
 * @author xiezhenzong
 */
import React from 'react';
import { Panel, Form, FormGroup, FormControl, Grid, Row, Col, ControlLabel, HelpBlock, Image } from 'react-bootstrap';

import { idType, gender } from 'config';
import validator from 'validator';
import Id from 'id';
import Gender from 'gender';
import Birthday from 'birthday';
import Title from './title';
import info from  '../../img/person.png'

var BasicInfo = React.createClass({

    getInitialState: function() {
        return {
            'readOnly': true, // 是否不可编辑
            'isChange': false, // 是否被编辑过
        }
    },

    isChange: function() {
        return this.refs.nameInput.isChange()
                || this.refs.idSelector.isChange()
                || this.refs.genderSelector.isChange()
                || this.refs.birthdaySelector.isChange();
    },

    onChange: function() {
        if (this.isChange) {
            this.setState({'isChange': true});
        } else {
            this.revert();
        } 
    },

    onIdChange: function() {
        this.onChange();
        var idSelector = this.refs.idSelector;
        if (idSelector.getIdType() == idType.IDENTIFICATION) { // 只有身份证修改的时候，才会触发
            console.log('IDENTIFICATION')
            var birthday = idSelector.getBirthday();
            console.log(birthday);
            if (birthday) {
                this.refs.birthdaySelector.setBirthday(birthday);
            }
            var gender = idSelector.getGender();
            console.log(gender);
            if (gender) {
                this.refs.genderSelector.setGender(gender);
            }
        }
    },

    onRevertBtnClick: function() {
        this.revert();
    },

    onSubmitBtnClick: function() {
        console.log('kdkdk');
    },

    revert: function() {
        this.setState({
            'readOnly': false,
            'isChange': false
        });
        this.refs.nameInput.revert();
        this.refs.idSelector.revert();
        this.refs.genderSelector.revert();
        this.refs.birthdaySelector.revert();
    },

    render: function() {
        var accountInfo = this.props.basicInfo.accountInfo;
        var accountSetting = this.props.basicInfo.accountSetting;
        var readOnly= this.state.readOnly;
        var readOnly1 = this.refs.idSelector
                        ? this.refs.idSelector.getIdType() === idType.IDENTIFICATION 
                        : accountInfo.idType === idType.IDENTIFICATION;
        console.log( this.refs.idSelector
                        ? this.refs.idSelector.getIdType() : 'kdkdkd');
        var title = (<Title
                        title="基本信息"
                        readOnly={readOnly}
                        isChange={this.state.isChange}
                        onEditBtnClick={() => {this.setState({'readOnly': false});}}
                        onCancelBtnClick={() => {this.setState({'readOnly': true});}}
                        onRevertBtnClick={this.onRevertBtnClick}
                        onSubmitBtnClick={this.onSubmitBtnClick}/>);
        return (
            <div className="basic-container info-section">
                <Panel header={title}>
                    <Col smHidden xsHidden md={2}>
                        <div className="left-block">
                            <Image src={info}/>
                        </div>
                    </Col>
                    <Col sm={12} xs={12} md={10}>
                        <Grid>
                            <Form horizontal>
                                <Row>
                                    <Name
                                        ref="nameInput"
                                        defaultName={accountInfo.name}
                                        controlId="basic-container-name"
                                        onChange={this.onChange}
                                        readOnly={readOnly}/>
                                </Row>
                                <Row>
                                    <Id 
                                        ref="idSelector"
                                        defaultIdType={accountInfo.idType}
                                        defaultId={accountInfo.id}
                                        controlId="basic-container-id"
                                        readOnly={readOnly}
                                        onChange={this.onIdChange}/>
                                </Row>
                                <Row>
                                    <Gender
                                        ref="genderSelector"
                                        defaultGender={accountSetting.gender}
                                        controlId="basic-container-gender"
                                        readOnly={readOnly1}
                                        onChange={this.onChange}/>
                                </Row>
                                <Row>
                                    <Birthday 
                                        ref="birthdaySelector"
                                        defaultBirthday={accountSetting.birthday}
                                        controlId="basic-container-birthday"
                                        readOnly={readOnly1}
                                        onChange={this.onChange}/>
                                </Row>
                            </Form>
                        </Grid>
                    </Col>
                </Panel>
            </div>
        );
    }

});

var Name = React.createClass({

    getName: function() {
        return this.state.name;
    },

    isChange: function() {
        return this.state.name !== this.props.defaultName;
    },

    onChange: function(e) {
        var value = e.target.value;
        if (this.state.name === value) {
            return;
        }
        var ret = validator.name(value);
        this.setState({
            'name': e.target.value,
            'validationState': ret['state'],
            'msg': ret['msg']
        })
        this.props.onChange(e, name);
    },

    revert: function() {
        this.setState({
            'name': this.props.defaultName,
            'validationState': null,
            'msg': '',
        });
    },

    getInitialState: function() {
        return {
            'name': this.props.defaultName,
            'validationState': null,
            'msg': '',
        }
    },

    render: function() {
        var content;
        if (this.props.readOnly) {
            content = (
                <Col md={3}> <p>{this.state.name}</p> </Col>
             );
        } else {
            content = (
                <Col md={3}>
                    <FormControl
                        type="input"
                        value={this.state.name}
                        onChange={this.onChange}/>
                    <FormControl.Feedback />
                </Col>
            );
        }
        return (
            <FormGroup
                controlId={this.props.controlId}
                validationState={this.state.validationState}>
                <Col componentClass={ControlLabel} md={2}>
                    姓名
                </Col>
                {content}
                <Col smHidden xsHidden md={2}>
                    <HelpBlock>{this.state.msg}</HelpBlock> 
                </Col>
            </FormGroup>
        );
    }

});

module.exports = BasicInfo;
