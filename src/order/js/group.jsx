/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';

var GroupBrief = React.createClass({

    render: function() {
        var groupinfo = this.props.group;
        return (
            <div className="travel-info">
                <div className="group-brief-container section-container"> 
                    <div className="infos">
                        <img src={groupinfo.img} />
                        <h2>{groupinfo.name}</h2>
                        <h3>{groupinfo.title}</h3>
                        <h4>{groupinfo.time}</h4>
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