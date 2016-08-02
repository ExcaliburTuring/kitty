/**
 * @authro xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';

import Rabbit from 'rabbit';
import { url } from 'config';
import Navbar from 'navbar';
import Footer from 'footer';
import Face from './face';
import BodyNav from './body_nav';
import Brief from './brief';
import Days from './days';
import Notice from './notice';
import Expense from './expense';
import Groups from './groups';

var RouteFlux = Rabbit.create(url.route);
var GroupsFlux = Rabbit.create(url.group);

var App = React.createClass({

    mixins: [
        Reflux.connect(RouteFlux.store, 'routes'),
        Reflux.connect(GroupsFlux.store, 'groups'),
    ],

    getInitialState: function() {
        var routeid = window.location.pathname.split('/')[2];
        RouteFlux.actions.load({
            'routeids': routeid, 
            'isImgtextRequired': true
        });
        GroupsFlux.actions.load({'routeid': routeid});
        return {
            'routes': {
                'status': 1,
                'routes': [{
                    'days': 0,
                    'name': '',
                    'title': '',
                    'route': '',
                    'minPrice': 0,
                    'maxPrice': 0
                }],
                'imgtext': {
                    'sliderImgs': [],
                    'descriptions': [],
                    'introduction': {
                        'mdtext': '',
                        'spotlights':[]
                    },
                    'days': [],
                    'notice': {
                        'local': '',
                        'prepare': '',
                        'traffic': ''
                    },
                    'expense': {
                        'include': '',
                        'exclude': '',
                        'cancel': ''
                    }
                }
            },
            'groups': {
                'status': 1,
                'groups': []
            }
        }
    },

    render: function() {
        var state = this.state;
        var routes = state.routes;
        var imgtext = routes.imgtext;
        var groups = state.groups;
        return (
            <div>
                <Navbar name="routes" />
                <div className="content container">
                    <Face route={routes.routes[0]} sliderImgs={imgtext.sliderImgs} descriptions={imgtext.descriptions}/>
                    <div className="body-nav"><BodyNav container={this}/></div>
                    <Brief brief={imgtext.introduction}/>
                    <Days days={imgtext.days}/>
                    <Notice notice={imgtext.notice}/>
                    <Expense expense={imgtext.expense}/>
                    <Groups groups={groups.groups}/>
                </div>
                <Footer />
            </div>
        );
    }

});

module.exports = App;


