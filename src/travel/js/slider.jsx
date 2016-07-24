/**
 * @author zhaowei
 */
import React from 'react';
import Swiper from 'swiper';

var Slider = React.createClass({

    componentDidUpdate: function(nextProps, nextState){
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
        var name = this.props.name;
        var descriptionlist = this.props.descriptions;
        var slideItemList = this.props.sliderImgs.map(function(img, index) {
            var bg = {backgroundImage: `url(${img})`};
            return (
                <div className="swiper-slide swiper-no-swiping" style={bg} key={index}>
                    <div className="topleft">
                        <div className="name">{name}</div>
                        <div>
                            <span className="day-count">{index+1}</span>
                            <span>/9days</span>
                            <span>  {descriptionlist[index]}</span>
                        </div>
                    </div>
                </div>
            );
        })
        return (
            <div className="swiper-container" ref="swiper">
                <div className="rightbottom">
                    <div>
                        <span>总价 ￥</span>
                        <span className="price">3880</span>
                    </div>
                </div>
                <div className="swiper-wrapper">
                    {slideItemList}
                </div>
                <div className="swiper-button-prev swiper-button-white" ref="prev"></div>
                <div className="swiper-button-next swiper-button-white" ref="next"></div>
            </div>
        );
    }
  
});

module.exports = Slider;
