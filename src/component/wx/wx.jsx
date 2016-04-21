/**
 * @author xiezhenzong
 */
import React from 'react';
import { Image } from 'react-bootstrap';

import { defaultValue } from 'config';

import qr from './wx.png';

var Wx = React.createClass({

    getInitialState: function() {
        return {
        }
    },

    render: function() {
        return (
            <div>
                <Image src={qr} resposive/>
            </div>
        );
    }
});

module.exports = Wx;