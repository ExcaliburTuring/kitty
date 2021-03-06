/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { Checkbox, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
const AgreeItem = Checkbox.AgreeItem;

import { url }  from 'config';
import Rabbit from 'rabbit';

var Agreement = React.createClass({

    _createTravellerName: function() {
        var travellers = this.props.travellers;
        var selectTravellers = this.props.selectTravellers;
        var names = travellers[selectTravellers[0]].name;
        for (var i = 1, n = selectTravellers.length; i < n; i++) {
            names = names + ',' + travellers[selectTravellers[i]].name;
        }
        return names;
    },

    _createContractLink: function() {
        var orderid = `orderid=${this.props.orderid}`;
        var travellers = `travellers=${this._createTravellerName()}`;
        var count = `count=${this.props.selectTravellers.length}`;
        var price = `price=${this.props.price}`;
        var actualPrice = `actualPrice=${this.props.actualPrice}`;
        return `/order/contract/preview?${orderid}&${travellers}&${count}&${price}&${actualPrice}`;
    },

    onAgreementLinkClick: function() {
        if (this.props.selectTravellers.length <= 0) {
            Toast.fail("还未选择出行人", 1);
            return;
        }
        window.location.href = this._createContractLink(); 
    },

    render: function() {
        const { getFieldProps } = this.props.form;
        return (
            <div className="agreement-container">
                <AgreeItem
                    {
                        ...getFieldProps('agreement', {
                            initialValue: false,
                            valuePropName: 'checked',
                        })
                    }>
                    我已阅读并接受
                </AgreeItem>
                <div className="agreement-link-container">
                    <a href="javascript:" onClick={this.onAgreementLinkClick}>《旅游合同》</a>
                    <a href="/index/safe_notice.pdf">《安全须知》</a>
                    <a href={`/travel/travel_notice.pdf?routeid=${this.props.routeid}`} target="_blank">《旅行行程单》</a>
                    <a href={`/travel/travel_prepare.pdf?routeid=${this.props.routeid}`} target="_blank">《出发准备》</a>
                </div>
            </div>
        );
    }
});
Agreement = createForm()(Agreement);

module.exports = Agreement;
