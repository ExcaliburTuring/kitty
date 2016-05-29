/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Col } from 'react-bootstrap';
import { Form, Select, Input, InputNumber, Button } from 'antd';
var FormItem = Form.Item;
var SelectOption = Select.Option;

import { url } from 'config';
import Rabbit from 'rabbit';

import 'antd/lib/index.css';

var OrderDiscount = Rabbit.create(url.orderDiscount);
var Discount = React.createClass({

    mixins: [Reflux.connect(OrderDiscount.store, 'data')],

    onPolicyDiscountChange: function(eventKey) {
        if (eventKey !== this.state.policyDiscount.discountid) { // 和当前的一样
            var policy = this.state.data.policy;
            var discountPrice = 0;
            for (var i = policy.length - 1; i >= 0; i--) {
                if (policy[i].discountid == eventKey) {
                    discountPrice = policy[i].value;
                    break;
                }
            }
            this.setState({
                'policyDiscount': {
                    'discountid': eventKey,
                    'discountPrice': discountPrice
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
        $.post(url.orderDiscountCode, {'code': discountCode})
        .done(function(data) {
            self.setState({
                'discountCode': {
                    'discountPrice': data.value,
                    'validateStatus': data.status == 0 ? 'success' : 'error',
                    'msg': data.msg
                }
            })
        })
        .fail(function() {
            self.setState({
                'discountCode': {
                    'validateStatus': 'error',
                    'msg': '优惠码校验失败，请联系15001028030'
                }
            })
        });
    },

    onStudentDiscountChange: function(e) {
        var count = +e;
        if (count == this.state.studentDiscount.count) {
            return;
        }
        var discountPrice = count * this.state.data.studentDiscount.value;
        this.setState({
            'studentDiscount': {
                'count': count,
                'discountPrice': discountPrice
            }
        });
    },

    onCreateOrderSubmit: function(e) {
        e.preventDefault();
        this.props.onCreateOrderSubmit({
            'actualPrice': this.props.orderInfo.price - this.state.policyDiscount.discountPrice
                            - this.state.discountCode.discountPrice
                            - this.state.studentDiscount.discountPrice,
            'policyDiscountid': this.state.policyDiscount.discountid,
            'discountCode': this.state.discountCode.code,
            'studentDiscountid': this.state.data.studentDiscount.discountid,
            'studentCount': this.state.studentDiscount.count
        });
    },

    getInitialState: function() {
        var orderInfo = this.props.orderInfo;
        OrderDiscount.actions.load({
            'routeid': orderInfo.routeid, 
            'groupid': orderInfo.groupid,
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
                'discountPrice': 0
            },
            'discountCode': {
                'code': '',
                'discountPrice': 0,
                'validateStatus': null,
                'msg': ''
            },
            'studentDiscount': {
                'count': 0,
                'discountPrice': 0
            }
        }
    },

    render: function() {
        if (this.state.data.status != 0) {
            return (<p>loading</p>);
        }
        var orderInfo = this.props.orderInfo;
        var data = this.state.data;

        var selectOptionList = null, studentDiscount = null;
        if (data.policy.length == 0) {
            selectOptionList = (<SelectOption value="0">无任何可选优惠策略</SelectOption>)
        } else {
            selectOptionList = data.policy.map(function(policyItem, index) {
                return (
                    <SelectOption 
                        key={`order-discount-${index}`}
                        value={policyItem.discountid}>
                        {policyItem.desc}
                    </SelectOption>
                )
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
        }
        return (
            <div className="discount-container">
                <Col md={12}>
                    <p className="right-price">总价：{orderInfo.price}</p>
                </Col>
                <Col md={8}>
                    <Form horizontal  onSubmit={this.onCreateOrderSubmit}>
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
                        </FormItem>
                        <Button type="primary" htmlType="submit">我要下单</Button>
                   </Form>
                </Col>
                <Col md={4}>
                    <p className="desc-price">-{this.state.policyDiscount.discountPrice}</p>
                    <p className="desc-price">-{this.state.discountCode.discountPrice}</p>
                    <p className="desc-price">-{this.state.studentDiscount.discountPrice}</p>
                    <p className="right-price">
                        结算价格：{ 
                            orderInfo.price - this.state.policyDiscount.discountPrice
                            - this.state.discountCode.discountPrice
                            - this.state.studentDiscount.discountPrice
                        }
                    </p>
                </Col>
            </div>
        );
    }
});

module.exports = Discount;
