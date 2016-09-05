import React from 'react'; 
import { Row, Col, Image, Button } from 'react-bootstrap';
import { Form, Tooltip, Icon } from 'antd';

import { orderStatus, refundStatus, refundType, priceUtil } from 'config';
import Title from 'title';
import OrderTip from 'order_tip';
import OrderOperationHelper from 'order_operation';

import 'antd/lib/index.css';

var _classNameConfig = {
    true: 'current',
    false: 'history'
}

var OrderItem = React.createClass({

    render: function() {
        var briefOrder = this.props.briefOrder;
        var orderInfo = briefOrder.orderInfo;
        var travelRoute = briefOrder.travelRoute;
        var travelGroup = briefOrder.travelGroup;
        var className = _classNameConfig[orderInfo.status == orderStatus.WAITING 
            || orderInfo.status == orderStatus.PAYING || orderInfo.status == orderStatus.PAID];
        return (
            <div className={`order-brief-container ${className}`}>
                <Title className="order-brief-title" title={`订单号：${orderInfo.orderid}`}
                    href={`/order/${orderInfo.orderid}`}>
                    <p className="order-status-tip">
                        订单状态:
                        <span className="order-status">
                            {orderStatus.getDesc(orderInfo.status)}
                        </span>
                    </p>
                    <OrderTip status={orderInfo.status} 
                        timeLeft={briefOrder.timeLeft} dayLeft={briefOrder.dayLeft} />
                </Title>
                <div className="order-brief-content">
                    <Row>
                        <Col sm={4} md={4}>
                            <a href={`/travel/${travelRoute.routeid}`} target="_blank">
                                <Image src={travelRoute.headImg} responsive/>
                            </a>
                        </Col>
                        <Col sm={8} md={8}>
                            <div className="travel-info">
                                <span className="travel-name">{travelRoute.name}</span>
                                <span className="travel-time">{travelGroup.startDate} 到 {travelGroup.endDate}</span>
                                <p className="travel-route">{travelRoute.route}</p>
                            </div>
                            <div className="order-info">
                                <TravellerList names={briefOrder.travellerNames} keyPrefix={orderInfo.orderid}/>
                                <OrderPrice orderInfo={orderInfo} travelGroup={travelGroup}
                                    policy={briefOrder.policy} code={briefOrder.code} student={briefOrder.student}/>
                                <Refund status={orderInfo.status} orderRefound={briefOrder.orderRefound}/>
                            </div>
                        </Col>
                    </Row>
                    <div className="order-extra-container">
                        <Row>
                            <Col sm={4} md={4} smPush={8} mdPush={8}>
                                <OrderOperation orderid={orderInfo.orderid} status={orderInfo.status} 
                                    actualPrice={orderInfo.actualPrice} routeid={travelRoute.routeid} />
                            </Col>
                            <GroupInfo otherTravellers={briefOrder.otherTravellers} 
                                wxQrCode={travelGroup.wxQrcode}/>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
});

var TravellerList = React.createClass({

    render: function() {
        var keyPrefix = this.props.keyPrefix;
        var travellers = this.props.names.map(function(name, index) {
            return (
                <span key={`${keyPrefix}-${index}`} className="traveller-name ellipsis">
                    <i className="fa fa-check-square-o" />
                    {name}
                </span>
            );
        });
        return (
            <div className="traveller-names">
                <span className="order-label">成员</span>
                {travellers}
            </div>
        );
    }
});

var OrderPrice = React.createClass({

    render: function() {
        var policy = this.props.policy;
        var code = this.props.code;
        var student = this.props.student;
        var priceTip = (
            <div>
                {this.props.travelGroup.price}
                <Icon type="cross" />
                {this.props.orderInfo.count}
            </div>
        );
        if (policy == null && code == null && student == null) {
            return (
                <div className="order-price">
                    <span className="order-label">价格</span>
                    <Tooltip placement="top" title={priceTip}>
                        <span className="price">{this.props.orderInfo.actualPrice}</span>
                    </Tooltip>
                </div>
            );
        }
        var totalDiscount = 0;
        if (policy != null) {
            totalDiscount += priceUtil.getPrice(policy.value);
        }
        if (code != null) {
            totalDiscount += priceUtil.getPrice(code.value);
        }
        if (this.props.student != null) {
            totalDiscount += priceUtil.getPrice(student.value) * this.props.orderInfo.studentCount;
        }
        var discountTip = (
            <div>
                {policy != null ? <p>{policy.desc}:减{policy.value}</p> : null }
                {code != null ? <p>优惠码{code.discountCode}:减{code.value}</p> : null }
                {student != null ? <p>学生优惠每人减{student.value},共{this.props.orderInfo.studentCount}人</p> : null }
            </div>
        );

        return (
            <div className="order-price">
                <span className="order-label">价格</span>
                <Tooltip placement="top" title={priceTip}>
                    <span className="price">{this.props.orderInfo.price}</span>
                </Tooltip>
                <span className="price-operator"> - </span>
                <Tooltip placement="top" title={discountTip}>
                    <span className="price">{priceUtil.getPriceStr(totalDiscount)}</span>
                </Tooltip>
                <span className="price-operator">＝</span>
                <span className="price">{this.props.orderInfo.actualPrice}</span>
            </div>
        );
    }
});

var Refund = React.createClass({

    render: function() {
        var status = this.props.status;
        var orderRefound = this.props.orderRefound;
        if (orderRefound == null
            || (status != orderStatus.REFUNDING && status != orderStatus.REFUNDED)) {
            return null;
        }
        return (
            <div className="order-price">
                <span className="order-label">退款</span>
                <span className="price">{orderRefound.refund}</span>
                （{refundStatus.getDesc(orderRefound.status)}）
            </div>
        );
    }
});

var OrderOperation = React.createClass({

    mixins: [OrderOperationHelper],

    render: function() {
        var status = this.props.status;
        var operationGroup = null;
        if (status == orderStatus.WAITING) {
            operationGroup = (
                <div className="order-operation">
                    <Form inline onSubmit={()=>{}} action="/order/pay" method="GET" target="_blank">
                        <input type="hidden" name="orderid" value={this.props.orderid}></input>
                        <Button bsStyle="link" type="submit">
                            马上支付
                        </Button>
                    </Form>
                    <Button bsStyle="link" onClick={this.onCancelOrderBtnClick}>
                        取消订单
                    </Button>
                    <Button bsStyle="link">
                        下载合同
                    </Button>
                </div>
            );
        } else if (status == orderStatus.PAID) {
            operationGroup = (
                <div className="order-operation">
                    <Button bsStyle="link" onClick={this.onRefundOrderBtnClick}>
                        退款
                    </Button>
                    <Button bsStyle="link" onClick={this.onOtherRouteBtnClick}>
                        其它路线
                    </Button>
                </div>
            );
        } else if (status == orderStatus.TIMEOUT) {
            operationGroup = (
                <div className="order-operation">
                    <Button bsStyle="link" onClick={this.onRefundOrderBtnClick}>
                        重新下单
                    </Button>
                    <Button bsStyle="link" onClick={this.onSameRouteBtnClick}>
                        同一路线
                    </Button>
                </div>
            );
        } else if (status == orderStatus.CANCEL || status == orderStatus.REFUNDING
            || status == orderStatus.REFUNDED){
            operationGroup = (
                <div className="order-operation">
                    <Button bsStyle="link" onClick={this.onOtherRouteBtnClick}>
                        查看其它路线
                    </Button>
                </div>
            );
        } else {
            return null;
        }
        return (
            <div className="order-operation-container pull-right">
                {operationGroup}
            </div>
        );
    }
});

var GroupInfo = React.createClass({

    render: function() {
        if (this.props.otherTravellers.length == 0) {
            return null;
        } 
        var avatars = this.props.otherTravellers.map(function(traveller, index) {
            var title=(
                <p className="ellipsis traveller-name">{traveller.nickname}</p>
            );
            return (
                <Tooltip placement="top" title={title} key={`other-traveller-${index}`}>
                    <Image src={traveller.avatarUrl}  circle key={`avatar-${index}`}/>
                </Tooltip>
            );
        });
        var qrCode = null;
        if (this.props.wxQrcode) {
            qrCode = (
                <div className="group-QR">
                    <Image src={this.props.wxQrcode} responsive />
                </div>
            );
        }
        return (
            <Col sm={8} md={8} smPull={4} mdPull={4}>
                <div className="group-info">
                    <div className="group-members">
                        <div className="avatars">
                            <span>同团的队友：</span>
                            {avatars}
                            <span className="more">扫码进群查看更多<i className="fa fa-arrow-right" /></span>
                        </div>
                    </div>
                    {qrCode}
                </div>   
            </Col>
        );
    }
});


module.exports = OrderItem;
