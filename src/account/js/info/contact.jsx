/**
 * @author xiezhenzong
 */
import React from 'react';
import { Panel, Form, FormGroup, FormControl, Grid, Row, Col, ControlLabel, HelpBlock, Image } from 'react-bootstrap';

import validator from 'validator';
import Email from 'email';
import Mobile from 'mobile';
import Address from 'address';
import Title from './title';
import call from '../../img/call.png';
import { url } from 'config';

var Contact = React.createClass({

    getInitialState: function() {
        return {
            'readOnly': true, // 是否不可编辑
            'isChange': false, // 是否被编辑过
        }
    },

    isChange: function() {
        return this.refs.emailContainer.isChange()
                || this.refs.mobileContainer.isChange()
                || this.refs.addressContainer.isChange();
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
        if (this.refs.emailContainer.isChange()) {
            basicInfo['email'] = this.refs.emailContainer.getEmail();
        }
        if (this.refs.mobileContainer.isChange()) {
            basicInfo['mobile'] = this.refs.mobileContainer.getMobile();
        }
        if (this.refs.addressContainer.isChange()) {
            basicInfo['address'] = this.refs.addressContainer.getAddress();
        }
        console.log(basicInfo);
        $.post(url.basicinfo, basicInfo)
        .done(function(data) {
            console.log('kdkdkdk')
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
        this.refs.emailContainer.revert();
        this.refs.mobileContainer.revert();
        this.refs.addressContainer.revert();
    },

    render: function() {
        var accountInfo = this.props.basicInfo.accountInfo;
        var accountSetting = this.props.basicInfo.accountSetting;
        var readOnly= this.state.readOnly;

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
                    <Col smHidden xsHidden md={2} >
                        <div className="left-block">
                            <Image src={call} />
                        </div>
                    </Col>
                    <Col sm={12} xs={12} md={10}>
                        <Form horizontal>
                            <Email
                                ref="emailContainer"
                                defaultEmail={accountInfo.email}
                                controlId="contact-container-email"
                                onChange={this.onChange}
                                readOnly={readOnly}/>
                            <Mobile 
                                ref="mobileContainer"
                                defaultMobile={accountInfo.mobile}
                                controlId="contact-container-mobile"
                                onChange={this.onChange}
                                readOnly={readOnly}/>
                            <Address 
                                ref="addressContainer"
                                defaultAddress={accountSetting.address}
                                controlId="contact-container-address"
                                onChange={this.onChange}
                                readOnly={readOnly}/>
                        </Form>
                    </Col>
                </Panel>
            </div>
        );
    }
});

module.exports = Contact;
