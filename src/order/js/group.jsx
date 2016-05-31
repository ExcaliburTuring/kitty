/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';

var GroupBrief = React.createClass({

    render: function() {
        var travelRoute = this.props.travelRoute;
        var travelGroup = this.props.travelGroup;
        return (
            <div className="travel-info">
                <div className="group-brief-container section-container"> 
                    <div className="infos">
                        <img src={travelRoute.headImg} />
                        <h2>{travelRoute.name}</h2>
                        <h3>{travelRoute.title}</h3>
                        <h4>{travelRoute.route}</h4>
                        <h4>{travelGroup.startDate} 至 {travelGroup.endDate}</h4>
                    </div>
                </div>
                <div className="total">
                    <p>总价：</p><div className="price-right">{travelGroup.price}</div>
                </div>
            </div>
        );
    }
});

module.exports = GroupBrief;