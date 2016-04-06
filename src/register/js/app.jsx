/**
 * @author xiezhenzong 
 */
import React from 'react';

import CreateAccountScreen from './CreateAccountScreen.jsx';

var App = React.createClass({
	render() {
		
		return (
			<div >
                <CreateAccountScreen onSubmit={this.onSubmit}/>
            </div>
		);
	}
});

module.exports = App;
