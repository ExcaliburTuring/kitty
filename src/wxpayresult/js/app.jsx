/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { ActivityIndicator, Result, Button, WingBlank } from 'antd-mobile';

import { url, defaultValue } from 'config';
import Rabbit from 'rabbit';

var OrderPayResult = Rabbit.create(url.orderPayResult);

var App = React.createClass({

    mixins: [
        Reflux.connect(OrderPayResult.store, 'data')
    ],

    _getQueryString: function (name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        return r != null ? unescape(r[2]): null; 
    },

    // compoment specs

    getInitialState: function() {
        var orderid = this._getQueryString('orderid');
        OrderPayResult.actions.load({'orderid': orderid, 'payType': 1});
        return {
            'basicInfo': {},
            'data': {
                'status': -1,
                'orderStatus': 2, // 以后加上轮询支付结果的时候可以用
                'price': '¥0',
                'actualPrice': '¥0'
            }
        }
    },

    render: function() {
        var data = this.state.data;
        data.status = 0;
        if (data.status < 0 || data.orderStatus == 2) {
            return (
                <div className="order-loading-container">
                     <ActivityIndicator size="large" text="等待微信支付结果..."/>
                </div>
            );
        }
        
        var title = null, message = null;
        if (data.status != 0 || data.orderStatus != 3) {
            title = "支付失败";
            message = "请联系海逍遥： " + defaultValue.hotline;
        } else {
            title = "支付成功";
            message=(
                <div className="payresult-message-container">
                    <p className="clearfix">
                        <span className="pull-left">订单金额：</span>
                        <span className="pull-right price">{data.price}</span>
                    </p>
                    <p className="clearfix">
                        <span className="pull-left">实际支付：</span>
                        <span className="pull-right price">{data.actualPrice}</span>
                    </p>
                </div>
            );
        }
        return (
            <div className="payresult-container">
                <Result
                    imgUrl="https://zos.alipayobjects.com/rmsportal/yRUDxcBPvzZTDHK.png"
                    title={title}
                    message={message}/>
                {
                    data.status == 0
                    ? <WingBlank>
                        <Button type="primary" onClick={()=>{window.location.href="/wap"}}>
                            完成
                        </Button>
                    </WingBlank>
                    : null
                }
            </div>
        );
    }
});

module.exports = App;
