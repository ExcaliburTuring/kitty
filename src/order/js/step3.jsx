/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { Panel,Button,Col } from 'react-bootstrap';

import GroupBrief from './group';
import Discount from './discount'; 
import Contacts from './contacts'
import NoAuth from './noauth';

import alipay from '../img/alipay.png';

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
            <div>
                <Col md={12}>
                    
                </Col>
            </div>
        );
    }
});

module.exports = Step3;
