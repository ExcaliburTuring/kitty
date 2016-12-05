/**
 * @author xiezhenzong 
 */
import React from 'react';

require('./wfooter.less');

var WFooter = React.createClass({
    render: function() {
        return (
            <div className="footer">
                <div className="footer-content">
                    <p>北京海逍遥旅行社有限责任公司</p>
                    <p>国家旅游局经营许可证号 L-BJ-01703</p>
                </div>
                <div className="footer-copyright">
                    <a href="http://www.miibeian.gov.cn/">京ICP证 备15064919号</a>
                    <a href="http://www.hxytravel.com"> | hxytravel.com</a>
                </div>
            </div>
        );
    }
});

module.exports = WFooter;
