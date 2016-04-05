/**
 * @author xiezhenzong 
 */
import React from 'react';

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
                                <h4 className="title">友情链接</h4>
                                <ul className="link">
                                    <li>
                                        <a href="http://lvyou.baidu.com">百度旅游</a>
                                    </li>
                                    <li>
                                        <a href="http://www.qunar.com">去哪儿</a>
                                    </li>
                                    <li>
                                        <a href="https://www.alitrip.com">阿里去啊</a>
                                    </li>
                                    <li>
                                        <a href="http://www.51mumaren.com">木马人旅行俱乐部</a>
                                    </li>
                                    <li>
                                        <a href="http://www.54traveler.com">稻草人旅行</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="footer-content">
                                <h4 className="title">关于海逍遥</h4>
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
                                <h4 className="title">官方公众号</h4>
                                <img className="qr-img" alt="官方二维码" width="120" height="120" src="/src/resources/img/haixiaoyao.png" />
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="footer-content">
                                <h4 className="title">客服微信号</h4>
                                <img className="qr-img" alt="逍遥君二维码" width="120" height="120" src="/src/resources/img/xiaoyaojun.png" />
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
                            <div>
                                 <span>Copyright © 2014-2016 海逍遥旅游股份有限公司 All Rights Reserved.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = KittyFooter;
