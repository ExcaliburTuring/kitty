/**
 * @authro xiezhenzong
 */
import React from 'react';
import { Nav, NavItem, Grid, Row, Col } from 'react-bootstrap';
import { AutoAffix } from 'react-overlays';

import Rabbit from 'rabbit';

var BodyNav = React.createClass({

    handleSelect: function (selectedKey) {
        $('html, body').animate({
            scrollTop: $(selectedKey).offset().top
        }, 800);
    },

    render: function() {
        return (
            <Grid>
                <Row>
                    <Col xs={12} md={12}>
                         <div className="am-sticky-placeholder">
                            <AutoAffix viewportOffsetTop={0} container={this.props.container} affixClassName="stwork">
                                    <div className="scrollspy-nav">
                                        <Nav bsStyle="pills" activeKey={1} onSelect={this.handleSelect}>
                                            <NavItem eventKey={".navbar"} >路线简介</NavItem>
                                            <NavItem eventKey={".body"} >行程</NavItem>
                                            <NavItem eventKey={".notice"} >注意事项</NavItem>
                                            <NavItem eventKey={".expense"} >费用说明</NavItem>
                                            <NavItem eventKey={".teaminfo"} >报名</NavItem>
                                        </Nav>
                                    </div>
                            </AutoAffix>
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    }

});

module.exports = BodyNav;
