/**
 * @author xiezhenzong
 */
import _ from 'underscore';
import IDValidator from 'id-validator';

// regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
var _emailRe=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var _passwordValidCharRe = /^[a-zA-Z\d!@#$%^&*]+$/;
function _checkLength(value) {
    return value.length >= 8;
}

function _checkCapitals(value) {
    var str = value;
    return str.replace(/[^A-Z]/g, "").length;
}

function _checkNumbers(value) {
    return /\d/.test(value);
}

function _state(state, msg) {
    return {
        'state': state,
        'msg': msg ? msg : ''
    };
}

function _nothing() {
    return _state(null, '');
}

function _success() {
    return _state('success');
}

function _warn(msg) {
    return _state('warning', msg);
}

function _error(msg) {
    return _state('error', msg);
}

const validator = {

    hasText: function(text, msg) {
        return _.isEmpty(text) ? _error(msg): _success();
    },

    id: function(id, msg) {
        var ret = this.hasText(id);
        if (ret['state'] !== 'success') {
            return ret;
        }
        var validator = new IDValidator();
        var ret;
        if (validator.isValid(id)) {
            ret = _success();
            ret['info'] = validator.getInfo(id);
        } else {
            ret = _error('身份证信息有误');
        }
        return ret;
    },

    name: function(name, msg) {
        return _success();
    },

    email: function(email, msg) {

    },

    mobile: function(mobile, msg) {
        return _success();
    }

}

module.exports = validator;
