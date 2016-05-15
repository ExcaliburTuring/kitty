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
                    quota={this.props.quota}
                    onContactChange={this.props.onContactChange}/>
                <div className="submit">
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
            <Checkbox
                defaultChecked={this.props.isAgreed} 
                onChange={ this.props.onAgreementCheck}>
                {text}
            </Checkbox>
        );
    }

});

module.exports = Step1;
