import React from 'react';
import Reflux from 'reflux';
import { Col } from 'react-bootstrap';

import Marker from '../img/location.svg';

var Map = React.createClass({

    componentDidMount: function(){
        var map = new BMap.Map(this.refs.allmap, {minZoom: 1, maxZoom: 15});
        map.centerAndZoom(createPoint(this.props.center), this.props.zoom);
        map.setCurrentCity('吉林');
        map.addControl(new BMap.NavigationControl());
        map.addControl(new BMap.ScaleControl());
        //map.enableScrollWheelZoom();
        map.setMapStyle({styleJson: myStyleJson });

        var points= this.props.points.map(function(point, index) {
        	return createPoint(point);
        });
        var label = this.props.cities.map(function(city, index) {
        	return createLabel(city);
        });
        var infoWindow = this.props.cities.map(function(info, index) {
        	return createInfoWindo(info);
        });
        for (var i = 0; i < 8; i ++) {
            addMarker(points[i], label[i], infoWindow[i]);
        }
        var driving = new BMap.DrivingRoute(map, {renderOptions: {map: map, autoViewport: true}});
        driving.search(points[0], points[points.length - 1], {waypoints: points.slice(1, points.length -1)});
    },

    render: function() {
        return (
            <div className="map-container">
                <div id="allmap" ref="allmap"></div>
            </div>
        );
    }
});

function createPoint(point) {
	return new BMap.Point(point.longitude, point.latitude);
}

function createLabel(label) {
	return new BMap.Label(label, labelOpt);
}

function createInfoWindo(info) {
	return new BMap.InfoWindow(info, infoWindowOpt);
}

function addMarker(point, label, infoWindow){
    var myIcon = new BMap.Icon(Marker, new BMap.Size(50, 50), {
        offset: new BMap.Size(0, 0),
        imageOffset: new BMap.Size(0, -1)
    });
    var marker = new BMap.Marker(point, {icon: myIcon});
    map.addOverlay(marker);
    marker.setLabel(label);
    marker.addEventListener('click', function(){
        map.openInfoWindow(infoWindow, marker.getPosition());
    });
}

var labelOpt = {
	'offset': new BMap.Size(3,-25)
};

var infoWindowOpt = {
    'width': 30,     // 信息窗口宽度
    'height': 10,     // 信息窗口高度
};

var myStyleJson=[
    {
        'featureType': 'land',
        'elementType': 'geometry',
        'stylers': {
            'color': '#212121'
        }
    },
    {
        'featureType': 'building',
        'elementType': 'geometry',
        'stylers': {
            'color': '#2b2b2b'
        }
    },
    {
        'featureType': 'highway',
        'elementType': 'all',
        'stylers': {
            'lightness': -79,
            'saturation': -91
        }
    },
    {
        'featureType': 'arterial',
        'elementType': 'geometry',
        'stylers': {
            'lightness': -77,
            'saturation': -94
        }
    },
    {
        'featureType': 'green',
        'elementType': 'geometry',
        'stylers': {
            'color': '#1b1b1b'
        }
    },
    {
        'featureType': 'water',
        'elementType': 'geometry',
        'stylers': {
            'color': '#181818'
        }
    },
    {
        'featureType': 'subway',
        'elementType': 'geometry.stroke',
        'stylers': {
            'color': '#181818'
        }
    },
    {
        'featureType': 'railway',
        'elementType': 'geometry',
        'stylers': {
            'lightness': -52
        }
    },
    {
        'featureType': 'all',
        'elementType': 'labels.text.stroke',
        'stylers': {
            'color': '#313131'
        }
    },
    {
        'featureType': 'all',
        'elementType': 'labels.text.fill',
        'stylers': {
            'color': '#8b8787'
        }
    },
    {
        'featureType': 'manmade',
        'elementType': 'geometry',
        'stylers': {
            'color': '#1b1b1b'
        }
    },
    {
        'featureType': 'local',
        'elementType': 'geometry',
        'stylers': {
            'lightness': -75,
            'saturation': -91
        }
    },
    {
        'featureType': 'subway',
        'elementType': 'geometry',
        'stylers': {
            'lightness': -65
        }
    },
    {
        'featureType': 'railway',
        'elementType': 'all',
        'stylers': {
            'lightness': -40
        }
    },
    {
        'featureType': 'boundary',
        'elementType': 'geometry',
        'stylers': {
            'color': '#8b8787',
            'weight': '1',
            'lightness': -29
        }
    },
    {
        'featureType': 'label',
        'elementType': 'all',
        'stylers': {}
    },
    {
        'featureType': 'highway',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    },
    {
        'featureType': 'railway',
        'elementType': 'all',
        'stylers': {
            'visibility': 'off'
        }
    }
];

module.exports = Map;
