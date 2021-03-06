/**
 * @authro xiezhenzong
 */
import React from 'react';
import { Col } from 'react-bootstrap';
import marked from 'marked';

var Notice = React.createClass({

    render: function() {
        var local =  marked(this.props.local);
        var traffic = marked(this.props.traffic);
        var prepare = marked(this.props.prepare);
        return (
             <div className="notice container">
                <Col sm={6} md={6}>
                    <Col sm={12} md={12}>
                        <h2><i className="fa fa-compass"/>关于当地</h2>
                        <div dangerouslySetInnerHTML={{__html: local}}></div>
                    </Col>
                    <Col sm={12} md={12}>
                        <h2><i className="fa fa-subway"/>交通信息</h2>
                        <div dangerouslySetInnerHTML={{__html: traffic}}></div>
                    </Col>
                </Col>
                <Col sm={6} md={6}>
                    <h2><i className="fa fa-cubes"/>物资准备</h2>
                    <div dangerouslySetInnerHTML={{__html: prepare}}></div>
                </Col>
                <hr/>
            </div>
        );
    }

});

module.exports = Notice;
