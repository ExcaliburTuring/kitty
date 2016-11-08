import React from 'react';
import Reflux from 'reflux';
import { Col, Image } from 'react-bootstrap';

import { url } from 'config';
import Rabbit from 'rabbit';

var RouteList = Rabbit.create(url.route); 

var App = React.createClass({

    mixins: [Reflux.connect(RouteList.store, 'data')],

    getInitialState: function() {
        return {
            'data': {
                'status': 1,
                'errors': [],
                'routes': []
            }
        }
    },

    componentDidMount: function() {
        RouteList.actions.load();
    },

    render: function() {
        var routes = this.state.data.routes;
        var routeList = routes.map(function(route) {
            return (
                    <Routes route={route} key={route.routeid}/>
            );
        });

        return (
            <div className="container">
                {routeList}
            </div>
        );
    }
});

var Routes =React.createClass({

    getInitialState: function() {
        return{
            'detailVisible': 'false'
        }
    },

    onClick: function() {
        var routeid = this.props.route.routeid;
        window.location.href= `${url.travel}/${routeid}`;
    },

    render: function() {
        var route = this.props.route;

        return (
            <div className="route-container container">
                <Col sm={6} md={6}>
                    <Image className="headimg" responsive src={route.headImg} onClick={this.onClick}/>
                </Col>
                <Col sm={6} md={6}>
                    <div className="days">
                        <span className="up">{route.days}</span><span className="down">DAY</span>
                    </div>
                    <div className="name" onClick={this.onClick}>
                        {route.name}
                    </div>
                    <div className="title">
                        {route.title}
                    </div>
                    <div className="route">
                        路线： <span className="">{route.route}</span>
                    </div>
                    <div className="desc">
                        {route.desc}
                    </div>
                    <div className="price">
                        {route.minPrice} - {route.maxPrice}
                    </div>
                </Col>
            </div>
        )
    }
})

module.exports = App;
