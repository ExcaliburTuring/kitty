/**
 * @author xiezhenzong 
 */
import React from 'react';

var GroupInfo = React.createClass({

    render: function() {
        var travelRoute = this.props.travelRoute;
        var travelGroup = this.props.travelGroup;
        var selectTraveller = this.props.selectTraveller;
        return (
            <div className="travel-info-container">
                <div className="travel-title">
                    <p>【{travelRoute.name}】{travelRoute.title}</p>
                </div>
                <div className="travel-detail clearfix">
                    <p className="pull-left">
                        <span className="travel-date">{travelGroup.startDate}</span>
                        至
                        <span className="travel-date">{travelGroup.endDate}</span>
                    </p>
                    <p className="pull-right">
                        ¥<span className="travel-price">
                            {travelGroup.price.replace("￥", "")}
                        </span>元
                    </p>
                </div>
            </div>
        );
    }
});

module.exports = GroupInfo;
