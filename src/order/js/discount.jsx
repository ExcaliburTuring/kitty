/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Col } from 'react-bootstrap';
import { Form, Select, Input, InputNumber, Button } from 'antd';
var FormItem = Form.Item;
var SelectOption = Select.Option;

import { url, priceUtil } from 'config';
import Rabbit from 'rabbit';

import 'antd/lib/index.css';

var OrderDiscount = Rabbit.create(url.orderDiscount);
var Discount = React.createClass({

    mixins: [Reflux.listenTo(OrderDiscount.store, 'onOrderDiscountChange')],

    // api metho

    getDiscount: function() {
        var studentDiscount = this.state.data.studentDiscount; 
        return {
            'actualPrice': this._getActualPrice(),
            'policyDiscountid': this.state.policyDiscount.discountid,
            'discountCode': this.state.discountCode.code,
            'studentDiscountid': studentDiscount != null ? studentDiscount.discountid : null,
            'studentCount': this.state.studentDiscount.count
        };
    },

    // helper method

    _getActualPrice: function() {
        return priceUtil.getPriceStr(
                    priceUtil.getPrice(this.props.orderInfo.price)
                    - priceUtil.getPrice(this.state.policyDiscount.discountPrice)
                    - priceUtil.getPrice(this.state.discountCode.discountPrice)
                    - priceUtil.getPrice(this.state.studentDiscount.discountPrice)
                );
    },

    _findPolicyDiscount: function(discountid, policies) {
        for (var i = policies.length - 1; i >= 0; i--) {
            if (policies[i].discountid == discountid) {
                return policies[i];
            } 
        }
        return null;
    },

    // callback method

    onOrderDiscountChange: function(discount) {
        if (discount != null) {
            var policy = this._findPolicyDiscount(discount.defaultDiscountid, discount.policy);
            if (policy != null) {
                this.setState({
                    'data': discount,
                    'policyDiscount': {
                        'discountid': discount.defaultDiscountid,
                        'discountPrice': policy.value
                    }
                });
            } else {
                this.setState({
                    'data': discount
                });
            }
        }
    },

    onPolicyDiscountChange: function(eventKey) {
        if (eventKey !== this.state.policyDiscount.discountid) { // 和当前的一样
            var policy = this._findPolicyDiscount(eventKey, this.state.data.policy);
            this.setState({
                'policyDiscount': {
                    'discountid': eventKey,
                    'discountPrice': policy.value
                }
            });
        }
    },

    onDiscountCodeChange: function(e) {
        var discountCode = e.target.value;
        if (discountCode == this.state.discountCode.code) {
            return;
        }
        var self = this;
        $.get(url.orderDiscountCode, {'code': discountCode})
        .done(function(data) {
            if (data.status == 0 ){
                self.setState({
                    'discountCode': {
                        'code': discountCode,
                        'discountPrice': data.value,
                        'validateStatus': 'success',
                        'msg': '此优惠码可以使用'
                    }
                });
            } else if (data.status == 1100) {
                self.setState({
                    'discountCode': {
                        'discountPrice': '￥0',
                        'validateStatus': 'error',
                        'msg': data.errors[0].message
                    }
                });
            } else {
                self.setState({
                    'discountCode': {
                        'discountPrice': '￥0',
                        'validateStatus': 'error',
                        'msg': '优惠码校验失败，请联系15001028030'
                    }
                });
            }
        })
        .fail(function() {
            self.setState({
                'discountCode': {
                    'discountPrice': '￥0',
                    'validateStatus': 'error',
                    'msg': '优惠码校验失败，请联系15001028030'
                }
            });
        });
    },

    onStudentDiscountChange: function(e) {
        var count = +e;
        if (count == this.state.studentDiscount.count) {
            return;
        }
        var discountPrice = count * priceUtil.getPrice(this.state.data.studentDiscount.value);
        this.setState({
            'studentDiscount': {
                'count': count,
                'discountPrice': priceUtil.getPriceStr(discountPrice)
            }
        });
    },

    // compoment specs

    getInitialState: function() {
        OrderDiscount.actions.load({
            'routeid': this.props.orderInfo.routeid, 
            'groupid': this.props.orderInfo.groupid,
            'count': this.props.count
        });
        return {
           'data': {
                'status': 1,
                'defaultDiscountid': 0,
                'policy': [],
                'studentDiscount': {}
            },
            'policyDiscount': {
                'discountid': 0,
                'discountPrice':'￥0'
            },
            'discountCode': {
                'code': '',
                'discountPrice': '￥0',
                'validateStatus': null,
                'msg': ''
            },
            'studentDiscount': {
                'count': 0,
                'discountPrice': '￥0'
            }
        }
    },

    componentWillReceiveProps: function(newProps) {
        if (newProps.count != this.props.count) {
            var orderInfo = newProps.orderInfo;
            OrderDiscount.actions.load({
                'routeid': orderInfo.routeid, 
                'groupid': orderInfo.groupid,
                'count': newProps.count
            });
        }
    },

    render: function() {
        if (this.state.data.status != 0) {
            return (<p>loading</p>);
        }
        var orderInfo = this.props.orderInfo;
        var data = this.state.data;

        var selectOptionList = null, studentDiscount = null, studentDiscountTip = null;
        if (data.policy.length == 0) {
            selectOptionList = (<SelectOption value={-1}>无任何可选优惠策略</SelectOption>);
        } else {
            selectOptionList = data.policy.map(function(policyItem, index) {
                return (
                    <SelectOption
                        key={`order-discount-${index}`}
                        value={policyItem.discountid}>
                        {policyItem.desc}
                    </SelectOption>
                );
            });
        }
        if (data.studentDiscount == null) {
            studentDiscount = (
                <p>本团不可享受学生优惠</p>
            );
        } else {
            studentDiscount = (
                <InputNumber min={0} max={this.props.count} onChange={this.onStudentDiscountChange}/>
            );
            studentDiscountTip = (
                <span>每名学生可优惠{this.state.data.studentDiscount.value}</span>
            );
        }
        return (
            <div className="discount-container clearfix">
                <Col sm={8} md={8}>
                    <Form horizontal>
                        <FormItem
                            label="优惠策略:"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 14 }}>
                            <Select 
                                size="large"
                                defaultValue={data.defaultDiscountid}
                                disabled={data.policy.length == 0} 
                                onChange={this.onPolicyDiscountChange}>
                                {selectOptionList}
                            </Select>
                        </FormItem>
                        <FormItem
                            label="优惠码:"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 14 }}
                            validateStatus={this.state.discountCode.validateStatus}
                            help={this.state.discountCode.msg}
                            hasFeedback>
                            <Input
                                placeholder="请输入优惠码" 
                                onPressEnter={this.onDiscountCodeChange} 
                                onBlur={this.onDiscountCodeChange}/>
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
                    <p className="desc-price">-{this.state.policyDiscount.discountPrice}</p>
                    <p className="desc-price">-{this.state.discountCode.discountPrice}</p>
                    <p className="desc-price">-{this.state.studentDiscount.discountPrice}</p>
                </Col>
                <Col sm={12} md={12}>
                    <p className="order-total-price pull-right">
                        结算价格：{this._getActualPrice()}
                    </p>
                </Col>
            </div>
        );
    }
});

module.exports = Discount;
