/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Col } from 'react-bootstrap';
import { Form, Select, Input, InputNumber, Icon } from 'antd';
var FormItem = Form.Item;
var SelectOption = Select.Option;

import Title from 'title';
import CouponTable from 'coupon';

import 'antd/lib/index.css';

var Discount = React.createClass({

    render: function() {
        var discountData = this.props.discountData, coupons = this.props.coupons;
        var policySelectOptions = null, couponSelectOptions = null , studentDiscount = null, studentDiscountTip = null;
        if (discountData.policy.length == 0) {
            policySelectOptions = (<SelectOption value={-1}>无可选优惠策略</SelectOption>);
        } else {
            policySelectOptions = discountData.policy.map(function(policyItem, index) {
                return (
                    <SelectOption
                        key={`order-discount-${index}`}
                        value={policyItem.discountid}>
                        {policyItem.name}
                    </SelectOption>
                );
            });
            policySelectOptions.unshift(
                <SelectOption
                    key={`order-discount--1`}
                    value={-1}>
                    不使用优惠策略
                </SelectOption>
            );
        }
        if (coupons.coupons.length == 0) {
            couponSelectOptions = (<SelectOption value={-1}>无可选优惠券</SelectOption>);
        } else {
            couponSelectOptions = coupons.coupons.map(function(coupon, index) {
                return (
                    <SelectOption
                        key={`order-coupon-${index}`}
                        value={coupon.couponid}>
                        {coupon.name}
                    </SelectOption>
                );
            });
            couponSelectOptions.unshift(
                <SelectOption
                    key={`order-coupon--1`}
                    value={-1}>
                    不使用优惠券
                </SelectOption>
            );
        }
        if (discountData.studentDiscount == null) {
            studentDiscount = (
                <p>本团不可享受学生优惠</p>
            );
        } else {
            studentDiscount = (
                <InputNumber min={0} max={this.props.count} onChange={this.props.onStudentDiscountChange}/>
            );
            studentDiscountTip = (
                <span>须持正规学校学生证方可享受</span>
            );
        }
        return (
            <div className="order-discount-container">
                <Title title="优惠政策" className="order-content-title" />
                <div className="discount-price-container clearfix">
                    <p className="order-total-price pull-right">订单价格：{this.props.price}</p>
                </div>
                <div className="discount-container clearfix">
                    <Col sm={8} md={8}>
                        <Form horizontal>
                            <FormItem
                                label="优惠策略:"
                                labelCol={{ span: 5 }}
                                wrapperCol={{ span: 14 }}>
                                <Select 
                                    size="large"
                                    value={this.props.policyDiscount.discountid}
                                    disabled={discountData.policy.length == 0} 
                                    onChange={this.props.onPolicyDiscountChange}>
                                    {policySelectOptions}
                                </Select>
                            </FormItem>
                            <FormItem
                                className="coupon-input-container"
                                label="优惠码:"
                                labelCol={{ span: 5 }}
                                wrapperCol={{ span: 14 }}
                                validateStatus={this.props.coupon.validateStatus}
                                help={this.props.coupon.msg}>
                                <Select
                                    size="large"
                                    value={this.props.coupon.couponid}
                                    disabled={coupons.coupons.length == 0} 
                                    onChange={this.props.onCouponChange}>
                                    {couponSelectOptions}
                                </Select>
                            </FormItem>
                            <FormItem
                                label="学生证优惠:"
                                labelCol={{ span: 5 }}
                                wrapperCol={{ span: 14 }}>
                                {studentDiscount}
                                {studentDiscountTip}
                            </FormItem>
                       </Form>
                    </Col>
                    <Col sm={4} md={4}>
                        <p className="desc-price">-{this.props.policyDiscount.value}</p>
                        <p className="desc-price">-{this.props.coupon.value}</p>
                        <p className="desc-price">-{this.props.studentDiscount.value}</p>
                    </Col>
                    <Col sm={12} md={12}>
                        <p className="order-total-price pull-right">
                            结算价格：{this.props.actualPrice}
                        </p>
                    </Col>
                </div>
            </div>
        );
    }
});

module.exports = Discount;
