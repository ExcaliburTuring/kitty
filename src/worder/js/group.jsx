/**
 * @author xiezhenzong 
 */
import React from 'react';

import { url } from 'config';
import square from '../img/54.png';

var GroupInfo = React.createClass({

    onImgClick: function(e) {
        e.stopPropagation();
        var travelRoute = this.props.travelRoute;
        window.location.href = `${url.travel}/${travelRoute.routeid}`;
    },

    render: function() {
        var travelRoute = this.props.travelRoute;
        var travelGroup = this.props.travelGroup;
        var selectTraveller = this.props.selectTraveller;
        return (
            <div className="travel-info-container">
                <div onClick={this.onImgClick}>
                    <div className="travel-img pull-left" style={{backgroundImage: `url(${travelRoute.headImg})`}} >
                        <img className="img-responsive" src={square}/>
                    </div>
                    <div className="travel-title">
                        <p className="two-line fixed">{`${travelRoute.name}|${travelRoute.title}`}</p>
                    </div>
                    <div className="travel-detail clearfix">
                        <p className="pull-left">
                            <span className="travel-date">{travelGroup.startDate}</span>
                            至
                            <span className="travel-date">{travelGroup.endDate}</span>
                        </p>
                        <p className="pull-right">
                            ¥<span className="travel-price">
                                {travelGroup.price.replace("￥", "")}
                            </span>元
                        </p>
                    </div>
                </div>
                {
                    this.props.history
                    ? <div className="order-info-container">
                        <div className="order-info clearfix">
                            <div className="pull-left">订单编号: {this.props.orderInfo.orderid}</div>
                            <div className="pull-right">报名时间：{this.props.orderInfo.createTime ? this.props.orderInfo.createTime : this.props.orderInfo.addTime}</div>
                        </div>
                        <OrderHistory history={this.props.history} />
                    </div>
                    : null
                }
            </div>
        );
    }
});

var OrderHistory = React.createClass({

    stateStyle: {
        0: 'history',
        1: 'next'
    },

    render: function() {
        var history = this.props.history;
        var self = this, style= {'width': `${100 / history.length}%`};
        var orderHistoryList = history.map(function(item, index) {
            var i = index + 1;
            var change = index < (history.length - 1) && item.state != history[i].state;
            return (
                <div className={`order-history ${self.stateStyle[item.state]} ${change ? 'change': ''}`} 
                    style={style} key={index}>
                    <div className="steps">
                        <div className="steps-left"></div>
                        <div className="steps-icon">{i}</div>
                        <div className="steps-right"></div>
                    </div>
                    <div className="history-desc">
                        {item.desc}
                    </div>
                </div>
            );
        });
        return (
            <div className="order-history-container">
                {orderHistoryList}
            </div>
        );
    }
});

module.exports = GroupInfo;
