# butterfloege kitty

安装
npm install
启动
npm start

2016-1-3 更新日志：
1、调整文件架构，更新package.json依赖，删除node_modules文件夹。				 --依赖express-urlrewrite
	--系统热启动直接进入src目录运行server.js。（热启动依然不支持打包图片）	
	--系统冷启动还是打包到static文件夹中。
	--每个页面在src中都有自己的文件夹和自己的index，可以实现动态跳转。
2、使用fetch进行ajax，替代jquery，详见src/Register/js/app.js                 --依赖whatwg-fetch
3、使用react-router实现页面路由的功能。	（还在构思阶段）                     --依赖react-router