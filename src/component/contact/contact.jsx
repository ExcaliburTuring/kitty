/**
 * @author xiezhenzong
 */
import React from 'react';
import { Col, Button } from 'react-bootstrap';
import { Form } from 'antd';
 
import { idType } from 'config';
import Title from 'title';
import EditButtonGroup from 'editbtngroup';
import Name from 'name';
import Id from 'id';
import Gender from 'gender';
import Birthday from 'birthday';
import Email from 'email';
import Mobile from 'mobile';
import Address from 'address';
import FaButton from 'fabutton';

import 'antd/lib/index.css';
import './contact.less';

var Contact = React.createClass({

    isChange: function() {
        return this.refs.nameInput.isChange()
                || this.refs.idSelector.isChange()
                || this.refs.genderSelector.isChange()
                || this.refs.birthdaySelector.isChange()
                || this.refs.emailContainer.isChange()
                || this.refs.mobileContainer.isChange();
    },

    onChange: function() {
        if (this.isChange()) {
            this.setState({'isChange': true});
        } else {
            this.revert();
        } 
    },

    onIdChange: function() {
        this.onChange();
        var idSelector = this.refs.idSelector;
        if (idSelector.getIdType() == idType.IDENTIFICATION) { // 只有身份证修改的时候，才会触发
            var birthday = idSelector.getBirthday();
            if (birthday) {
                this.refs.birthdaySelector.setBirthday(birthday);
            }
            var gender = idSelector.getGender();
            if (gender) {
                this.refs.genderSelector.setGender(gender);
            }
        }
    },

    onRevertBtnClick: function() {
        this.revert();
    },

    onSubmitBtnClick: function() {
        var basicInfo = {};
        if (this.refs.nameInput.isChange()) {
            basicInfo['name'] = this.refs.nameInput.getName();
        }
        if (this.refs.idSelector.isChange()) {
            basicInfo['id'] = this.refs.idSelector.getId();
            basicInfo['idType'] = this.refs.idSelector.getIdType();
        }
        if (this.refs.genderSelector.isChange()) {
            basicInfo['gender'] = this.refs.genderSelector.getGender();
        }
        if (this.refs.birthdaySelector.isChange()) {
            basicInfo['birthday'] = this.refs.birthdaySelector.getBirthday();
        }
        if (this.refs.emailContainer.isChange()) {
            basicInfo['email'] = this.refs.emailContainer.getEmail();
        }
        if (this.refs.mobileContainer.isChange()) {
            basicInfo['mobile'] = this.refs.mobileContainer.getMobile();
        }
        console.log(basicInfo);
    },

    onMinusClick: function() {
        this.props.onMinusClick(this.props.index);
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
        this.refs.emailContainer.revert();
        this.refs.mobileContainer.revert();
    },

    getInitialState: function() {
        var readOnly = this.props.readOnly === undefined ? true : this.props.readOnly;
        return {
            'readOnly': readOnly, // 是否可以编辑
            'isChange': false, // 是否被编辑过
        }
    },

    render: function() {
        var contact = this.props.contact;
        var readOnly = this.state.readOnly;
        var readOnly1 = this.refs.idSelector
                        ? this.refs.idSelector.getIdType() === idType.IDENTIFICATION 
                        : contact.idType === idType.IDENTIFICATION;
        return (
            <div className="contacts-item-container clearfix">
                <Title title={contact.name} className="contact-title">
                    <EditButtonGroup
                        readOnly={readOnly}
                        isChange={this.state.isChange}
                        onEditBtnClick={() => {this.setState({'readOnly': false});}}
                        onCancelBtnClick={() => {this.setState({'readOnly': true});}}
                        onRevertBtnClick={this.onRevertBtnClick}
                        onSubmitBtnClick={this.onSubmitBtnClick}>
                        <FaButton faClass="fa fa-minus" onClick={this.onMinusClick} />
                    </EditButtonGroup>
                </Title>
                <Col md={6}>
                    <Form horizontal>
                        <Name
                            ref="nameInput"
                            defaultName={contact.name ? contact.name : ''}
                            controlId={`contact-item-${contact.contactid}-container-name`}
                            onChange={this.onChange}
                            readOnly={readOnly}/>
                        <Id
                            ref="idSelector"
                            defaultIdType={contact.idType ? contact.idType : idType.IDENTIFICATION}
                            defaultId={contact.id ? contact.id : ''}
                            controlId={`contact-item-${contact.contactid}-container-id`}
                            readOnly={readOnly}
                            onChange={this.onIdChange}/>
                        <Gender
                            ref="genderSelector"
                            defaultGender={contact.gender}
                            controlId={`contact-item-${contact.contactid}-container-gender`}
                            readOnly={readOnly1}
                            onChange={this.onChange}/>
                    </Form>
                </Col>
                <Col md={6}>
                    <Form horizontal>
                        <Birthday 
                            ref="birthdaySelector"
                            defaultBirthday={contact.birthday}
                            controlId={`contact-item-${contact.contactid}-container-birthday`}
                            readOnly={readOnly1}
                            onChange={this.onChange}/>
                        <Email
                            ref="emailContainer"
                            defaultEmail={contact.email}
                            controlId={`contact-item-${contact.contactid}-container-email`}
                            onChange={this.onChange}
                            readOnly={readOnly}/>
                        <Mobile
                            ref="mobileContainer"
                            defaultMobile={contact.mobile}
                            controlId={`contact-item-${contact.contactid}-container-mobile`}
                            onChange={this.onChange}
                            readOnly={readOnly}/>
                    </Form>
                </Col>
            </div>
        );
    }
});

module.exports = Contact;
