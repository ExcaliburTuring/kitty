import React from 'react';
import Reflux from 'reflux';
import marked from 'marked';
import { Drawer, ListView, Button } from 'antd-mobile';

import { url } from 'config';
import Rabbit from 'rabbit';

import img from '../img/img.jpg';

var RouteFlux = Rabbit.create(url.route);
var GroupsFlux = Rabbit.create(url.group);

var App = React.createClass({

    mixins: [
        Reflux.connect(RouteFlux.store, 'routes'),
        Reflux.connect(GroupsFlux.store, 'groups'),
    ],

    onOpenChange(isOpen) {
        this.setState({ 'open': !this.state.open });
    },

    onEndReached(event) {
        console.log("on end Reached")
    },

    getInitialState() {
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
                    'minPrice': '¥0',
                    'maxPrice': '¥0'
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
                },
                'mdtext': ''
            },
            'groups': {
                'status': 1,
                'groups': []
            },
            'open': true,
        };
    },

    render: function() {
        var routes = this.state.routes.routes[0];
        var mdtext = this.state.routes.mdtext;
        var days = this.state.routes.imgtext.days;
        var dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        }).cloneWithRows(days);

        var sidebar = (
            <div className="days-list-sidebar">
                <p>{`${routes.title}--行程概要`}</p>
                <p>{`出发城市：${routes.departure}`}</p>
                <p>{`结束城市：${routes.distination}`}</p>
                <ListView
                    {...ListViewRender}
                    dataSource={dataSource}
                    scrollRenderAheadDistance={500}
                    scrollEventThrottle={20}
                    onScroll={() => { console.log('scroll'); }}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}/>
            </div>
        );
        return (
            <div>
                {
                    days.length
                    ? <Drawer sidebar={sidebar} open={this.state.open} onOpenChange={this.onOpenChange}>
                        <div></div>
                    </Drawer>
                    : null
                }
                {
                    mdtext
                    ? <div className="travel-dairy" dangerouslySetInnerHTML={{__html: marked(mdtext)}}></div>
                    : null
                }
                 <Button type="primary"className="days-list-toggle" onClick={this.onOpenChange}>目录</Button>
            </div>
        );
    }
});

var ListViewRender = {
    //'className': "days-list-sidebar",
    // 'renderHeader': () => <span>header</span>,
    // 'renderFooter': function() {
    //     return (
    //         <div>
    //             {'加载完毕'}
    //         </div>
    //     );
    // },
    // 'renderSectionHeader': function(sectionData) {
    //     return (
    //         <div>Header</div>
    //     );
    // },
    'renderRow':  function(rowData, sectionID, rowID) {
        return (
            <div key={rowID} className="day-item-container">
                <p>{rowData.title}</p>
                <div className="day-item">
                    <p>{`行程：${rowData.mdtext}`}</p>
                    <p>{`亮点：${rowData.spots}`}</p>
                    <p>{`距离: ${rowData.distance}`}</p>
                    <p>{`住宿：${rowData.hotel}`}</p>
                    <p>{`含餐：${rowData.food}`}</p>
                </div>
            </div>
        );
    }
}

module.exports = App;
