/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';

import AccountBasicInfo from 'account_basic_info';

var App = React.createClass({
	mixins: [Reflux.connect(AccountBasicInfo.store, 'basicInfo')],
	render() {
		return (
			<div >
                {this.state.basicInfo}
            </div>
		);
	}
});

module.exports = App;
