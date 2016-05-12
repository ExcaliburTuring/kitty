import React from 'react';
import head from '../img/head';

var Pageone = React.createClass({

    render: function() {
        return (
            <div className="activity-container">
                <img src={head} />
                <div className="bottom" ref="next">点击查看下一页<br /><i className="fa fa-angle-down"/></div>
            </div>
        );
    }
});


module.exports = Pageone;
