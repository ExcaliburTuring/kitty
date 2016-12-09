import React from 'react';
import Reflux from 'reflux';

import Rabbit from 'rabbit';
import { url } from 'config';

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
                    <p className="title">{activity.title}</p>
                    <p className="desc">{activity.desc}</p>
                    {
                            activity.activityid == 3 && activity.param.count > 0 
                            ? <p className="desc">还剩余
                                <span className="postcard-count">{activity.param.count}</span>
                                张
                            </p>
                            : null
                    }
                    <div className="activity-img">
                        <img src={activity.wapImg}/>
                    </div>
                </div>
            </a>
        );
    }
});

module.exports = App;
