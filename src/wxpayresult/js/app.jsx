/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';

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
            'orderid': orderid,
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
        data.status = -1;
        if (data.status < 0 || data.orderStatus == 2) {
            return (
                <div className="weui-loadmore">
                    <i className="weui-loading"/>
                    <span className="weui-loadmore__tips">等待微信支付结果...</span>
                </div>
            );
        }
        var success = data.status == 0 && data.orderStatus == 3;
        var title = null, opr = null;
        if (success) {
            title = '支付成功';
            opr = (
                <p className="weui-btn-area">
                    <a href={`${url.order}/${this.state.orderid}`}
                        className="weui-btn weui-btn_primary">完成</a>
                </p>
            );
        } else {
            title = '支付失败';
            opr = (
                <p className="weui-btn-area">
                    <a href={`tel:${defaultValue.hotline}`}
                        className="weui-btn weui-btn_primary">联系海逍遥</a>
                    <a href={`${url.order}/${this.state.orderid}`}
                        className="weui-btn weui-btn_default">重新支付</a>
                </p>
            );
        }
        var message = (
            <div className="weui-cells">
                <div className="weui-cell">
                    <div className="weui-cell__bd">订单金额：</div>
                    <div className="weui-cell__ft">{data.price}</div>
                </div>
                <div className="weui-cell">
                    <div className="weui-cell__bd">{success ? '实际支付' : '需要支付'}</div>
                    <div className="weui-cell__ft">{data.actualPrice}</div>
                </div>
            </div>
        );
        return (
            <div className="weui-msg">
                <div className="weui-msg__icon-area">
                    <i className={`${success? 'weui-icon-success' : 'weui-icon-warn'} weui-icon_msg`}></i>
                </div>
                <div className="weui-msg__text-area">
                    <h2 className="weui-msg__title">{title}</h2>
                    {message}
                </div>
                <div className="weui-msg__opr-area">
                    {opr}
                </div>
                <div className="weui-msg__extra-area">
                    <div className="weui-footer">
                        <p className="weui-footer__links">
                            <a href="/" className="weui-footer__link">海逍遥旅行社</a>
                        </p>
                        <p className="weui-footer__text">Copyright &copy;
                            2008-2016 www.hxytravel.com</p>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = App;
