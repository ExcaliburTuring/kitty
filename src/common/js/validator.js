/**
 * @author xiezhenzong
 */
import IDValidator from 'id-validator';

// regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
var _emailRe=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var _mobileRe=/^0?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/;
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

function isEmpty(test) {
    return !test || test.length == 0;
}

const validator = {

    hasText: function(text, msg) {
        return isEmpty(text) ? _error(msg): _success();
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
        return this.hasText(name, msg);
    },

    email: function(email, msg) {
        if (_emailRe.test(email)) {
            return _success();
        } else {
            return _error(msg);
        } 
    },

    mobile: function(mobile, msg) {
         if (_mobileRe.test(mobile)) {
            return _success();
        } else {
            return _error(msg);
        } 
    },

    birthday: function(birthday, msg) {
        if (Date.parse(birthday) < Date.now()) {
            return _success();
        } else {
            return _error(birthday);
        }
    }, 

    address: function(address, msg) {
        return this.hasText(address, msg);
    }

}

module.exports = validator;
