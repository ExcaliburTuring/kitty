/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { Col } from 'react-bootstrap';

var Step3 = React.createClass({

    getInitialState: function() {
        return {
           'data': {
                'status': 1,
                'orders': [],
                'staffs': {}
            }
        }
    },

    render: function() {
        
        return (
            <div className="order-step3">
                
            </div>
        );
    }
});

module.exports = Step3;
