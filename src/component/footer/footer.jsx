/**
 * @author xiezhenzong 
 */
import React from 'react';

import hxyImg from './haixiaoyao.png';
import xyjImg from './xiaoyaojun.png'; 
import hxyTravel from './hxytravel.png'; 

require('./footer.less');

var KittyFooter = React.createClass({
    render: function() {
        return (
            <div className="footer">
                <Info />
                <Copyright />
            </div>
        );
    }
});

var Info = React.createClass({
    render: function() {
        return (
        	<div className="main-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="footer-content">
                                <img width="200px" src={hxyTravel} />
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="footer-content">
                                <div className="footer-title">关于海逍遥</div>
                                <ul className="link">
                                    <li>
                                        <a href="http://mp.weixin.qq.com/s?__biz=MzA4MDk4MTMyNA==&mid=208548834&idx=1&sn=94b82f240a4065e0781ddccaa5e941bf&scene=18">免费旅行</a>
                                    </li>
                                    <li>
                                        <a href="http://mp.weixin.qq.com/s?__biz=MzA4MDk4MTMyNA==&mid=208697865&idx=1&sn=2cf8b55e865eecf6036245950956521b" target="_blank">我们的故事</a>
                                    </li>
                                    <li>
                                        <p>电话：18510248672</p>
                                    </li>
                                    <li>
                                        <span>邮件：</span>
                                        <a href="mailto:haixiaoyaotravel@163.com">haixiaoyaotravel@163.com</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="footer-content">
                                <div className="footer-title">官方公众号</div>
                                <img className="qr-img" alt="官方二维码" width="120" height="120" src={hxyImg} />
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="footer-content">
                                <div className="footer-title">客服微信号</div>
                                <img className="qr-img" alt="逍遥君二维码" width="120" height="120" src={xyjImg} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var Copyright = React.createClass({
    render: function() {
        return (
            <div className="footer-copyright">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div>
                                <span>国家旅游局经营许可证号 L-BJ-01703 | </span>
                                <a href="http://www.miibeian.gov.cn/"  target="_blank">京ICP证 | </a>
                                <a href="/zhizhao" target="_blank">营业执照信息</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = KittyFooter;
