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
        var days = this.props.days, lastDayIndex = this.props.days.length - 1;
        var daysList = days.map(function(day, index) {
            return (
                <Day day={day} dayno={day.dayno} key={`day-${index}`} 
                    isFirstDay={index == 0} isLastDay={index == lastDayIndex}/>
            );
        });
        return (
            <div className="day-info-container" onClick={this.onClick}>
                {daysList}
            </div>
        );
    }
});

var Day = React.createClass({

    createAddInfo: function(fa, label, text) {
        return (
            <h4 className={fa}><span className="day-icons-label">{`${label}:`}</span><span>{text}</span></h4>
        );
    },

    render: function() {
        var day = this.props.day;
        var dayno = this.props.dayno;
        var detail = marked(day.detail);
        var star = day.star ? this.createAddInfo('c1', '亮点', day.star) : null; 
        var food = day.food ? this.createAddInfo('c2', '含餐', day.food) : null;
        var distance = day.distance ? this.createAddInfo('c3', '车程', day.distance) : null;
        var hotel = day.hotel ? this.createAddInfo('c4', '住宿', day.hotel) : null;
        return (
            <div className={`days ${this.props.isFirstDay ? 'first-day': null} ${this.props.isLastDay ? 'last-day' : ''}`}>
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
