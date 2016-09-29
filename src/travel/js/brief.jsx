/**
 * @authro xiezhenzong
 */
import React from 'react';
import { Col,Glyphicon } from 'react-bootstrap';
import marked from 'marked';

var Brief = React.createClass({

    render: function() {
        var brief = this.props.brief;
        var days = this.props.days;
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

        var track = days.map(function(day, index) {
            var spots = day.spots.map(function(spot, index) {
                return (
                    <p key={`${index}`}>{spot}</p>
                );
            });
            return (
                <div className="oneday" key={`${index}`}>
                    <div className="daycount"><i className="dian"/> DAY<strong>{`${index+1}`}</strong></div>
                    {spots}
                </div>
            );
        });



        return (
             <div className="brief container">
                <Col sm={12} md={12}>
                    <div className="track">
                        <div className="title">
                            <i  className="kuai"/>行程概要：
                        </div>
                        <div className="left-btn"><Glyphicon glyph="glyphicon glyphicon-menu-left" /></div>
                        <div className="days">
                            <div className="timeline" />
                            {track}
                        </div>
                        <div className="right-btn" ><Glyphicon glyph="glyphicon glyphicon-menu-right" /></div>
                    </div>
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
