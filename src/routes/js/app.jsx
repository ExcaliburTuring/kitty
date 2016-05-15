import React from 'react';
import Reflux from 'reflux';
import { url } from 'config';
import Rabbit from 'rabbit';
import {Col } from 'react-bootstrap';
import Groups from './groups'

var RouteList = Rabbit.create(url.routeList); 

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
        console.log(routes);

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

    onhandleChange: function() {
        var detailVisible = !this.state.detailVisible;
        this.setState({'detailVisible': detailVisible})
    },

    render: function() {
        var route = this.props.route;
        var groups;

        if(this.state.detailVisible == true){
            groups = (<Groups routeid={route.routeid} />);
        }else if(this.state.detailVisible == false){
            groups = "";
        }

        return (
            <div className="route-container">
                <div className="header">
                    <div className="head-title">
                        {route.name}
                    </div>
                </div>
                <div className="content">
                    <Col md={4}>
                        <img src={route.img} />
                    </Col>
                    <Col md={8}>
                        <div className="days">
                            <span className="up">{route.days}</span><span className="down">DAY</span>
                        </div>
                        <div className="name">
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
                            ￥{route.minPrice} - ￥{route.maxPrice}
                        </div>
                    </Col>
                </div>
                {groups}
            </div>
        )
    }
})

module.exports = App;
