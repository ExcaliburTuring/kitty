/**
 * @authro xiezhenzong
 */
import React from 'react';
import { Col, Image } from 'react-bootstrap';
import marked from 'marked';

var Days = React.createClass({

    render: function() {
        var days = this.props.days;
        var firstDay, lastDay, daysList;
        if (days.length != 0) {
            firstDay = (<Day1 day={days[0]}/>) ;
            lastDay = (<Day1 day={days[days.length - 1]}/>);
            daysList = days.slice(1, days.length -1).map(function(day, index) {
                return (
                    <Day day={day} key={`day-${index}`}/>
                );
            });
        }
        return (
            <div className="xingcheng container">
                <Col xs={12} md={12}>
                    <br/>
                    <hr/>
                    <br/>
                </Col>
                {firstDay}
                <Col xs={12} md={12}>
                    <br/>
                    <hr/>
                    <br/>
                </Col>
                {daysList}
                {lastDay}
            </div>
        );
    }

});

var Day1 = React.createClass({

    render: function() {
        var day = this.props.day;
        var mdtext = marked(day.mdtext);
        return (
            <div className="day1">
                <Col xs={12} md={12}>
                    <h2>{day.title}</h2>
                </Col>
                <Col xs={12} md={6}>
                    <Image responsive src={day.imgs[0]}/>
                </Col>
                <Col xs={12} md={6}>
                    <i className="fa fa-bookmark fa-5x"/>
                    <div dangerouslySetInnerHTML={{__html: mdtext}}></div>
                </Col>
            </div>
        );
    }

});

var Day = React.createClass({

    createAddInfo: function(fa, text) {
        var className = `fa ${fa}`;
        return (
            <h4><i className={className} />{text}</h4>
        );
    },

    render: function() {
        var day = this.props.day;
        var mdtext = marked(day.mdtext);
        var distance = day.distance ? this.createAddInfo('fa-tachometer', day.distance) : null;
        var latitude = day.latitude ? this.createAddInfo('fa-flag', day.latitude) : null;
        var hotel = day.hotel ? this.createAddInfo('fa-hotel', day.hotel) : null;
        var food = day.food ? this.createAddInfo('fa-cutlery', day.food) : null;
        var star = day.star ? this.createAddInfo('fa-star', day.star) : null; 
        return (
            <div className="days">
                <Col xs={12} md={12}>
                    <h2>{day.title}</h2>
                </Col>
                <Col xs={12} md={6}>
                    <Image responsive src={day.imgs[0]}/>
                    <div dangerouslySetInnerHTML={{__html: mdtext}}></div>
                </Col>
                <Col xs={12} md={6}>
                    <Image responsive src={day.imgs[1]}/>
                    <div className="icons">
                        {star}
                        {food}
                        {distance}
                        {latitude}
                        {hotel}
                    </div>
                </Col>
                <Col xs={12} md={12}>
                    <br/>
                    <hr/>
                    <br/>
                </Col>
            </div>
        );
    }

});

module.exports = Days;
