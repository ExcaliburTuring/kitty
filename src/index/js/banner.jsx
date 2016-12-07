/*
 * @author zhaowei
 */
import React from 'react';

import Swiper from 'swiper';
import a from '../img/A.jpg';
import WH from '../img/196.png';
import { Col } from 'react-bootstrap';

var Banner = React.createClass({

    componentDidMount: function(){
        var mySwiper = new Swiper (this.refs.swiper, {
            direction: 'horizontal',
            autoplay: 0,
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

        return(
            <div className="WH-table">
                <img className="WH-container" src={WH} />
                <div className="swiper-container" ref="swiper">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide swiper-no-swiping" style={abg}></div>
                    </div>
                    <div className="arrow-container swiper-no-swiping">
                        <div className="arrows container">
                            <div className="left-arrow" ref="prev">
                                <i className="fa fa-angle-left"/><a>Prev</a>
                            </div>
                            <div className="right-arrow" ref="next">
                                <a>Next</a><i className="fa fa-angle-right"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
});


module.exports =  Banner;