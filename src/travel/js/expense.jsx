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
            <div className="expense">
                <div className="content">
                    <Col xs={12} md={6}>
                        <Col xs={12} md={12}>
                            <h1><i className="fa fa-exclamation-circle"/>费用包含</h1>
                             <div dangerouslySetInnerHTML={{__html: include}}></div>
                        </Col>
                        <Col xs={12} md={12}>
                            <h1><i className="fa fa-exclamation-circle"/>退款政策</h1>
                            <div dangerouslySetInnerHTML={{__html: cancel}}></div>
                        </Col>
                    </Col>
                    <Col xs={12} md={6}>
                        <h1><i className="fa fa-exclamation-circle"/>费用不包含</h1>
                        <div dangerouslySetInnerHTML={{__html: exclude}}></div>
                    </Col>
                </div>
                <hr/>
            </div>
        );
    }

});

module.exports = Expense;