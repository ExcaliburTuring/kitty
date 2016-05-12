/**
 * @author xiezhenzong
 */
import React from 'react';
import { Popconfirm } from 'antd';

import FaButton from './fabutton';

import 'antd/lib/index.css';

var PopButton = React.createClass({

    render: function() {
        return (
            <Popconfirm placement="top" title={this.props.title} onConfirm={this.props.onClick}>
                <FaButton faClass={this.props.faClass} />
            </Popconfirm>
        );
    }

});

module.exports = PopButton;
