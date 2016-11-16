/**
 * @authro xiezhenzong
 */
import React from 'react';
import { Col, Glyphicon } from 'react-bootstrap';
import marked from 'marked';
import Swiper from 'swiper';
import Map from './map';


var Brief = React.createClass({

    componentDidUpdate: function(nextProps, nextState){
        var mySwiper = new Swiper (this.refs.swiper, {
            slidesPerView: 8,
            spaceBetween: 20,
            prevButton: this.refs.prev,
            nextButton: this.refs.next,
            mousewheelControl : false
        });
    },

    render: function() {
        var brief = this.props.brief;
        var days = this.props.days;
        var mdtext =  marked(brief.mdtext);
        var length = brief.spotlights.length;
        var spotlights = brief.spotlights.map(function(spotlight, index) {
            return (
                <Col sm={6} md={6} key={`travel-brief-${index}`}>
                    <div className="liangdian" key={`${index}`}>
                        亮点 <span className="light-title">{`${ index % 2 ? Math.floor((length + index) / 2) + 1 : index / 2 + 1}`}</span>： 
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
                <div className="oneday swiper-slide" key={`${index}`}>
                    <div className="daycount"><i className="dian"/> DAY<strong>{`${index+1}`}</strong></div>
                    {spots}
                </div>
            );
        });

        return (
             <div className="brief">
                <Col sm={12} md={12}>
                    <div className="track">
                        <div className="title">
                            <i className="kuai"/>行程概要：
                        </div>
                        <div className="left-btn" ref="prev">
                            <Glyphicon glyph="glyphicon glyphicon-menu-left"/>
                        </div>
                        <div className="right-btn" ref="next">
                            <Glyphicon glyph="glyphicon glyphicon-menu-right"/>
                        </div>
                        <div className="days swiper-container" ref="swiper">
                            <div className="timeline" />
                            <div className="swiper-wrapper">{track}</div>
                        </div>
                    </div>
                    <hr />
                    <div className="brief-info" dangerouslySetInnerHTML={{__html: mdtext}}></div>
                </Col>
                <Col sm={12} md={12}>
                    <Map/>
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
