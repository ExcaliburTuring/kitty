/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import marked from 'marked';
import { Tabs } from 'antd-mobile';
const TabPane = Tabs.TabPane;

import 'antd/lib/index.css';

var RouteInfo = React.createClass({

    getInitialState() {
        return {
            'infoType': 'XINGCHENG'
        }
    },

    onSelectInfoType: function(type) {
        this.setState({'infoType': type});
    },

    render: function() {
        var days = this.props.days;
        var more = this.props.more;
        return (
            <div className="info-container">
                <Tabs activeKey={`${this.state.infoType}`} animated={false} onTabClick={this.onSelectInfoType}
                    onChange={this.onSelectInfoType}>
                    <TabPane tab="行程" key="XINGCHENG">
                        <XingCheng className="order-list" days={days}/>
                    </TabPane>
                    <TabPane tab="费用" key="FEIYONG">
                        <FeiYong className="order-list" include={more.expenseInclude} exclude={more.expenseExclude} refund={more.refund}/>
                    </TabPane>
                    <TabPane tab="须知" key="XUZHI">
                         <XuZhi className="order-list" local={more.local} prepare={more.prepare} traffic={more.traffic}/>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
});

var XingCheng = React.createClass({

    render: function() {
        var days = this.props.days;
        var firstDay, lastDay, daysList;
        if (days.length != 0) {
            firstDay = (<Dayfirst day={days[0]} dayno={days[0].dayno}/>) ;
            lastDay = (<Daylast day={days[days.length - 1]} dayno={days[days.length - 1].dayno}/>);
            daysList = days.slice(1, days.length -1).map(function(day, index) {
                return (
                    <Day day={day} dayno={day.dayno} key={`day-${index}`}/>
                );
            });
        }
        return (
            <div className="day-info-container" onClick={this.onClick}>
                {firstDay}
                {daysList}
                {lastDay}
            </div>
        );
    }
});

var Dayfirst = React.createClass({

    render: function() {
        var day = this.props.day;
        var dayno = this.props.dayno;
        var detail = marked(day.detail);
        return (
            <div className="days dayfirst">
                <h2><div className="daycount">{dayno}</div>Day{dayno} {day.title}</h2>
                <div dangerouslySetInnerHTML={{__html: detail}}></div>
            </div>
        );
    }
});

var Daylast = React.createClass({

    render: function() {
        var day = this.props.day;
        var dayno = this.props.dayno;
        var detail = marked(day.detail);
        return (
            <div className="days daylast">
                <h2><div className="daycount">{dayno}</div>Day{dayno} {day.title}</h2>
                <div dangerouslySetInnerHTML={{__html: detail}}></div>
            </div>
        );
    }
});

var Day = React.createClass({

    createAddInfo: function(fa, text) {
        return (
            <h4 className={fa}>{text}</h4>
        );
    },

    render: function() {
        var day = this.props.day;
        var dayno = this.props.dayno;
        var detail = marked(day.detail);
        var star = day.star ? this.createAddInfo('c1', day.star) : null; 
        var food = day.food ? this.createAddInfo('c2', day.food) : null;
        var distance = day.distance ? this.createAddInfo('c3', day.distance) : null;
        var hotel = day.hotel ? this.createAddInfo('c4', day.hotel) : null;
        return (
            <div className="days">
                <h2><div className="daycount">{dayno}</div>Day{dayno} {day.title}</h2>
                <div dangerouslySetInnerHTML={{__html: detail}}></div>
                <div className="icons">
                    {star}
                    {food}
                    {distance}
                    {hotel}
                </div>
            </div>
        );
    }

});

var FeiYong = React.createClass({
            
    render: function() {
        var include = marked(this.props.include);
        var exclude = marked(this.props.exclude);
        var refund = marked(this.props.refund);
        return (
            <div className="info-item-container" onClick={this.onClick}>
                <h2>费用包含</h2>
                <div dangerouslySetInnerHTML={{__html: include}}></div>
                <h2>费用不包含</h2>
                <div dangerouslySetInnerHTML={{__html: exclude}}></div>
                <h2>退款&保证</h2>
                <div dangerouslySetInnerHTML={{__html: refund}}></div>
            </div>
        );
    }

});

var XuZhi = React.createClass({

    render: function() {
        var local =  marked(this.props.local);
        var traffic = marked(this.props.traffic);
        var prepare = marked(this.props.prepare);
        return (
            <div className="info-item-container" onClick={this.onClick}>
                <h2>关于当地</h2>
                <div dangerouslySetInnerHTML={{__html: local}}></div>
                <h2>交通信息</h2>
                <div dangerouslySetInnerHTML={{__html: traffic}}></div>
                <h2>物资准备</h2>
                <div dangerouslySetInnerHTML={{__html: prepare}}></div>
            </div>
        );
    }

});

module.exports = RouteInfo;
