/**
 * @author xiezhenzong
 */
import React from 'react';
import { Form, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import validator from 'validator';
import BaseFromItem from 'base_form_item';

import 'antd/lib/index.css';
import './area.less';

var Area = React.createClass({

    mixins: [BaseFromItem],

    _splitArea: function(area) {
        area = area || '';
        var areaArray = area.split(' ');
        return areaArray.length == 3 ? areaArray : ['', '', ''];
    },

    _validate: function(value) {
        return validator.hasText(value, '省市选择有误');
    },

    _createOptionList: function(data){
        if(!data || data.length == 0){
            return [];
        }

        return data.map(function(item, i) {
            return (<Option value={item} key={i}>{item}</Option>);
        });
    },

    onProviceChange: function(e) {
        if (this.props.readOnly) {
            return;
        }
        var provice = e;
        var city = getCities(provice)[0];
        var district = getDistricts(provice, city)[0];
        this._onChange({'target': {'value': `${provice} ${city} ${district}`}});
    },

    onCityChange: function(e) {
        if (this.props.readOnly) {
            return;
        }
        var city = e;
        var provice = this._splitArea(this.state.value)[0];
        var district = getDistricts(provice, city)[0];
        this._onChange({'target': {'value': `${provice} ${city} ${district}`}});
    },

    onDistrictChange: function(e) {
        if (this.props.readOnly) {
            return;
        }
        var district = e;
        var area = this._splitArea(this.state.value);
        var provice = area[0];
        var city = area[1];
        this._onChange({'target': {'value': `${provice} ${city} ${district}`}});
    },

    render: function() {
        var area = this._splitArea(this.state.value);
        var proviceOptions = this._createOptionList(provinces);
        var cityOptions = this._createOptionList(getCities(area[0]));
        var districtOptions = this._createOptionList(getDistricts(area[0], area[1]));

        return (
            <FormItem
                className="form-item-container"
                label="省市：" 
                required={this.props.required}
                validateStatus={this.state.validationState}
                help={this.state.msg}
                hasFeedback
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 17 }}>
                {
                    this.props.readOnly
                    ? <p>{this.state.value}</p>
                    : <div className="area-selector-container">
                        <Select onChange={this.onProviceChange} value={area[0]}
                            disabled={this.props.readOnly ? true : false}>
                            {proviceOptions}
                        </Select>
                        <Select onChange={this.onCityChange} value={area[1]}
                            disabled={this.props.readOnly ? true : false}>
                            {cityOptions}
                        </Select>
                        <Select onChange={this.onDistrictChange} value={area[2]}
                            disabled={this.props.readOnly ? true : false}>
                            {districtOptions}
                        </Select>
                    </div>
                }
            </FormItem>
        );
    }

});

module.exports = Area;
