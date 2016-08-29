/**
 * @author xiezhenzong
 */
import React from 'react';
import { Image } from 'react-bootstrap';

import { defaultValue } from 'config';

import qr from './wx.png';

require('./wx.less');

var Wx = React.createClass({

    getInitialState: function() {
        return {
        }
    },

    render: function() {
        return (
            <div className="wx-qr-container">
                <Image src={qr} resposive/>
            </div>
        );
    }
});

module.exports = Wx;