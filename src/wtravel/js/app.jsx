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

        var a1="## $t1{段落样式1}";
        var b1="## $t2{段落样式2}";
        var c1="## $t3{段落样式3}";
        var d1="## $t4{段落样式4}";
        var e1="## $t5{段落样式5}";
        var f1="## $t6{段落样式6}";
        var g1="## $t7{段落样式7}";
        var h1="## $t8{段落样式8}";

        var a2="$t1{文字样式1}普通的文字";
        var b2="$t2{文字样式2}普通的文字";
        var c2="$t3{文字样式3}普通的文字";
        var d2="$t4{文字样式4}普通的文字";
        var e2="$t5{文字样式5}普通的文字";
        var f2="$t6{文字样式6}普通的文字";

        var a3="![](url)$m1{文字样式1}";
        var b3="![](url)$m2{文字样式2}";
        var c3="![](url)$m3{文字样式3}";
        var d3="![](url)$m4{文字样式4}";
        var e3="![](url)$m5{文字样式5}";
        var f3="![](url)$m6{文字样式6}";

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
                    mdtext
                    ? <div className="travel-dairy" dangerouslySetInnerHTML={{__html: marked(mdtext)}}></div>
                    : null
                }
                 <Button type="primary"className="days-list-toggle" onClick={this.onOpenChange}>目录</Button>
                {
                    days.length
                    ? <Drawer sidebar={sidebar} open={this.state.open} onOpenChange={this.onOpenChange}>
                        <div></div>
                    </Drawer>
                    : null
                }
                <div className="travel-dairy">
                    <div className="h2">
                        <h1>{a1}</h1>
                        <h2><span className="t1">段落样式1</span></h2>
                        <h1>{b1}</h1>
                        <h2><span className="t2">段落样式2</span></h2>
                        <h1>{c1}</h1>
                        <h2><span className="t3">段落样式3</span></h2>
                        <h1>{d1}</h1>
                        <h2><span className="t4">段落样式4</span></h2>
                        <h1>{e1}</h1>
                        <h2><span className="t5">段落样式5</span></h2>
                        <h1>{f1}</h1>
                        <h2><span className="t6">段落样式6</span></h2>
                        <h1>{g1}</h1>
                        <h2><span className="t7">段落样式7</span></h2>
                        <h1>{h1}</h1>
                        <h2><span className="t8">段落样式8</span></h2>
                    </div>
                    <div className="p">
                        <h1>{a2}</h1>
                        <p><span className="p1">文字样式1</span>普通的文字</p>
                        <h1>{b2}</h1>
                        <p><span className="p2">文字样式2</span>普通的文字</p>
                        <h1>{c2}</h1>
                        <p><span className="p3">文字样式3</span>普通的文字</p>
                        <h1>{d2}</h1>
                        <p><span className="p4">文字样式4</span>普通的文字</p>
                        <h1>{e2}</h1>
                        <p><span className="p5">文字样式5</span>普通的文字</p>
                        <h1>{f2}</h1>
                        <p><span className="p6">文字样式6</span>普通的文字</p>
                    </div>
                    <div className="img">
                        <h1>{a3}</h1>
                        <p><img src={img} /><span className="m1">图片样式1</span></p>
                        <h1>{b3}</h1>
                        <p><img src={img} /><span className="m2">图片样式2</span></p>
                        <h1>{c3}</h1>
                        <p><img src={img} /><span className="m3">图片样式3</span></p>
                        <h1>{d3}</h1>
                        <p><img src={img} /><span className="m4">图片样式4</span></p>
                        <h1>{e3}</h1>
                        <p><img src={img} /><span className="m5">图片样式5</span></p>
                    </div>
                </div>
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
                    <p>{`行程：${rowData.mdtext ? rowData.mdtext.substr(0, 10) : '行程呢？'}`}</p>
                    <p>{`亮点：${rowData.spots}`}</p>
                    <p>{`距离: ${rowData.distance}`}</p>
                    <p>{`住宿：${rowData.hotel}`}</p>
                    <p>{`含餐：${rowData.food}`}</p>
                </div>
            </div>
        );
    },
    'renderSeparator': function(sectionID, rowID) {
        return (
            <div key={`${sectionID}-${rowID}`} className="days-separator"/>
        );
    }
}

module.exports = App;
