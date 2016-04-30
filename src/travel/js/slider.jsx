/**
 * @author zhaowei
 */
import React from 'react';
import Swiper from 'swiper';
import { defaultValue } from 'config';

function _getRouteImgPath(routeImgPath) {
    return defaultValue.routeImgPath + routeImgPath;
} 

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
            mousewheelControl : false
        });
    },

    render: function() {
        var imgs = this.props.route.imgs.split(',');
        imgs = imgs.slice(0, imgs.length - 1);
        var slideItemList = imgs.map(function(img, index) {
            var bg = {backgroundImage: `url(${_getRouteImgPath(img)})`};
            return (
                <div className="swiper-slide swiper-no-swiping" style={bg} key={index}></div>
            );
        })
        return (
            <div className="swiper-container" ref="swiper">
                <div className="swiper-wrapper">
                    {slideItemList}
                </div>
                <div className="swiper-button-prev swiper-button-black" ref="prev"></div>
                <div className="swiper-button-next swiper-button-black" ref="next"></div>
            </div>
        );
    }
  
});

module.exports = Slider;
