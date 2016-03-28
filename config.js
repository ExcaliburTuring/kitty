/**
 * @author xiezhenzong
 */
var path = require('path');

var projectRoot = path.resolve(process.cwd());
const SRC_PATH = path.join(projectRoot, 'src/');
const LIB_PATH = path.join(projectRoot, 'lib/');
const ASSETS_PATH = path.join(projectRoot, 'static/public');
const PUBLIC_PATH = '/public/';
const TEST_PATH = path.join(projectRoot, 'test/');

var commonPath = path.join(SRC_PATH, 'common/');
var componentPath = path.join(SRC_PATH, 'component/');

const PATH_MAP = {
    // lib    
    'swiper': LIB_PATH + 'js/swiper/swiper.js',
    'swiper.less': LIB_PATH + 'css/swiper/swiper.less',

    // src/common
    'base.less': commonPath + 'base.less',
    'account_basic_info': commonPath + 'account_basic_info.js',
    'url_config': commonPath + 'url_config.js',

    // src/component
    'icon': componentPath + 'icon.jsx'

};

const ENTRY_EXCLUDE = [
    'common',
    'component'
];

module.exports = {
    SRC_PATH: SRC_PATH,
    LIB_PATH: LIB_PATH,
    ASSETS_PATH: ASSETS_PATH,
    PATH_MAP: PATH_MAP,
    ENTRY_EXCLUDE: ENTRY_EXCLUDE,
    PUBLIC_PATH: PUBLIC_PATH,
    TEST_PATH: TEST_PATH
};