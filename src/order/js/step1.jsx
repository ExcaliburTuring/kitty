/**
 * @author xiezhenzong 
 */
import React from 'react';
import { Button } from 'react-bootstrap';
import { Checkbox, message } from 'antd';

import Contacts from './contacts'

import 'antd/lib/index.css';

var Step1 = React.createClass({

    render: function() {
        return (
            <div className="order-step1">
                <Contacts 
                    accountInfo={this.props.accountInfo}
                    accountSetting={this.props.accountSetting}
                    isAccountSelect={this.props.isAccountSelect}
                    quota={this.props.quota}
                    onAccountChange={this.props.onAccountChange}
                    onContactChange={this.props.onContactChange}/>
                <div className="submit pull-right">
                    <Agreement 
                        isAgreed={this.props.orderInfo.isAgreed}
                        onAgreementCheck={this.props.onAgreementCheck} />
                    <Button 
                        bsStyle="primary"
                        bsSize="large" 
                        type="submit" 
                        onClick={this.props.onNextBtnClick}>下一步</Button>
                </div>
            </div>
        );
    }
});

var Agreement = React.createClass({

    render: function() {
        var text = this.props.isAgreed ? '我已经同意安全协议' : '同意安全协议';
        return (
            <label>
                <Checkbox
                    defaultChecked={this.props.isAgreed} 
                    onChange={ this.props.onAgreementCheck}/>
                {text}
            </label>
        );
    }

});

module.exports = Step1;
