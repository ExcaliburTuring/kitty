/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Col } from 'react-bootstrap';
import { Form, Select, Input, InputNumber, Button, Icon } from 'antd';
var FormItem = Form.Item;
var SelectOption = Select.Option;

import { url, priceUtil, defaultValue } from 'config';
import Rabbit from 'rabbit';
import DiscountCodeTable from 'discount_code';

import 'antd/lib/index.css';

var OrderDiscount = Rabbit.create(url.orderDiscount);
var DiscountCode = Rabbit.create(url.discountCode);

var Discount = React.createClass({

    mixins: [
        Reflux.listenTo(OrderDiscount.store, 'onPolicyDiscountLoaded'),
        Reflux.listenTo(DiscountCode.store, 'onAccountDiscountCodeLoaded')
    ],

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

    onPolicyDiscountLoaded: function(discount) {
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

    /**
     * 账户优惠码列表加载完成
     */
    onAccountDiscountCodeLoaded: function(accountDiscountCodeData) {
        if (accountDiscountCodeData.status == 0 
            && accountDiscountCodeData.discountCodes.length > 0) {
            var maxValueCode = null, maxValue = -1;
            for (var index in accountDiscountCodeData.discountCodes) {
                var discountCode = accountDiscountCodeData.discountCodes[index];
                var price = priceUtil.getPrice(discountCode.value);
                if (maxValue < price) {
                    maxValue = price;
                    maxValueCode = discountCode;
                }
            }
            this.setState({
                'discountCode': {
                    'code': maxValueCode.discountCode,
                    'discountPrice': maxValueCode.value
                },
                'accountDiscountCode': accountDiscountCodeData
            });
        } else {
            this.setState({'accountDiscountCode': accountDiscountCodeData});
        }
    },

    /**
     * 优惠码表格里的使用按钮被点击
     */
    onDiscoutCodeTableAddBtnClick: function(code) {
        this.setState({
            'discountCode': {
                'code': code.discountCode,
                'discountPrice': code.value
            }
        });
    },

    /**
     * 优惠码输入框正在输入
     */
    onDiscountCodeInput: function(e) {
        var discountCode = e.target.value;
        if (discountCode == this.state.discountCode.code) {
            return;
        }
        this.setState({
            'discountCode': {
                'code': discountCode,
                'discountPrice': '￥0' // 输入的时候，设置为0
            }
        });
    },

    /**
     * 优惠码输入完成
     */
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
                        'msg': `优惠码校验失败，请联系${defaultValue.hotline}`
                    }
                });
            }
        })
        .fail(function() {
            self.setState({
                'discountCode': {
                    'discountPrice': '￥0',
                    'validateStatus': 'error',
                    'msg': `优惠码校验失败，请联系${defaultValue.hotline}`
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
        DiscountCode.actions.load();
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
            },
            'accountDiscountCode': {
                'discountCodes': []
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
                            className="discountcode-input-container"
                            label="优惠码:"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            validateStatus={this.state.discountCode.validateStatus}
                            help={this.state.discountCode.msg}>
                            <Input
                                value={this.state.discountCode.code}
                                placeholder="请输入优惠码"
                                onChange={this.onDiscountCodeInput} 
                                onPressEnter={this.onDiscountCodeChange} 
                                onBlur={this.onDiscountCodeChange}/>
                            <DiscountCodeTable placement="top" needAddBtn
                                discountCode={this.state.accountDiscountCode}
                                onAddBtnClick={this.onDiscoutCodeTableAddBtnClick} >
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
