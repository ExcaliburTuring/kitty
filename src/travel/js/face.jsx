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
                {/*<Col xs={6} md={3}>
                    <div className="relative">
                        <div className="pull-left">
                            <div className="duration pull-left">
                                <span>{route.days}</span>
                                <div className="days">
                                    DAY
                                </div>
                            </div>
                            <h1 className="title pull-left">{route.name}</h1>
                        </div>
                        <div className="intro pull-left">
                            <h5>{route.title}</h5>
                        </div>
                        <div className="route pull-left">
                            <span>行程:</span>
                            <h5>{route.route}</h5>
                        </div>
                        <div className="bottom">
                            <div className="share"></div>
                            <h2 className="price">{`${route.minPrice} — ${route.maxPrice}`}</h2>
                            <button className="time">时间&价格</button>
                        </div>
                    </div>
                </Col>*/}
                <Col className="container" md={12}>
                    <Image responsive src={WH} />
                    <Slider sliderImgs={this.props.sliderImgs}/>
                </Col>
            </div>
        );
    }
});

module.exports=Face;
