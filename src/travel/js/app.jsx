/**
 * @authro xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';

import Rabbit from 'rabbit';
import { url } from 'config';
import Navbar from 'navbar';
import Footer from 'footer';
import NotFound from 'notfound';
import Face from './face';
import Body from './body';

var Route = Rabbit.create(url.route);
var Groups = Rabbit.create(url.group);

var App = React.createClass({

    mixins: [
        Reflux.connect(Route.store, 'route'),
        Reflux.connect(Groups.store, 'groups'),
    ],

    getInitialState: function() {
        var routeid = window.location.pathname.split('/')[2];
        var valid = true;
        if (/\d+/.test(routeid)) {
            Route.actions.load({'routeids': routeid, 'isImgtextRequired': true});
            Groups.actions.load({'routeid': routeid});
        } else {
            valid = false;
        }
        return {
            'route': {
                'status': 0,
                'routes': [],
                'imgtext': {}
            },
            'groups': {
                'status': 0,
                'groups': []
            },
            'valid': valid // routeid是否正常
        }
    },

    render: function() {
        var state = this.state;
        var route = state.route;
        var groups = state.groups;
        var content;
        if (state.valid 
                && route.routes.length >= 1) {
            content = (
                <div>
                    <Face route={route.routes[0]} imgtext={route.imgtext}/>
                    <div className="body" id="body">
                        <Body 
                            route={route.routes[0]}
                            imgtext={route.imgtext}
                            groups={groups.groups}/>
                    </div>
                </div>
            );
        } else {
            content = (<NotFound />);
        }

        return (
            <div>
                <Navbar name="routes" />
                {content}
                <Footer />
            </div>
        );
    }

});

module.exports = App;
