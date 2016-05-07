/**
 * @author xiezhenzong
 */
import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

import validator from 'validator';
import Name from 'name';
import Id from 'id';
import Gender from 'gender';
import Birthday from 'birthday';
import Email from 'email';
import Mobile from 'mobile';
import Address from 'address';
import Title from './title2';

var ContactItem = React.createClass({

    isChange: function() {
        return this.refs.nameInput.isChange()
                || this.refs.idSelector.isChange()
                || this.refs.genderSelector.isChange()
                || this.refs.birthdaySelector.isChange()
                || this.refs.emailContainer.isChange()
                || this.refs.mobileContainer.isChange();
    },

    onChange: function() {
        if (this.isChange) {
            this.setState({'isChange': true});
        } else {
            this.revert();
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
        return {
            'readOnly': true, // 是否可以编辑
            'isChange': false, // 是否被编辑过
        }
    },

    render: function() {
        var contact = this.props.contact;
        var readOnly = this.state.readOnly;
        return (
            <div className="contacts-item-container">
                <Title 
                    title={contact.name}
                    isChange={this.state.isChange}
                    readOnly={readOnly}
                    onEditBtnClick={() => {this.setState({'readOnly': false});}}
                    onRevertBtnClick={this.onRevertBtnClick}/>
                <Row>
                    <Col md={6}>
                        <Form horizontal>
                            <Name
                                ref="nameInput"
                                defaultName={contact.name}
                                controlId={`contact-item-${contact.contactid}-container-name`}
                                onChange={this.onChange}
                                readOnly={readOnly}/>
                            <Id
                                ref="idSelector"
                                defaultIdType={contact.idType}
                                defaultId={contact.id}
                                controlId={`contact-item-${contact.contactid}-container-id`}
                                readOnly={readOnly}
                                onChange={this.onChange}/>
                            <Gender
                                ref="genderSelector"
                                defaultGender={contact.gender}
                                controlId={`contact-item-${contact.contactid}-container-gender`}
                                readOnly={readOnly}
                                onChange={this.onChange}/>
                        </Form>
                    </Col>
                    <Col md={6}>
                        <Form horizontal>
                            <Birthday 
                                ref="birthdaySelector"
                                defaultBirthday={contact.birthday}
                                controlId={`contact-item-${contact.contactid}-container-birthday`}
                                readOnly={readOnly}
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
                </Row>
                {
                    readOnly
                    ? null
                    : 
                        <Row>
                            <div className="contact-item-btn-group">
                                <Button className="save"  onClick={this.onSubmitBtnClick}>保存</Button>
                                <Button className="cancel"  onClick={() => {this.setState({'readOnly': true});}} >取消</Button>
                            </div>
                        </Row>
                    
                }
            </div>
        );
    }
});

module.exports = ContactItem;
