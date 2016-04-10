/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Button } from 'react-bootstrap';

import Input from 'input';
import AccountBasicInfo from 'account_basic_info';

var Info = React.createClass({

	mixins: [Reflux.connect(AccountBasicInfo.store, 'basicInfo')],

	editHandler: function() {

	},

	submitHandler: function() {

	},

	getInitialState: function() {
        return {
           'isEdit': false,
           'canEdit': false,
           'basicInfo': null,
        }
    },

	render: function() {
		return (
			<div >
				<div>
					<Button onClick={this.editHandler}>修改</Button>
					<Button onClick={this.submitHandler}>确定</Button>
				</div>
				<div>
					<div className="row">
						<div className="col-sm-6">
							<p>姓名</p>
							<Input></Input>
						</div>
						<div className="col-sm-6">
							<p>昵称</p>
							<Input></Input>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-12">
							<p>身份证</p>
							<Input></Input>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-6">
							<p>email</p>
							<Input></Input>
						</div>
						<div className="col-sm-6">
							<p>手机</p>
							<Input></Input>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-6">
							<p>生日</p>
							<Input></Input>
						</div>
						<div className="col-sm-6">
							<p>性别</p>
							<Input></Input>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-12">
							<p>绑定</p>
							<Input></Input>
						</div>
					</div>
				</div>
            </div>
		);
	}
});

module.exports = Info;
