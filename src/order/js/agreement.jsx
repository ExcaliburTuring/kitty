/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { Row, Col } from 'react-bootstrap';
import { Alert, Checkbox, Icon, Button, Modal, Input, message } from 'antd';

import AccountBasicInfo from 'account_basicinfo';
import { url, accountStatus } from 'config';
import validator from 'validator';
import Rabbit from 'rabbit';
import Contact from 'contact';
import Title from 'title';
import { NewModal, NewBtn } from 'new';

import 'antd/lib/index.css';

var Agreement = React.createClass({

    _createTravellerName: function() {
        var selectTravellers = this.props.selectTravellers;
        var travellers = selectTravellers[0].name;
        for (var i = 1, n = selectTravellers.length; i < n; i++) {
            var t = selectTravellers[i];
            travellers = travellers + ',' + t.name;
        }
        return travellers;
    },

    _createContractLink: function() {
        var orderid = `orderid=${this.props.orderid}`;
        var travellers = `travellers=${this._createTravellerName()}`;
        var count = `count=${this.props.count}`;
        var price = `price=${this.props.price}`;
        var actualPrice = `actualPrice=${this.props.actualPrice}`;
        return `/order/contract/travel_contract.pdf?${orderid}&${travellers}&${count}&${price}&${actualPrice}`;
    },

    render: function() {
        return (
            <div className="agreement-container clearfix">
                请仔细阅读并签署
                <label className="order-agree text-center">
                    <Checkbox
                        defaultChecked={this.props.isAgreed} 
                        onChange={this.props.onAgreementCheck}/>
                    <a href={this._createContractLink()} target="_blank">
                        安全协议
                    </a>
                </label>
                <label>
                    <a href="/index/hxy_secure_notice.pdf" target="_blank">
                        报名须知
                    </a>
                </label>
                <label>
                    <a href="/index/hxy_signup_notice.pdf" target="_blank">
                        海逍遥安全告知书
                    </a>
                </label>
            </div>
        );
    }

});

module.exports = Agreement;
