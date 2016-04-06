/**
 * @author xiezhenzong
 */
var path = require('path');
var fs = require('fs');

var projectRoot = path.resolve(process.cwd());
<<<<<<< HEAD
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
=======
const SRC_PATH = path.join(projectRoot, 'src/');
const LIB_PATH = path.join(projectRoot, 'lib/');
const ASSETS_PATH = path.join(projectRoot, 'static/public');
const PUBLIC_PATH = '/public/';
const TEST_PATH = path.join(projectRoot, 'test/');

var commonJsPath = path.join(SRC_PATH, 'common/js/');
var commonCssPath = path.join(SRC_PATH, 'common/css/');
var componentPath = path.join(SRC_PATH, 'component/');

const PATH_MAP = (function () {
    // lib
    var pathMap = {
        'swiper': LIB_PATH + 'js/swiper/swiper.js',
        'swiper.less': LIB_PATH + 'css/swiper/swiper.less'
    };

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

    // src/common/js
    readFile(commonJsPath, addJsToPathMap);
    // src/common/css
    readFile(commonCssPath, function(file, filePath) {
        pathMap[file] = filePath;
    });
    // src/component
    readFile(componentPath, addJsToPathMap);

    console.log('pathMap: ');
    console.log(pathMap);
    console.log();
    return pathMap;
}());

const ENTRY_EXCLUDE = [
    '.DS_Store',
    'font',
>>>>>>> refs/remotes/buterfleoge/master
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