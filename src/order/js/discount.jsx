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
import DiscountCodeTable from 'discount_code';

import 'antd/lib/index.css';

var Discount = React.createClass({

    _onDiscountCodeInput: function(e) {
        if (e.charCode == 13) { // 只处理enter键
            this.props.onDiscountCodeInput(e);
        }
    },

    render: function() {
        var discountData = this.props.discountData;
        var selectOptionList = null, studentDiscount = null, studentDiscountTip = null;
        if (discountData.policy.length == 0) {
            selectOptionList = (<SelectOption value={-1}>无任何可选优惠策略</SelectOption>);
        } else {
            selectOptionList = discountData.policy.map(function(policyItem, index) {
                return (
                    <SelectOption
                        key={`order-discount-${index}`}
                        value={policyItem.discountid}>
                        {policyItem.desc}
                    </SelectOption>
                );
            });
            selectOptionList.unshift(
                <SelectOption
                    key={`order-discount--1`}
                    value={-1}>
                    不使用优惠
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
                <span>每名学生可优惠{discountData.studentDiscount.value}</span>
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
                                    {selectOptionList}
                                </Select>
                            </FormItem>
                            <FormItem
                                className="discountcode-input-container"
                                label="优惠码:"
                                labelCol={{ span: 5 }}
                                wrapperCol={{ span: 16 }}
                                validateStatus={this.props.discountCode.validateStatus}
                                help={this.props.discountCode.msg}>
                                <Input
                                    value={this.props.discountCode.discountCode}
                                    placeholder="请输入优惠码"
                                    onChange={this.props.onDiscountCodeChange} 
                                    onKeyPress={this._onDiscountCodeInput} 
                                    onBlur={this.props.onDiscountCodeInput}/>
                                <DiscountCodeTable placement="top" needAddBtn
                                    discountCode={this.props.accountDiscountCodeData}
                                    onAddBtnClick={this.props.onDiscoutCodeTableAddBtnClick} >
                                    <Icon type="info-circle-o" className="discountcode-tip"/>
                                </DiscountCodeTable>
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
                        <p className="desc-price">-{this.props.discountCode.value}</p>
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
