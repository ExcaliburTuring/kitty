/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';

import Group from 'group';

import Rabbit from 'rabbit';

import { defaultValue,url } from 'config';

var Groupinfo = Rabbit.create(url.groupinfo); 

       
var GroupBrief = React.createClass({

    mixins: [Reflux.connect(Groupinfo.store, 'data')],

    getInitialState: function() {
        return {
            'data': {
                'status': 0,
                'groupinfo': {}
            }
        }
    },

    componentDidMount: function() {
        var groupid = this.props.groupid;
        Groupinfo.actions.load();
    },

    render: function() {
        var groupinfo = this.state.data.groupinfo;
        var travelers = this.props.travelers.map(function(traveler, index) {
            return (
                <div>
                    <p key={`${index}`}>
                        {traveler}
                    </p>
                    <div className="price-right">
                        {groupinfo.price}
                    </div>
                </div>
            );
        });

        return (
            <div className="group-brief-container section-container"> 
                <div className="infos">
                    <img src={groupinfo.img} />
                    <h2>{groupinfo.name}</h2>
                    <h3>{groupinfo.title}</h3>
                    <h4>{groupinfo.time}</h4>
                    {travelers}
                </div>
            </div>
        );
    }
});

module.exports = GroupBrief;