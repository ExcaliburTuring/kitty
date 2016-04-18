/**
 * @author xiezhenzong
 */
import React from 'react';

import Input from 'input';

var Secure = React.createClass({
	render: function() {
		var accountInfo = this.props.basicInfo.accountInfo;
		var accountSetting = this.props.basicInfo.accountSetting;
		return (
			<div >
				<p>email</p>
				<p>{accountInfo.email}</p>
				<p>手机</p>
				<p>{accountInfo.mobile}</p>
            </div>
		);
	}
});

module.exports = Secure;