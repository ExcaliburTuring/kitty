/**
 * @author zhaowei
 */
import React from 'react';
import ReactDOM from 'react-dom';

import Slider from './slider';
import { Grid, Row, Col,Navbar } from 'react-bootstrap';

var Face = React.createClass({

    render: function() {
        var route = this.props.route;
        return (
            <div className="face" id="face">
                <Grid>
                    <Row>
                        <Col xs={6} md={3}>
                            <div className="relative">
                                <div className="duration inline">{route.days}<br/>
                                    <span className="day">DAY</span>
                                </div>
                                <h1 className="title inline">{route.name}</h1>
                                <h3 className="intro">{route.title}</h3>
                                <h4 className="intro inline">行程  </h4>
                                <h4 className="route inline">{route.route}</h4>

                                <div className="bottom">
                                    <div className="share"></div>
                                    <h2 className="price">￥{`${route.minPrice} - ${route.maxPrice}`}</h2>
                                    <button className="time">时间&价格</button>
                                </div>
                            </div>
                        </Col>
                        <Col xs={6} md={9}>
                            <Slider route={route} imgtext={this.props.imgtext}/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
});

 module.exports=Face;
