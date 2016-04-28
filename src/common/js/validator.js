/**
 * @author xiezhenzong
 */
import _ from 'underscore';

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

function _success(msg) {
    return _state('success', msg);
}

function _warn(msg) {
    return _state('warning', msg);
}

function _error(msg) {
    return _state('error', msg);
}

const validator = {

    hasText: function(text, msg) {
        var msg = msg ? msg : '不能是空字符串';
        return _.isEmpty(text) ? _error(msg): _success();
    },

    email: function(email) {
        if (_.isEmpty(email)) {
            return _nothing();
        }
        if (_emailRe.test(email)) {
            return _success();
        } else {
            return _error('邮箱错误');
        }
    },

    password: function(password) {
        if (_.isEmpty(password)) {
            return _nothing();
        }
        if (!_passwordValidCharRe.test(password)) {
            return _error('密码由数字，字母，特殊字符组成')
        }

        if (!_checkLength(password)) {
            return _error('密码长度需要大于8位');
        }

        if (!_checkCapitals(password)) {
            return _warn('密码至少包含一位大写字母');
        }

        if (!_checkNumbers(password)) {
            return _warn('密码至少包含一位数字');
        }
        return _success();
    }

}

module.exports = validator;
