/*
 * @author xiezhenzong
 */
import React from 'react';
import Swiper from 'swiper';
import a from '../img/A.jpg';
import b from '../img/B.jpg';
import c from '../img/C.jpg';
import d from '../img/D.jpg';

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
        var bbg = {backgroundImage: "url(" + b + ")"};
        var cbg = {backgroundImage: "url(" + c + ")"};
        var dbg = {backgroundImage: "url(" + d + ")"};
        return(
          <div className="swiper-container" ref="swiper">
            <div className="swiper-wrapper">
                <div className="swiper-slide swiper-no-swiping" style={abg}></div>
                <div className="swiper-slide swiper-no-swiping" style={bbg}></div>
                <div className="swiper-slide swiper-no-swiping" style={cbg}></div>
                <div className="swiper-slide swiper-no-swiping" style={dbg}></div>
            </div>
            <div className="swiper-button-prev swiper-button-black" ref="prev"></div>
            <div className="swiper-button-next swiper-button-black" ref="next"></div>
          </div>
        )
    }
    
});


module.exports =  Banner;