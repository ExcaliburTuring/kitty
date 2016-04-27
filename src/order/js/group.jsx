/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';

import Group from 'group';

var GroupBrief = React.createClass({

    //mixins: [Reflux.connect(Group.store, 'data')],

    getInitialState: function() {
        return {
            'data': {
            }
        }
    },

    // componentDidMount: function() {
    //     var groupid = this.props.groupid;
    //     Group.actions.get();
    // },

    render: function() {
        return (
            <div className="group-brief-container section-container"> 
                <p>这里是团的基本信息</p>
            </div>
        );
    }
});

module.exports = GroupBrief;