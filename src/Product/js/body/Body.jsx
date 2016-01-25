import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';

module.exports = React.createClass({
	getInitialState: function(){
		return{
			body: ""
		}
	},
	componentWillMount: function(){
		this.setState({
			body: marked('这里是用的markdown解析器，你帮我看一下，怎么从后台取过来markdown格式的内容并加载到这个页面上！------')
		});
	},
	render: function() {
			return(
				<div className="body">
					<div className="maininfo">
						<div dangerouslySetInnerHTML={{__html: this.state.body}}/>
					</div>
				</div>
			)
	}
})