/**
 * @author xiezhenzong
 */
import React from 'react';
import { Button, Icon } from 'antd-mobile';

import { gender }  from 'config';

 var Traveller = React.createClass({

    render: function () {
        var traveller = this.props.traveller;
        var isAccount = traveller.contactid == 0;
        var isMale = traveller.gender == gender.MALE;
        var readOnly = this.props.readOnly;
        return (
            <div className={`traveller-container clearfix ${readOnly ? 'readOnly' : ''}`}>
                <div className="traveller-info pull-left">
                    <div className="clearfix">
                        <p className="pull-left">姓名：{traveller.name}</p>
                        <p className="pull-right">{traveller.mobile}</p>
                    </div>
                    <div className="traveller-addition-info">
                        <p>证件：{traveller.id}</p>
                        {
                            /**
                             <p>邮箱：{traveller.email}</p>
                             */
                        }
                    </div>
                </div>
                {
                    readOnly
                    ? null
                    : <div className="traveller-edit-container pull-left">
                        <Button inline onClick={()=>{this.props.onTravellerEditBtnClick(traveller)}}>
                            <Icon type="edit"/>
                        </Button>
                         <Button inline onClick={()=>{this.props.onTravellerDeleteBtnClick(traveller)}}>
                            <Icon type="minus-circle-o" />
                        </Button>
                    </div>
                }
            </div>
        );
    }
});

module.exports = Traveller;
