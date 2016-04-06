import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
var html = require('../../README.md');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});


module.exports = React.createClass({
	getInitialState: function(){
		return{
			body: ""
		}
	},
	componentWillMount: function(){
		this.setState({
			body: marked(html)
		});
	},
	render: function() {
		let items = [{id:1, body: this.state.body}, {id:2, body: this.state.body}];
		return(
				<div>
	                {
	                    items.map(function (item) {
	                        return <div className="day1" key={item.id} dangerouslySetInnerHTML={{__html: item.body}}/>
	                    })
	                }
	            </div>
		)
	}
})