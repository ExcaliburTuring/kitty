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
        RouteFlux.actions.load({'routeids': routeid});
        GroupsFlux.actions.load({'routeid': routeid});
        return {
            'routes': {
                'status': 1,
                'routes': [{
                    'days': 0,
                    'name': '',
                    'title': '',
                    'route': '',
                    'minPrice': '¥0',
                    'maxPrice': '¥0'
                }],
                'more': {
                    'sliderImgs': [],
                    'desc': [],
                    'local': '',
                    'prepare': '',
                    'traffic': '',
                    'expenseInclude': '',
                    'expenseExclude': '',
                    'refund': ''
                },
                'days': [],
                'pcInfo': {
                    'introduction': '',
                    'spotlights':[]
                }
            },
            'groups': {
                'status': 1,
                'groups': []
            }
        }
    },

    render: function() {
        var routes = this.state.routes;
        var more = routes.more;
        var groups = this.state.groups;
        return (
            <div>
                <Navbar name="routes" />
                <div className="content container">
                    <Face route={routes.routes[0]} sliderImgs={more.sliderImgs} descriptions={more.desc}/>
                    <div className="body-nav"><BodyNav container={this}/></div>
                    <Brief days={routes.days} pcInfo={routes.pcInfo}/>
                    <Days days={routes.days}/>
                    <Notice local={more.local} prepare={more.prepare} traffic={more.traffic}/>
                    <Expense include={more.expenseInclude} exclude={more.expenseExclude} refund={more.refund}/>
                    <Groups groups={groups.groups}/>
                </div>
                <Footer />
            </div>
        );
    }

});

module.exports = App;


