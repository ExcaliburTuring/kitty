/**
 * @authro xiezhenzong
 */
import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { AutoAffix } from 'react-overlays';

var _config = {
    '.brief': 0,
    '.day1': 1,
    '.notice': 2,
    '.expense': 3,
    '.teaminfo': 4,
    '#app': 5,
}

var BodyNav = React.createClass({

    addOnScroll: function() {
        var briefTop = $('.brief').offset().top;
        var day1Top = 0;
        var $day1 = $('.day1');
        if ($day1.size() > 0) {
            day1Top = $day1.eq(0).offset().top;
        }
        var noticeTop = $('.notice').offset().top;
        var expenseTop = $('.expense').offset().top;
        var teaminfoTop = $('.teaminfo').offset().top;
        var $navbar = $('.am-sticky-placeholder .navbar');
        var $navItems = $navbar.find('ul li');

        window.onscroll = function(){
            var t = document.documentElement.scrollTop || document.body.scrollTop; 
            t += 60; // 80的offset
            $navbar.removeClass('affixed');
            $navItems.removeClass('select');
            if (t >= (teaminfoTop - 200)) {
                $navbar.addClass('affixed');
                $navItems.eq(4).addClass('select');
            } else if (t >= expenseTop) {
                $navbar.addClass('affixed');
                $navItems.eq(3).addClass('select');
            } else if (t >= noticeTop) {
                $navbar.addClass('affixed');
                $navItems.eq(2).addClass('select');
            } else if (t >= day1Top) {
                $navbar.addClass('affixed');
                $navItems.eq(1).addClass('select');
            } else if (t >= briefTop) {
                $navbar.addClass('affixed');
                $navItems.eq(0).addClass('select');
            }
        };

        window.onscroll();
    },

    componentDidUpdate: function() {
        this.addOnScroll();
    },

    componentWillUnmount: function() {
        window.onscroll = null;
    },

    handleSelect: function (selectedKey) {
        window.onscroll = null;
        var top = $(selectedKey).offset().top;
        $('html, body').animate({
            'scrollTop':  top > 55 ? top - 55 : 0
        }, {
            'speed': 800,
            'complete': this.addOnScroll
        });
        var $navItems = $('.am-sticky-placeholder .navbar ul li');
        $navItems.removeClass('select');
        $navItems.eq(_config[selectedKey]).addClass('select');
    },

    render: function() {
        return (
            <div className="am-sticky-placeholder">
                <AutoAffix viewportOffsetTop={0} container={this.props.container}>
                    <Navbar>
                        <Nav pullLeft activeKey={5} onSelect={this.handleSelect}>
                            <NavItem eventKey={".brief"}>路线简介</NavItem>
                            <NavItem eventKey={".day1"}>行程安排</NavItem>
                            <NavItem eventKey={".notice"}>注意事项</NavItem>
                            <NavItem eventKey={".expense"}>费用说明</NavItem>
                            <NavItem eventKey={".teaminfo"}>马上报名</NavItem>
                            <NavItem eventKey={"#app"} className="sticky-gohead">回头顶部</NavItem>
                        </Nav>
                    </Navbar>
                </AutoAffix>
            </div>
        );
    }

});

module.exports = BodyNav;
