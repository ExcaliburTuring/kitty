/*
 * @author zhaowei
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
        var doubleDownBtn = null;
        if (this.props.showDoubleDownBtn) {
            doubleDownBtn = (
                <div className="navigation">
                    <i className="fa fa-angle-double-down" aria-hidden="true" onClick={this.props.onDoubleDownBtnClick}/>
                </div>
            );
        }

        return(
            <div className="swiper-container" ref="swiper">
                <div className="swiper-wrapper">
                    <div className="swiper-slide swiper-no-swiping" style={abg}></div>
                    <div className="swiper-slide swiper-no-swiping" style={bbg}></div>
                    <div className="swiper-slide swiper-no-swiping" style={cbg}></div>
                    <div className="swiper-slide swiper-no-swiping" style={dbg}></div>
                </div>
                {doubleDownBtn}
                <div className="arrow-container">
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