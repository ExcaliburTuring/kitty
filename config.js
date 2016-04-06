/**
 * @author xiezhenzong
 */
var path = require('path');

var projectRoot = path.resolve(process.cwd());
var SRC_PATH = path.join(projectRoot, 'src/');
var LIB_PATH = path.join(projectRoot, 'lib/');
var ASSETS_PATH = path.join(projectRoot, 'static/public');
var PUBLIC_PATH = '/public/';
var TEST_PATH = path.join(projectRoot, 'test/');

var PATH_MAP = {
    'swiper.js': LIB_PATH + 'js/swiper/swiper.js',
    'swiper.less': LIB_PATH + 'css/swiper/swiper.less',
    'font-awesome.less': LIB_PATH + 'css/font-awesome/less/font-awesome.less'
};

var NOT_ENTRY_DIR = [
    'common',
    'util'
];

module.exports =  {
    SRC_PATH: SRC_PATH,
    LIB_PATH: LIB_PATH,
    ASSETS_PATH: ASSETS_PATH,
    PATH_MAP: PATH_MAP,
    NOT_ENTRY_DIR: NOT_ENTRY_DIR,
    PUBLIC_PATH: PUBLIC_PATH,
    TEST_PATH: TEST_PATH
};