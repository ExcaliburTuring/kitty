/**
 * @author xiezhenzong 
 */
import React from 'react';

import hxyImg from 'haixiaoyao.png';
import xyjImg from 'xiaoyaojun.png'; 
import hxyTravel from './hxytravel.png'; 
import { Col,Image } from 'react-bootstrap';

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
                        <Col sm={3} md={3}>
                            <div className="footer-content">
                                <Image responsive src={hxyTravel} />
                            </div>
                        </Col>
                        <Col sm={6} md={6}>
                            <div className="footer-content">
                                <div className="footer-title">关于海逍遥</div>
                                <ul className="link">
                                    <li>
                                        <p>北京海逍遥旅行社有限责任公司</p>
                                    </li>
                                    <li>
                                        <p>国家旅游局经营许可证号 L-BJ-01703</p>
                                    </li>
                                    <li>
                                        <span>电话：010-83702122 </span>
                                        <span>邮箱：</span>
                                        <a href="mailto:hr@hxytravel.com">hr@hxytravel.com</a>
                                    </li>
                                    <li>
                                        <p>地址：北京市昌平区城北街道西关路20号2号楼908室</p>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col sm={3} md={3}>
                            <div className="footer-content">
                                <div className="footer-title">官方公众号</div>
                                <img className="qr-img" alt="官方二维码" width="120" height="120" src={hxyImg} />
                            </div>
                        </Col>
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
                                <a href="http://www.miibeian.gov.cn/"  target="_blank">京ICP证 备15064919号 </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = KittyFooter;
