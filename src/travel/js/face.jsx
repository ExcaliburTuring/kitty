/**
 * @author zhaowei
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Col,Image } from 'react-bootstrap';
import WH from '../img/169.png';

import Slider from './slider';

var Face = React.createClass({

    render: function() {
        var route = this.props.route;
        return (
            <div className="face-container container">
                <Col sm={12} md={12}>
                    <img className="wh-container" src={WH} />
                    <Slider route={route} sliderImgs={this.props.sliderImgs} descriptions={this.props.descriptions}/>
                </Col>
            </div>
        );
    }
});

module.exports=Face;
