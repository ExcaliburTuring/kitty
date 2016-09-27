/**
 * @author xiezhenzong
 */
import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { Form, Button, Icon, message } from 'antd';
const ButtonGroup = Button.Group;

import AccountBasicInfo from 'account_basicinfo';
import { idType, gender, accountStatus, url, defaultValue } from 'config';
import Title from 'title';
import Name from 'name';
import Id from 'id';
import Gender from 'gender';
import Birthday from 'birthday';
import Email from 'email';
import Mobile from 'mobile';
import Address from 'address';

var BasicInfo = React.createClass({

    isChange: function() {
        return this.refs.nameInput.isChange()
                || this.refs.idSelector.isChange()
                || this.refs.genderSelector.isChange()
                || this.refs.birthdaySelector.isChange()
                || this.refs.emailContainer.isChange()
                || this.refs.mobileContainer.isChange()
                || this.refs.addressContainer.isChange();
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
        this.refs.addressContainer.revert();
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
                this.refs.birthdaySelector.setValue(birthday);
            } else {
                this.refs.birthdaySelector.revert();
            }
            var gender = idSelector.getGender();
            if (gender) {
                this.refs.genderSelector.setValue(gender);
            } else {
                this.refs.genderSelector.revert();
            }
        }
    },

    onCancelBtnClick: function() {
        if (this.state.isChange) {
            this.revert();
        } else {
            this.setState({'readOnly': true});
        }
    },

    onSubmitBtnClick: function() {
        if (!this.state.isChange) {
            return;
        }
        if (this.refs.nameInput.validate() != 'success'
            || this.refs.idSelector.validate()!= 'success'
            || this.refs.genderSelector.validate() != 'success'
            || this.refs.birthdaySelector.validate() != 'success'
            || this.refs.emailContainer.validate() != 'success'
            || this.refs.mobileContainer.validate() != 'success'
            || this.refs.addressContainer.validate() != 'success') {
            return;
        }
        var basicInfo = {'accountid': this.props.accountInfo.accountid};
        if (this.refs.nameInput.isChange()) {
            basicInfo['name'] = this.refs.nameInput.getValue();
        }
        if (this.refs.idSelector.isChange()) {
            basicInfo['id'] = this.refs.idSelector.getId();
            basicInfo['idType'] = this.refs.idSelector.getIdType();
        }
        if (this.refs.genderSelector.isChange()) {
            basicInfo['gender'] = this.refs.genderSelector.getValue();
        }
        if (this.refs.birthdaySelector.isChange()) {
            basicInfo['birthday'] = this.refs.birthdaySelector.getValue();
        }
        if (this.refs.emailContainer.isChange()) {
            basicInfo['email'] = this.refs.emailContainer.getValue();
        }
        if (this.refs.mobileContainer.isChange()) {
            basicInfo['mobile'] = this.refs.mobileContainer.getValue();
        }
        if (this.refs.addressContainer.isChange()) {
            basicInfo['address'] = this.refs.addressContainer.getValue();
        }
        var self = this;
        $.post(url.accountInfo, basicInfo)
        .done(function(data) {
            AccountBasicInfo.actions.load();
            self.setState({
                'readOnly': true,
                'isChange': false
            })
            self.refs.nameInput.cleanValidate();
            self.refs.idSelector.cleanValidate();
            self.refs.genderSelector.cleanValidate();
            self.refs.birthdaySelector.cleanValidate();
            self.refs.emailContainer.cleanValidate();
            self.refs.mobileContainer.cleanValidate();
            self.refs.addressContainer.cleanValidate();
            message.success('更新成功');
        }).fail(function() {
            message.error(defaultValue.updateAccountMsg);
        });
    },

    getInitialState: function() {
        return {
            'readOnly': this.props.accountInfo.status !== accountStatus.WAIT_COMPLETE_INFO, // 是否不可编辑
            'isChange': false, // 是否被编辑过
        }
    },

    render: function() {
        var accountInfo = this.props.accountInfo;
        var readOnly= this.state.readOnly;
        var readOnly1 = readOnly || (this.refs.idSelector
                        ? this.refs.idSelector.getIdType() === idType.IDENTIFICATION 
                        : accountInfo.idType === idType.IDENTIFICATION);
        return (
            <div className="basic-container info-section">
                <Title title="基本信息" className="info-title">
                    <button className="edit-btn" onClick={() => {this.setState({'readOnly': false})}}>
                        <Icon type="edit"/>
                        <span> 编辑</span>
                    </button>
                </Title>
                <Row className="basic-info-container">
                    <Col xs={12} md={6}>
                        <Form horizontal>
                            <Name
                                ref="nameInput"
                                defaultValue={accountInfo.name}
                                onChange={this.onChange}
                                readOnly={readOnly}/>
                            <Id 
                                ref="idSelector"
                                defaultIdType={accountInfo.idType}
                                defaultId={accountInfo.id}
                                readOnly={readOnly}
                                onChange={this.onIdChange}/>
                            <Gender
                                ref="genderSelector"
                                defaultValue={accountInfo.gender}
                                readOnly={readOnly1}
                                onChange={this.onChange}/>
                            <Birthday 
                                ref="birthdaySelector"
                                defaultValue={accountInfo.birthday}
                                readOnly={readOnly1}
                                onChange={this.onChange}/>
                        </Form>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form horizontal>
                            <Email
                                ref="emailContainer"
                                defaultValue={accountInfo.email}
                                onChange={this.onChange}
                                readOnly={readOnly}/>
                            <Mobile 
                                ref="mobileContainer"
                                defaultValue={accountInfo.mobile}
                                onChange={this.onChange}
                                readOnly={readOnly}/>
                            <Address 
                                ref="addressContainer"
                                defaultValue={accountInfo.address}
                                onChange={this.onChange}
                                readOnly={readOnly}/>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col lg={3} md={3} xs={3} xsOffset={4}>
                        <button className="confirm-btn pull-left" onClick={this.onSubmitBtnClick}>
                            <Icon type="check"/>
                            <span> 确定</span>
                        </button>
                        <button className="cancel-btn pull-right" onClick={this.onCancelBtnClick}>
                            <Icon type="cross"/>
                            <span> {this.state.isChange ? '撤销' : '取消'}</span>
                        </button>
                    </Col>
                </Row>
            </div>
        );
    }

});

module.exports = BasicInfo;
