import React from 'react';
import Reflux from 'reflux';

import Rabbit from 'rabbit';
import { url } from 'config';

import A1 from '../img/A1.png';
import A2 from '../img/A2.png';
import A3 from '../img/A3.png';

var ActivityFlux = Rabbit.create(url.activityList);

var App = React.createClass({

    mixins: [Reflux.connect(ActivityFlux.store, 'list')],

    getInitialState: function() {
        ActivityFlux.actions.load();
        return {
            'list': {
                'activities': []
            }
        };
    },

    render: function() {
        var activityList = this.state.list.activities.map(function(activity, index) {
            return (<Activity activity={activity} key={index}/>);
        });
        return (
            <div className="activities">
                <div className="activity-list">
                    {activityList}
                </div>
            </div>
        );
    }
});

var Activity = React.createClass({

    render: function() {
        var activity = this.props.activity;
        return (
            <a href={`${url.activity}/${activity.activityid}`}>
                <div className="activity-container">
                    <div className="title">
                        {activity.title}
                    </div>
                    <div className="desc">
                        {activity.desc}
                    </div>
                    <div className="activity-img">
                        <img src={activity.wapImg}/>
                    </div>
                </div>
            </a>
        );
    }
});

module.exports = App;
