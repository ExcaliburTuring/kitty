/**
 * @authro xiezhenzong
 */
import React from 'react';
import { Col } from 'react-bootstrap';
import marked from 'marked';

var Expense = React.createClass({

    render: function() {
        var expense = this.props.expense;
        var include = marked(expense.include);
        var exclude = marked(expense.exclude);
        var cancel = marked(expense.cancel);
        return (
            <div className="expense container">
                <Col xs={12} md={6}>
                    <Col xs={12} md={12}>
                        <h2><i className="fa fa-exclamation-circle"/> 费用包含</h2>
                         <div dangerouslySetInnerHTML={{__html: include}}></div>
                    </Col>
                    <Col xs={12} md={12}>
                        <h2><i className="fa fa-exclamation-circle"/> 费用不包含</h2>
                        <div dangerouslySetInnerHTML={{__html: exclude}}></div>
                    </Col>
                </Col>
                <Col xs={12} md={6}>
                    <h2><i className="fa fa-exclamation-circle"/> 退款&保证</h2>
                    <div dangerouslySetInnerHTML={{__html: cancel}}></div>
                </Col>
            </div>
        );
    }

});

module.exports = Expense;
