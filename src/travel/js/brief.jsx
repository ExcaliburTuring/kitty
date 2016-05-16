/**
 * @authro xiezhenzong
 */
import React from 'react';
import { Col } from 'react-bootstrap';
import marked from 'marked';

var Brief = React.createClass({

    render: function() {
        var brief = this.props.brief;
        var mdtext =  marked(brief.mdtext);

        var spotlights = brief.spotlights.map(function(spotlight, index) {
            return (
                <Col md={6} key={`travel-brief-${index}`}>
                    <div className="liangdian" key={`${index}`}>
                        亮点 <span className="light-title">{`${index+1}`}</span>： 
                        <span className="spot-light"> {spotlight}</span>
                    </div>
                </Col>
            );
        });

        return (
             <div className="brief">
                <Col xs={12} md={12}>
                    <hr />
                    <div dangerouslySetInnerHTML={{__html: mdtext}}></div>
                </Col>
                <Col xs={12} md={12}>
                    <hr />
                    {spotlights}
                </Col>
            </div>
        );
    }

});

module.exports = Brief;
