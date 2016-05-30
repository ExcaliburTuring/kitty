/**
 * @author xiezhenzong
 */
import React from 'react';
import { Col, Image } from 'react-bootstrap';
import { Form, message } from 'antd';

import AccountBasicInfo from 'account_basicinfo';
import { idType, gender, accountStatus, url, defaultValue } from 'config';
import Title from 'title';
import EditButtonGroup from 'editbtngroup';
import Name from 'name';
import Id from 'id';
import Gender from 'gender';
import Birthday from 'birthday';

import info from  '../../img/person.png'

var BasicInfo = React.createClass({

    isChange: function() {
        return this.refs.nameInput.isChange()
                || this.refs.idSelector.isChange()
                || this.refs.genderSelector.isChange()
                || this.refs.birthdaySelector.isChange();
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
        var basicInfo = {'accountid': this.props.accountInfo.accountid};
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
            message.success('更新成功');
        }).fail(function() {
            message.error(defaultValue.updateAccountMsg);
        });
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

    getInitialState: function() {
        return {
            'readOnly': this.props.accountInfo.status !== accountStatus.WAIT_COMPLETE_INFO, // 是否不可编辑
            'isChange': false, // 是否被编辑过
        }
    },

    render: function() {
        var accountInfo = this.props.accountInfo;
        var accountSetting = this.props.accountSetting;
        var readOnly= this.state.readOnly;
        var readOnly1 = this.refs.idSelector
                        ? this.refs.idSelector.getIdType() === idType.IDENTIFICATION 
                        : accountInfo.idType === idType.IDENTIFICATION;
        return (
            <div className="basic-container info-section">
                <Title title="基本信息" className="info-title">
                    <EditButtonGroup
                        readOnly={readOnly}
                        isChange={this.state.isChange}
                        onEditBtnClick={() => {this.setState({'readOnly': false});}}
                        onCancelBtnClick={() => {this.setState({'readOnly': true});}}
                        onRevertBtnClick={this.onRevertBtnClick}
                        onSubmitBtnClick={this.onSubmitBtnClick} />
                </Title>
                <Col smHidden xsHidden md={2}>
                    <div className="left-block">
                        <Image responsive src={info}/>
                    </div>
                </Col>
                <Col sm={12} xs={12} md={5}>
                    <Form horizontal>
                        <Name
                            ref="nameInput"
                            defaultName={accountInfo.name}
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
                            defaultGender={accountSetting.gender}
                            readOnly={readOnly1}
                            onChange={this.onChange}/>
                        <Birthday 
                            ref="birthdaySelector"
                            defaultBirthday={accountSetting.birthday}
                            readOnly={readOnly1}
                            onChange={this.onChange}/>
                    </Form>
                </Col>
            </div>
        );
    }

});

module.exports = BasicInfo;
