/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { List, Button, InputItem, ActionSheet, Stepper, WingBlank } from 'antd-mobile';
import { createForm } from 'rc-form';

import { priceUtil, discountCodeStatus }  from 'config';

var Discount = React.createClass({

    onPolicyDiscountClick: function() {
        var self = this, policies = this.props.discountData.policy;
        var BUTTONS = ['不使用优惠政策'];
        for (var i = 0, n = policies.length; i < n; i++) {
            BUTTONS.push(policies[i].desc);
        }
        BUTTONS.push('取消');
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            message: '请选择优惠政策',
            maskClosable: true
        }, function(buttonIndex) {
            if (buttonIndex == BUTTONS.length - 1) {
                return;
            }
            if (buttonIndex == 0) {
                self.props.onPolicyDiscountChange({
                    'discountid': -1,
                    'desc': '',
                    'value':'￥0'
                });
            } else {
                var policy = policies[buttonIndex - 1]; // 上面BUTTONS的第0位是不使用优惠政策
                self.props.onPolicyDiscountChange(policy);
            }
        });
    },

    onDicountCodeClick :function() {
        var self = this, discountCodes = this.props.accountDiscountCodeData.discountCodes;
        var BUTTONS = ['不使用优惠码'];
        for (var i = 0, n = discountCodes.length; i < n; i++) {
            if (discountCodeStatus.isUsable(discountCodes[i].status)) {
                BUTTONS.push(discountCodes[i].discountCode);
            }
        }
        BUTTONS.push('取消');
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            message: '请选择优惠码',
            maskClosable: true
        }, function(buttonIndex) {
            if (buttonIndex == BUTTONS.length - 1) {
                return;
            }
            if (buttonIndex == 0) {
                self.props.onDiscountCodeChange({
                    'discountCode': '',
                    'value': '￥0',
                });
            } else {
                var discountCode = discountCodes[buttonIndex - 1]; // 上面BUTTONS的第0位是不使用优惠码
                self.props.onDiscountCodeChange(discountCode);
            }
        });
    },

    onStudentDiscountChange: function(count) {
        var discountPrice = count * priceUtil.getPrice(this.props.discountData.studentDiscount.value);
        this.props.onStudentDiscountChange({
            'count': count,
            'value': priceUtil.getPriceStr(discountPrice)
        });
    },

    render: function() {
        const { getFieldProps } = this.props.form;
        var policyDiscount = this.props.policyDiscount;
        var discountCode = this.props.discountCode;
        var studentDiscount = this.props.studentDiscount;
        var discountPrice = priceUtil.getPriceStr(
            priceUtil.getPrice(this.props.policyDiscount.value)
            + priceUtil.getPrice(this.props.discountCode.value)
            + priceUtil.getPrice(this.props.studentDiscount.value))
        return (
            <div className="discount-container">
                <WingBlank>
                    <h3>优惠政策</h3>
                </WingBlank>
                <List>
                    <List.Item
                        extra={policyDiscount.value}
                        arrow="horizontal"
                        onClick={this.onPolicyDiscountClick}>
                        {
                            policyDiscount.discountid != -1 
                                ? policyDiscount.desc : '不使用优惠政策'
                        }
                    </List.Item>
                    <List.Item
                        extra={discountCode.value}
                        arrow="horizontal"
                        onClick={this.onDicountCodeClick}>
                        {
                            discountCode.discountCode != ''
                                ? '优惠码' : '不使用优惠码'
                        }
                    </List.Item>
                    <List.Item
                        extra={
                            <Stepper showNumber size="small" max={this.props.count} min={0} step={1}
                                defaultValue={studentDiscount.count} 
                                onChange={this.onStudentDiscountChange} />
                        }>
                        学生优惠
                    </List.Item>
                    <List.Item
                        extra={
                            <p className="discount-price">{discountPrice}</p>
                        }>
                        总共优惠
                    </List.Item>
                </List>
            </div>
        );
    }
});
Discount = createForm()(Discount);

module.exports = Discount;
