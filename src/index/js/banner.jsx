/*
 * @author zhaowei
 */
import React from 'react';

import Swiper from 'swiper';
import a from '../img/A.jpg';
import d from '../img/d.jpg';
import e from '../img/e.jpg';
import f from '../img/f.jpg';

var Banner = React.createClass({

    componentDidMount: function(){
        var mySwiper = new Swiper (this.refs.swiper, {
            direction: 'horizontal',
            autoplay: 5000,
            speed: 600,
            loop: true,
            noSwiping : true,
            autoplayDisableOnInteraction : false,
            prevButton: this.refs.prev,
            nextButton: this.refs.next,
            mousewheelControl : false
        });
    },

    render: function() {
        var abg = {backgroundImage: "url(" + a + ")"};
        var dbg = {backgroundImage: "url(" + d + ")"};
        var ebg = {backgroundImage: "url(" + e + ")"};
        var fbg = {backgroundImage: "url(" + f + ")"};

        return(
            <div className="swiper-container" ref="swiper">
                <div className="swiper-wrapper">
                    <div className="swiper-slide swiper-no-swiping" style={abg}></div>
                    <div className="swiper-slide swiper-no-swiping" style={ebg}></div>
                    <div className="swiper-slide swiper-no-swiping" style={dbg}></div>
                    <div className="swiper-slide swiper-no-swiping" style={fbg}></div>
                </div>
                <div className="arrow-container swiper-no-swiping">
                    <div className="arrows">
                        <div className="left-arrow" ref="prev">
                            <i className="fa fa-angle-left"/><a>PREV</a>
                        </div>
                        <div className="right-arrow" ref="next">
                            <a>NEXT</a><i className="fa fa-angle-right"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
});


module.exports =  Banner;