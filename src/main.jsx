// entry.jsx
var React = require('react');
var Hello = require('./js/Hello');
var TodoComponent = require('./js/register');
React.render(<Hello />, document.getElementById('hello'));
React.render(<TodoComponent />, document.getElementById('container'));