/**
 * @author xiezhenzong
 */
const TEST_PATH = require('./config').TEST_PATH;

function handler(path, res, config) {
    var pathItem = path.split('/');
    if (pathItem.length <= 2 || !isNaN(pathItem[2])) {
        res.sendFile(config.page, {root: TEST_PATH});
    } else {
        var mockFile = TEST_PATH + path.replace(/\//g, '_').substring(1) + '.js';
        res.json(require(mockFile));
    }
}

function config(url, page) {
    return {
        'url': url,
        're': new RegExp(url),
        'page': page
    };
}

var mockConfig = [
    config('/', 'index.html'),
    config('/test', 'test.html'),
    config('/index*', 'index.html'),
    config('/canvas*', 'canvas.html'),
    config('/routes*', 'routes.html'),
    config('/activities*', 'activities.html'),
    config('/travel*', 'travel.html'),
    config('/account*', 'account.html'),
    config('/order*', 'order.html'),
    config('/wap*', 'wap.html'),
    config('/wloading*', 'wloading.html'),
    config('/wproduct*', 'wproduct.html'),
    config('/wtravel*', 'wtravel.html'),
    config('/wactivities*', 'wactivities.html'),
    config('/wcoupon*', 'wcoupon.html'),
    config('/wcontact*', 'wcontact.html'),
    config('/worder*', 'worder.html'),
    config('/wxpayresult*', 'wxpayresult.html'),
    config('/wnewactivity*', 'wnewactivity.html'),
    config('/wpostcard*', 'wpostcard.html'),
    config('/wshare*', 'wshare.html'),
    config('/login', 'login.html'),
    config('/notauth', 'notauth.html'),
    config('/notfound', 'notfound.html'),
    config('/syserror', 'syserror.html'),
    config('/img/*'),
    config('/lib/*')
];

function mockHandler(req, res) {
    var path = req.path;
    for (var i = mockConfig.length - 1; i >= 0; i--) {
        var config = mockConfig[i];
        if (path.match(config.re)) {
            handler(path, res, config);
            return;
        }
    }
    res.json({status: 404, errMsg: "Can't find " + path});
};

module.exports = {
    mockConfig: mockConfig,
    mockHandler: mockHandler
}
