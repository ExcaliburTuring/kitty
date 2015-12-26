// entry.jsx
var React = require('react');
window.React = require('react');
var Hello = require('./js/Hello');
var TodoComponent = require('./js/register');
//var Reacter = require('./js/Reacter');
React.render(
  <Hello items={['Apple', 'Banana', 'Cranberry']} />, document.getElementById('hello')
);
import Slider from './js/slider';

var slides = [{
    background: "C:/Users/Public/webwork/Kitty/src/imgs/1.jpg",
    link: ""
  }, {
    background: "C:/Users/Public/webwork/Kitty/src/imgs/2.jpg",
    link: ""
  }, {
    background: "C:/Users/Public/webwork/Kitty/src/imgs/3.jpg",
    link:""
  }];

React.render(<Slider slides= {slides} time="5000"/>,document.getElementById("slider"));
React.render(<TodoComponent />, document.getElementById('container'));
//React.render(<Reacter />, document.getElementById('reacter'));