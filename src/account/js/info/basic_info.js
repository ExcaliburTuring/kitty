/**
 * @author xiezhenzong
 */
import React from 'react';

import Input from 'input';

var BasicInfo = React.createClass({
	render: function() {
		var accountInfo = this.props.basicInfo.accountInfo;
		var accountSetting = this.props.basicInfo.accountSetting;
		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-3">
						<p>姓名:</p>
					</div>
					<div className="col-sm-9">
						<p>{accountInfo.name}</p>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-3">
						<p>昵称:</p>
					</div>
					<div className="col-sm-9">
						<p>{accountSetting.nickname}</p>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-3">
						<p>性别:</p>
					</div>
					<div className="col-sm-9">
						<p>{accountSetting.gender}</p>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-3">
						<p>身份证:</p>
					</div>
					<div className="col-sm-9">
						<p>{accountInfo.id}</p>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-3">
						<p>生日:</p>
					</div>
					<div className="col-sm-9">
						<p>{accountSetting.birthday}</p>
					</div>
				</div>
            </div>
		);
	}
});

module.exports = BasicInfo;