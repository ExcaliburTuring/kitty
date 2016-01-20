import React from 'react';
import Reflux from 'reflux';
import Swiper from './swiper/swiper.js';

var App = React.createClass({
  render: function() {
    return(
      <div className="swiper-container" ref="swiper">
        <div className="swiper-wrapper">
            <div className="swiper-slide"><img src="http://i2.tietuku.com/dd187cff00045f0a.jpg"/></div>
            <div className="swiper-slide"><img src="http://image.tianjimedia.com/uploadImages/2013/172/81Z7NQ43L682.jpg"/></div>
            <div className="swiper-slide"><img src="http://s9.knowsky.com/bizhi/l/20100205/201002192%20%281%29.jpg"/></div>
            <div className="swiper-slide"><img src="http://i-7.vcimg.com/trim/154d1f39b79d56e6933ca2bd882cfd33777734/trim.jpg"/></div>
        </div>
        <div className="swiper-pagination" ref="pagination"></div>
      </div>
    )
  },
  componentDidMount: function(){
    var mySwiper = new Swiper (this.refs.swiper, {
          direction: 'vertical',
          loop: true,
          pagination: this.refs.pagination,
          mousewheelControl : true
    });
  }
});


module.exports = App;