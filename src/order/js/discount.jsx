/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Form, FormGroup, ControlLabel,FormControl,Col } from 'react-bootstrap';

import AccountBaiscInfo from 'account_basicinfo';
import { url } from 'config';
import Rabbit from 'rabbit';

var AccountContacts = Rabbit.create(url.contacts);

var Discount = React.createClass({

    mixins: [
        Reflux.connect(AccountBaiscInfo.store, 'basicInfo'),
        Reflux.connect(AccountContacts.store, 'contacts'),
    ],

    getInitialState: function() {
        return {
            'basicInfo': {
                'login': false
            },
            'contacts': [],
            'order': {
                'status': 1,
                'orders': [],
                'travellers': {}
            }
        }
    },

    componentDidMount: function() {
        AccountBaiscInfo.actions.get();
        AccountContacts.actions.get();
    },

    render: function() {
        // var basicInfo = this.state.basicInfo;
        // var contacts = this.state.contacts;
        // var order = this.state.order;
        // if (!basicInfo.login || contacts.length == 0 || order.status !=0) {
        //     return (
        //         <div></div>
        //     );
        // };
        // var mockOrder = order.orders[1]; // 假装只取到一个订单，因为应该是有orderid的，
        // var mockDiscount = order.discounts[mockOrder.orderid]; // 假装取到打折信息


        return (
            <div className="discount-container section-container">
                <Col md={12}><p className="right-price">总价：1000</p></Col>
                <Col md={8}>
                    <Form horizontal>
                        <FormGroup controlId="formControlsSelect" inline>
                          <Col md={4} className="left-info">1.优惠策略</Col>
                          <Col md={8}>
                              <FormControl componentClass="select" placeholder="select">
                                <option value="select">春季优惠</option>
                                <option value="AAA">AAA</option>
                                <option value="BBB">BBB</option>
                                <option value="CCC">CCC</option>
                              </FormControl>
                          </Col>
                        </FormGroup>

                        <FormGroup controlId="formControlsSelect" inline>
                          <Col md={4} className="left-info">2.优惠码</Col>
                          <Col md={8}>
                           <FormControl type="text" placeholder="填写优惠码" />
                          </Col>
                        </FormGroup>

                        <FormGroup controlId="formControlsSelect" inline>
                          <Col md={4} className="left-info">3.学生证优惠</Col>
                          <Col md={8}>
                              <FormControl componentClass="select" placeholder="0">
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                              </FormControl>
                          </Col>
                        </FormGroup>
                    </Form>
                </Col>
                <Col md={4}>
                    <p className="desc-price">-100</p>
                    <p className="desc-price">-100</p>
                    <p className="desc-price">-100</p>
                    <p className="right-price">结算价格：8000</p>
                </Col>
            </div>
        );
    }
});



module.exports = Discount;