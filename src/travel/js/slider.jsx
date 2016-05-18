/**
 * @author zhaowei
 */
import React from 'react';
import Swiper from 'swiper';
import { defaultValue } from 'config';

var Slider = React.createClass({

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
            mousewheelControl : false,
            effect : 'fade',
            fade: {
              crossFade: true,
            }
        });
    },

    render: function() { 
        var slideItemList = this.props.sliderImgs.map(function(img, index) {
            var bg = {backgroundImage: `url(${defaultValue.getRouteImgPath(img)})`};
            return (
                <div className="swiper-slide swiper-no-swiping" style={bg} key={index}></div>
            );
        })
        return (
            <div className="swiper-container" ref="swiper">
                <div className="swiper-wrapper">
                    {slideItemList}
                </div>
                <div className="swiper-button-prev swiper-button-white" ref="prev"></div>
                <div className="swiper-button-next swiper-button-white" ref="next"></div>
                <div className="body-nav-mask"></div>
            </div>
        );
    }
  
});

module.exports = Slider;
