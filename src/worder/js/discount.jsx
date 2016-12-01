/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { List, Popup, ActionSheet, Stepper, Button } from 'antd-mobile';
import { createForm } from 'rc-form';

import { priceUtil, couponStatus }  from 'config';

var Discount = React.createClass({

    onPolicyDiscountClick: function() {
        var self = this, policies = this.props.discountData.policy;
        var onPolicySelect = function(policy) {
            Popup.hide();
            if (policy) {
                self.props.onPolicyDiscountChange(policy);
            } else {
                self.props.onPolicyDiscountChange({
                    'discountid': -1,
                    'name': '',
                    'value':'￥0'
                });
            }
        }
        Popup.show(
            <PolicySelector 
                policies={policies}
                onPolicySelect={onPolicySelect}
                onPolicySelectCancel={Popup.hide}/>, 
            { animationType: 'slide-up' }
        );
    },

    onDicountCodeClick :function() {
        var self = this, coupons = this.props.coupons.coupons;
        var onCouponSelect = function(coupon) {
            Popup.hide();
            if (coupon) {
                self.props.onCouponChange(coupon);
            } else {
                self.props.onCouponChange({
                    'couponid': '',
                    'value': '￥0',
                });
            }
        }
        Popup.show(
            <CouponSelector 
                coupons={coupons}
                onCouponSelect={onCouponSelect}
                onCouponSelectCancel={Popup.hide}/>, 
            { animationType: 'slide-up' }
        );
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
        var coupon = this.props.coupon;
        var studentDiscount = this.props.studentDiscount;
        return (
            <div className="discount-container">
                <List>
                    <List.Item
                        extra={policyDiscount.value}
                        arrow="horizontal"
                        onClick={this.onPolicyDiscountClick}>
                        {
                            policyDiscount.discountid != -1 
                                ? policyDiscount.name : '不使用优惠政策'
                        }
                    </List.Item>
                    <List.Item
                        extra={coupon.value}
                        arrow="horizontal"
                        onClick={this.onDicountCodeClick}>
                        {
                            coupon.couponid ? coupon.name : '不使用优惠码'
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
                            <p className="discount-price">{this.props.discountPrice}</p>
                        }>
                        总共优惠
                    </List.Item>
                </List>
            </div>
        );
    }
});
Discount = createForm()(Discount);

var PolicySelector = React.createClass({

    render: function() {
        var self = this;
        var policyList = this.props.policies.map(function(policy, index) {
            return (
                <List.Item key={index}
                    extra={policy.value}
                    onClick={()=>{self.props.onPolicySelect(policy)}}>
                    {policy.name}
                </List.Item>
            );
        });
        policyList.push(
            <List.Item key={-1}
                extra="¥0"
                onClick={()=>{self.props.onPolicySelect(null)}}>
                不使用优惠政策
            </List.Item>
        )
        return (
            <div className="policy-selector-container">
                <List renderHeader={() => '选择优惠政策'}>
                    {policyList}
                </List>
                <Button className="am-button-fix" 
                    onClick={this.props.onPolicySelectCancel}>取消</Button>
            </div>
        );
    }
});

var CouponSelector = React.createClass({

    onDiscountCodeValidateClick: function() {
        window.location.href = "/account/wcoupon";
    },

    render: function() {
        var self = this;
        var couponList= this.props.coupons.map(function(coupon, index) {
            return (
                <List.Item key={index}
                    extra={coupon.value}
                    onClick={()=>{self.props.onCouponSelect(coupon)}}>
                    {coupon.name}
                </List.Item>
            );
        });
        couponList.push(
            <List.Item key={-1}
                extra="¥0"
                onClick={()=>{self.props.onCouponSelect(null)}}>
                不使用优惠券
            </List.Item>
        )
        return (
            <div className="coupon-selector-container">
                <List renderHeader={() => '选择优惠券'}>
                    {couponList}
                    <List.Item arrow="horizontal"
                        thumb="https://zos.alipayobjects.com/rmsportal/zotStpFiYpNtZNl.png"
                        onClick={this.onDiscountCodeValidateClick}>
                        前往兑换优惠券
                    </List.Item>
                </List>
                <Button className="am-button-fix" 
                    onClick={this.props.onCouponSelectCancel}>取消</Button>
            </div>
        );
    }
});


module.exports = Discount;
