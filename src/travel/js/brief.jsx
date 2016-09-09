/**
 * @authro xiezhenzong
 */
import React from 'react';
import { Col } from 'react-bootstrap';
import marked from 'marked';

var Brief = React.createClass({

    render: function() {
        var brief = this.props.brief;
        var route = this.props.route.toString().split("-");
        var mdtext =  marked(brief.mdtext);

        var spotlights = brief.spotlights.map(function(spotlight, index) {
            return (
                <Col sm={6} md={6} key={`travel-brief-${index}`}>
                    <div className="liangdian" key={`${index}`}>
                        亮点 <span className="light-title">{`${Math.floor((index+1)/2)+1+index%2*Math.floor((brief.spotlights.length-1)/2)}`}</span>： 
                        <span className="spot-light"> {spotlight}</span>
                    </div>
                </Col>
            );
        });

        var track = route.map(function(track, index) {
            return (
                <span key={`${index}`}> {track}/</span>
            );
        });



        return (
             <div className="brief container">
                <Col sm={12} md={12}>
                    <div className="track">{track}</div>
                    <hr />
                    <div dangerouslySetInnerHTML={{__html: mdtext}}></div>
                </Col>
                <Col sm={12} md={12}>
                    <hr />
                    {spotlights}
                </Col>
            </div>
        );
    }

});

module.exports = Brief;
