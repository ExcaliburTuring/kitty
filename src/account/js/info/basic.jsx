/**
 * @author xiezhenzong
 */
import React from 'react';
import { Panel, Form, Col, Image } from 'react-bootstrap';

import { idType, gender } from 'config';
import validator from 'validator';
import Name from 'name';
import Id from 'id';
import Gender from 'gender';
import Birthday from 'birthday';
import Title from './title';
import info from  '../../img/person.png'
import { url } from 'config';

var BasicInfo = React.createClass({

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
        var basicInfo = {'accountid': this.props.basicInfo.accountInfo.accountid};
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

        console.log(basicInfo);
        $.post(url.basicinfo, basicInfo)
        .done(function(data) {
            console.log(data);
        }).fail(function(data) {
            console.log(data);
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
            'readOnly': true, // 是否不可编辑
            'isChange': false, // 是否被编辑过
        }
    },

    render: function() {
        var accountInfo = this.props.basicInfo.accountInfo;
        var accountSetting = this.props.basicInfo.accountSetting;
        var readOnly= this.state.readOnly;
        var readOnly1 = this.refs.idSelector
                        ? this.refs.idSelector.getIdType() === idType.IDENTIFICATION 
                        : accountInfo.idType === idType.IDENTIFICATION;
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
                        <Form horizontal>
                            <Name
                                ref="nameInput"
                                defaultName={accountInfo.name}
                                controlId="basic-container-name"
                                onChange={this.onChange}
                                readOnly={readOnly}
                                inlineErrMsg={true}/>
                            <Id 
                                ref="idSelector"
                                defaultIdType={accountInfo.idType}
                                defaultId={accountInfo.id}
                                controlId="basic-container-id"
                                readOnly={readOnly}
                                onChange={this.onIdChange}/>
                            <Gender
                                ref="genderSelector"
                                defaultGender={accountSetting.gender}
                                controlId="basic-container-gender"
                                readOnly={readOnly1}
                                onChange={this.onChange}/>
                            <Birthday 
                                ref="birthdaySelector"
                                defaultBirthday={accountSetting.birthday}
                                controlId="basic-container-birthday"
                                readOnly={readOnly1}
                                onChange={this.onChange}/>
                        </Form>
                    </Col>
                </Panel>
            </div>
        );
    }

});

module.exports = BasicInfo;
