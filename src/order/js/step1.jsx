/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { Button, Row, Col } from 'react-bootstrap';
import { Checkbox, message } from 'antd';

import GroupBrief from './group';
import Discount from './Discount'; 
import NoAuth from './noauth';
import Contacts from './contacts'

import 'antd/lib/index.css';

var Step1 = React.createClass({

    getInitialState: function() {
        return {
            'travelers': [],
            'agreement': false
        }
    },

    onContactChange: function(contacts) {
        this.setState({'travelers': contacts});
    },

    onAgreementCheck: function(e) {
        this.setState({'agreement': true});
    },

    onNextBtnClick: function(e) {
        if (this.state.agreement) {
            this.props.onNextBtnClick(e);
        } else {
            message.error('必须先同意安全协议');
        }
    },

    render: function() {
        return (
            <div>
                <Row>
                    <Col md={9}>
                        <Contacts 
                            onContactChange={this.onContactChange}/>
                    </Col>
                    <Col md={3}>
                        <GroupBrief 
                            group={this.props.order.group} 
                            travelers={this.state.travelers}/>
                    </Col>
                </Row>
                <Row>
                    <Col md={5} mdOffset={4}>
                        <div className="submit">
                            <Agreement 
                                agreement={this.props.order.agreement}
                                onAgreementCheck={this.onAgreementCheck} />
                            <Button 
                                bsStyle="primary" 
                                bsSize="large" 
                                type="submit" 
                                onClick={this.onNextBtnClick}>下一步</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
});

var Agreement = React.createClass({

    render: function() {
        var text = this.props.agreement ? '我已经同意安全协议' : '同意安全协议';
        return (
            <Checkbox
                defaultChecked={this.props.agreement} 
                onChange={ this.props.onAgreementCheck}>
                {text}
            </Checkbox>
        );
    }

});

module.exports = Step1;
