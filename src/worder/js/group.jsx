/**
 * @author xiezhenzong 
 */
import React from 'react';
import { Image } from 'react-bootstrap';

var GroupInfo = React.createClass({

    render: function() {
        var travelRoute = this.props.travelRoute;
        var travelGroup = this.props.travelGroup;
        var selectTraveller = this.props.selectTraveller;
        return (
            <div className="travel-info-container">
                <div>
                    <Image responsive src={travelRoute.headImg}/>
                    <div className="travel-info">
                        <h4>{travelRoute.name}</h4>
                        <p>{travelRoute.title}</p>
                        <p>{travelGroup.startDate} 至 {travelGroup.endDate}</p>
                    </div>
                     <div>
                        <p>单价：<span className="price-right">{travelGroup.price}</span></p>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = GroupInfo;
