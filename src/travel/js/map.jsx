import React from 'react';
import Reflux from 'reflux';
import { Col } from 'react-bootstrap';

import Marker from '../img/location.svg';

var Map = React.createClass({

    componentDidMount: function(){
        var map = new BMap.Map(this.refs.allmap,{minZoom:1,maxZoom:15});    // 创建Map实例
        map.centerAndZoom(new BMap.Point(127.256949,44.572221), 8);  // 初始化地图,设置中心点坐标和地图级别
        map.setCurrentCity("吉林");          // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        var myStyleJson=[
            {
                      "featureType": "land",
                      "elementType": "geometry",
                      "stylers": {
                                "color": "#212121"
                      }
            },
            {
                      "featureType": "building",
                      "elementType": "geometry",
                      "stylers": {
                                "color": "#2b2b2b"
                      }
            },
            {
                      "featureType": "highway",
                      "elementType": "all",
                      "stylers": {
                                "lightness": -79,
                                "saturation": -91
                      }
            },
            {
                      "featureType": "arterial",
                      "elementType": "geometry",
                      "stylers": {
                                "lightness": -77,
                                "saturation": -94
                      }
            },
            {
                      "featureType": "green",
                      "elementType": "geometry",
                      "stylers": {
                                "color": "#1b1b1b"
                      }
            },
            {
                      "featureType": "water",
                      "elementType": "geometry",
                      "stylers": {
                                "color": "#181818"
                      }
            },
            {
                      "featureType": "subway",
                      "elementType": "geometry.stroke",
                      "stylers": {
                                "color": "#181818"
                      }
            },
            {
                      "featureType": "railway",
                      "elementType": "geometry",
                      "stylers": {
                                "lightness": -52
                      }
            },
            {
                      "featureType": "all",
                      "elementType": "labels.text.stroke",
                      "stylers": {
                                "color": "#313131"
                      }
            },
            {
                      "featureType": "all",
                      "elementType": "labels.text.fill",
                      "stylers": {
                                "color": "#8b8787"
                      }
            },
            {
                      "featureType": "manmade",
                      "elementType": "geometry",
                      "stylers": {
                                "color": "#1b1b1b"
                      }
            },
            {
                      "featureType": "local",
                      "elementType": "geometry",
                      "stylers": {
                                "lightness": -75,
                                "saturation": -91
                      }
            },
            {
                      "featureType": "subway",
                      "elementType": "geometry",
                      "stylers": {
                                "lightness": -65
                      }
            },
            {
                      "featureType": "railway",
                      "elementType": "all",
                      "stylers": {
                                "lightness": -40
                      }
            },
            {
                      "featureType": "boundary",
                      "elementType": "geometry",
                      "stylers": {
                                "color": "#8b8787",
                                "weight": "1",
                                "lightness": -29
                      }
            },
            {
                      "featureType": "label",
                      "elementType": "all",
                      "stylers": {}
            },
            {
                      "featureType": "highway",
                      "elementType": "labels",
                      "stylers": {
                                "visibility": "off"
                      }
            },
            {
                      "featureType": "railway",
                      "elementType": "all",
                      "stylers": {
                                "visibility": "off"
                      }
            }
        ]
        map.setMapStyle({styleJson: myStyleJson });   

        var points= [
            new BMap.Point(125.324421,43.832602),
            new BMap.Point(126.552623,43.848505),
            new BMap.Point(128.130396,42.437316),
            new BMap.Point(128.094283,42.112236),
            new BMap.Point(128.861425,44.535842),
            new BMap.Point(130.099956,45.195337),
            new BMap.Point(126.906666,45.676867),
            new BMap.Point(126.530919,45.81542),
        ]

        var label = [
            new BMap.Label("长春",{offset:new BMap.Size(3,-25)}),
            new BMap.Label("吉林",{offset:new BMap.Size(3,-25)}),
            new BMap.Label("二道白河",{offset:new BMap.Size(3,-25)}),
            new BMap.Label("长白山",{offset:new BMap.Size(3,-25)}),
            new BMap.Label("雪乡",{offset:new BMap.Size(3,-25)}),
            new BMap.Label("向阳",{offset:new BMap.Size(3,-25)}),
            new BMap.Label("伏尔加庄园",{offset:new BMap.Size(3,-25)}),
            new BMap.Label("哈尔滨",{offset:new BMap.Size(3,-25)})
        ]

        var opts = {    
            width : 30,     // 信息窗口宽度    
            height: 10,     // 信息窗口高度    
        }

        var infoWindow = [
            new BMap.InfoWindow("长春", opts),
            new BMap.InfoWindow("吉林", opts),
            new BMap.InfoWindow("二道白河", opts),
            new BMap.InfoWindow("长白山", opts),
            new BMap.InfoWindow("雪乡", opts),
            new BMap.InfoWindow("向阳", opts),
            new BMap.InfoWindow("伏尔加庄园", opts),
            new BMap.InfoWindow("哈尔滨", opts),
        ]

        function addMarker(point, index){  // 创建图标对象   
            var myIcon = new BMap.Icon(Marker, new BMap.Size(50, 50), {     
               offset: new BMap.Size(0, 0),
               imageOffset: new BMap.Size(0, -1)
            });
            var marker = new BMap.Marker(point, {icon: myIcon});    
            map.addOverlay(marker);   
            marker.addEventListener("click", function(){
                map.openInfoWindow(infoWindow[`${index}`], marker.getPosition());      // 打开信息窗口   
            }); 
            marker.setLabel(label[`${index}`]);
        }


        for (var i = 0; i < 8; i ++) {    
            addMarker(points[i], i);
        }

        var polyline = new BMap.Polyline(points,{strokeColor:"orange", strokeWeight:6, strokeOpacity:0.9});

        map.addOverlay(polyline);
    },

    render: function() {
        return (
            <div className="map-container">
                <div id="allmap" ref="allmap"></div>
            </div>
        );
    }
});


module.exports = Map;
