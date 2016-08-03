/**
 * @author xiezhenzong
 */
import React from 'react';
import { Col, Image } from 'react-bootstrap';
import { Form, message } from 'antd';

import { accountStatus, url, defaultValue } from 'config';
import AccountBasicInfo from 'account_basicinfo';
import Title from 'title';
import EditButtonGroup from 'editbtngroup'; 
import Email from 'email';
import Mobile from 'mobile';
import Address from 'address';
import call from '../../img/call.png';

var Contact = React.createClass({

    isChange: function() {
        return this.refs.emailContainer.isChange()
                || this.refs.mobileContainer.isChange()
                || this.refs.addressContainer.isChange();
    },

    onChange: function() {
        if (this.isChange()) {
            this.setState({'isChange': true});
        } else {
            this.revert();
        } 
    },

    onRevertBtnClick: function() {
        this.revert();
    },

    onSubmitBtnClick: function() {
        var basicInfo = {'accountid': this.props.accountInfo.accountid};
        if (this.refs.emailContainer.isChange()) {
            basicInfo['email'] = this.refs.emailContainer.getEmail();
        }
        if (this.refs.mobileContainer.isChange()) {
            basicInfo['mobile'] = this.refs.mobileContainer.getMobile();
        }
        if (this.refs.addressContainer.isChange()) {
            basicInfo['address'] = this.refs.addressContainer.getAddress();
        }
        var self = this;
        $.post(url.accountInfo, basicInfo)
        .done(function(data) {
            AccountBasicInfo.actions.load();
            self.setState({
                'readOnly': true,
                'isChange': false
            });
            self.refs.emailContainer.cleanValidate();
            self.refs.mobileContainer.cleanValidate();
            self.refs.addressContainer.cleanValidate();
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
        this.refs.emailContainer.revert();
        this.refs.mobileContainer.revert();
        this.refs.addressContainer.revert();
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

        return (
            <div className="contact-container info-section">
                <Title title="联系信息" className="info-title">
                    <EditButtonGroup 
                        readOnly={this.state.readOnly}
                        isChange={this.state.isChange}
                        onEditBtnClick={() => {this.setState({'readOnly': false});}}
                        onCancelBtnClick={() => {this.setState({'readOnly': true});}}
                        onRevertBtnClick={this.onRevertBtnClick}
                        onSubmitBtnClick={this.onSubmitBtnClick}/>
                </Title>
                <Col xsHidden md={2} >
                    <div className="left-block">
                        <Image responsive src={call} />
                    </div>
                </Col>
                <Col xs={12} md={5}>
                    <Form horizontal>
                        <Email
                            ref="emailContainer"
                            defaultEmail={accountInfo.email}
                            onChange={this.onChange}
                            readOnly={readOnly}/>
                        <Mobile 
                            ref="mobileContainer"
                            defaultMobile={accountInfo.mobile}
                            onChange={this.onChange}
                            readOnly={readOnly}/>
                        <Address 
                            ref="addressContainer"
                            defaultAddress={accountSetting.address}
                            onChange={this.onChange}
                            readOnly={readOnly}/>
                    </Form>
                </Col>
            </div>
        );
    }
});

module.exports = Contact;
