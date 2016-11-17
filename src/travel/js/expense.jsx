/**
 * @authro xiezhenzong
 */
import React from 'react';
import { Col } from 'react-bootstrap';
import marked from 'marked';

var Expense = React.createClass({

    render: function() {
        var include = marked(this.props.include);
        var exclude = marked(this.props.exclude);
        var refund = marked(this.props.refund);
        return (
            <div className="expense container">
                <Col sm={6} md={6}>
                    <Col sm={12} md={12}>
                        <h2><i className="fa fa-exclamation-circle"/> 费用包含</h2>
                         <div dangerouslySetInnerHTML={{__html: include}}></div>
                    </Col>
                    <Col sm={12} md={12}>
                        <h2><i className="fa fa-exclamation-circle"/> 费用不包含</h2>
                        <div dangerouslySetInnerHTML={{__html: exclude}}></div>
                    </Col>
                </Col>
                <Col sm={6} md={6}>
                    <h2><i className="fa fa-exclamation-circle"/> 退款&保证</h2>
                    <div dangerouslySetInnerHTML={{__html: refund}}></div>
                </Col>
            </div>
        );
    }

});

module.exports = Expense;
