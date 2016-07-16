import React from 'react';
import Reflux from 'reflux';
import { Row, Col, Image } from 'react-bootstrap';

import { url } from 'config';
import Rabbit from 'rabbit';
import Groups from './groups'

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
            'detailVisible': false
        }
    },

    onClick: function() {
        var routeid = this.props.route.routeid;
        window.location.pathname= `${url.travel}/${routeid}`;
    },

    onhandleChange: function() {
        var detailVisible = !this.state.detailVisible;
        this.setState({'detailVisible': detailVisible})
    },

    render: function() {
        var route = this.props.route;
        var GroupInfo = Rabbit.create(url.group); 
        var groups = null;
        if (this.state.detailVisible) {
            groups = (<Groups routeid={route.routeid} groupInfo={GroupInfo}/>)
        }

        return (
            <div className="route-container">
                <div className="header">
                    <div className="head-title" onClick={this.onClick}>
                        {route.name}
                    </div>
                </div>
                <div className="content">
                    <Row>
                        <Col md={4}>
                            <Image responsive src={route.headImg} onClick={this.onClick}/>
                        </Col>
                        <Col md={8}>
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
                            <div className="detail" onClick={this.onhandleChange}>
                                出发日期
                            </div>
                            <div className="price">
                                {route.minPrice} - {route.maxPrice}
                            </div>
                        </Col>
                    </Row>
                </div>
                {groups}
            </div>
        )
    }
})

module.exports = App;
