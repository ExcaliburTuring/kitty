/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';

var GroupBrief = React.createClass({

    render: function() {
        var groupinfo = this.props.group;
        var travelers = this.props.travelers.map(function(traveler, index) {
            return (
                <div key={`${index}`}>
                    <p>
                        {traveler}
                    </p>
                    <div className="price-right">
                        {groupinfo.price}
                    </div>
                </div>
            );
        });
        return (
            <div className="travel-info">
                <div className="group-brief-container section-container"> 
                    <div className="infos">
                        <img src={groupinfo.img} />
                        <h2>{groupinfo.name}</h2>
                        <h3>{groupinfo.title}</h3>
                        <h4>{groupinfo.time}</h4>
                        {travelers}
                    </div>
                </div>
                <div className="total">
                    <p>总价：</p><div className="price-right">￥3980</div>
                </div>
            </div>
        );
    }
});

module.exports = GroupBrief;