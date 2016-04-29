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
import Head from './face/Face';
import Body from './body/Body';

var Route = Rabbit.create(url.route);
var Groups = Rabbit.create(url.groups);

var App = React.createClass({

    mixins: [
        Reflux.connect(Route.store, 'route'),
        Reflux.connect(Groups.store, 'groups'),
    ]

    getInitialState: function() {
        var routeid = window.location.pathname.split('/')[2];
        var valid = true;
        if (/\d+/.test(routeid)) {
            Route.actions.load({'routeid': routeid});
            Groups.actions.load({'routeid': routeid});
        } else {
            valid = false;
        }
        return {
            'route': [],
            'groups': [],
            'valid': valid // routeid是否正常
        }
    },

    render: function() {
        var content;
        if (this.state.valid) {
            content = (
                <Head route={this.state.route}/>
                <div className="body" id="body">
                    <div className="maininfo">
                        <Body route={this.state.route} grops={this.state.groups}/>
                    </div>
                </div>
            );
        } else {
            content = (<NotFound />);
        }

        return (
            <div>
                <Navbar />
                {content}
                <Footer />
            </div>
        );
    }

});

module.exports = App;
