/**
 * @author xiezhenzong
 */
var path = require('path');
var fs = require('fs');

var projectRoot = path.resolve(process.cwd());
const SRC_PATH = path.join(projectRoot, 'src/');
const LIB_PATH = path.join(projectRoot, 'lib/');
const ASSET_PATH = path.join(projectRoot, 'asset/');
const STATIC_PATH = path.join(projectRoot, 'static/public');
const PUBLIC_PATH = '/public/';
const TEST_PATH = path.join(projectRoot, 'test/');

var commonJsPath = path.join(SRC_PATH, 'common/js/');
var commonCssPath = path.join(SRC_PATH, 'common/css/');
var commonImgPath = path.join(SRC_PATH, 'common/img/');
var componentPath = path.join(SRC_PATH, 'component/');

const PATH_MAP = (function () {
    // lib
    // var pathMap = {
    //     'antd': LIB_PATH + 'js/antd/antd.min.js',
    //     'marked': LIB_PATH + 'js/marked/marked.min.js',
    //     'swiper': LIB_PATH + 'js/swiper/swiper.js',
    //     'swiper.less': LIB_PATH + 'css/swiper/swiper.less'
    // };

    var pathMap = {};
    function readFile(dir, callback) {
        fs.readdirSync(dir)
        .forEach(function(file) {
            var filePath = path.join(dir, file);
            if (fs.statSync(filePath).isDirectory()) {
                readFile(filePath, callback);
            } else {
                callback(file, filePath);   
            }
        });
    };

    function addJsToPathMap(file, filePath) {
        if (file.indexOf('.jsx', file - 4) !== -1) {
            pathMap[file.substring(0, file.length - 4)] = filePath;
        } else if (file.indexOf('.js', file - 3) !== -1) {
            pathMap[file.substring(0, file.length - 3)] = filePath;
        }
    }

    function addToPath(file, filePath) {
        pathMap[file] = filePath;
    }

    // src/common/js
    readFile(commonJsPath, addJsToPathMap);
    // src/common/css
    readFile(commonCssPath, addToPath);
    // src/common/img
    readFile(commonImgPath, addToPath);
    // src/component
    readFile(componentPath, addJsToPathMap);

    delete pathMap['.DS_Store']

    console.log('pathMap: ');
    console.log(pathMap);
    console.log();
    return pathMap;
}());

const ENTRY_EXCLUDE = [
    '.DS_Store',
    'font',
    'common',
    'component'
];

module.exports = {
    SRC_PATH: SRC_PATH,
    LIB_PATH: LIB_PATH,
    ASSET_PATH: ASSET_PATH,
    STATIC_PATH: STATIC_PATH,
    PATH_MAP: PATH_MAP,
    ENTRY_EXCLUDE: ENTRY_EXCLUDE,
    PUBLIC_PATH: PUBLIC_PATH,
    TEST_PATH: TEST_PATH
};