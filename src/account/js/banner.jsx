/**
 * @author xiezhenzong
 */
import React from 'react';

import bannerImg from '../img/banner.gif';

var Banner = React.createClass({
    render: function() {
        var bg = {
            backgroundImage: `url(${bannerImg})`
        };
        return (
            <div style={bg} className="banner"></div>
        );
    }
});

module.exports = Banner;
