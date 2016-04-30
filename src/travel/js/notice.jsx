/**
 * @authro xiezhenzong
 */
import React from 'react';
import { Col } from 'react-bootstrap';
import marked from 'marked';

var Notice = React.createClass({

    render: function() {
        var notice = this.props.notice;
        var local =  marked(notice.local);
        var traffic = marked(notice.traffic);
        var prepare = marked(notice.prepare);
        return (
             <div className="notice">
                <div className="content">
                    <Col xs={12} md={6}>
                        <Col xs={12} md={12}>
                            <h1><i className="fa fa-compass"/>关于当地</h1>
                            <div dangerouslySetInnerHTML={{__html: local}}></div>
                        </Col>
                        <Col xs={12} md={12}>
                            <h1><i className="fa fa-subway"/>交通信息</h1>
                            <div dangerouslySetInnerHTML={{__html: traffic}}></div>
                        </Col>
                    </Col>
                    <Col xs={12} md={6}>
                        <h1><i className="fa fa-cubes"/>物资准备</h1>
                        <div dangerouslySetInnerHTML={{__html: prepare}}></div>
                    </Col>
                </div>
                <hr/>
            </div>
        );
    }

});

module.exports = Notice;
