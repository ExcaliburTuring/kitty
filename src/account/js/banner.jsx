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
            <div className="banner"><iframe sandbox="allow-scripts allow-same-origin" id="mh" src="./canvas"></iframe></div>

        );
    }
});

module.exports = Banner;
