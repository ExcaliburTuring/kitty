![kitty](http://www.iconpng.com/download/png/100881)
# ButterFleog - kitty

------

###安装
npm install

###安装
npm start

##2016-1-3 更新日志：
####1、调整文件架构，更新package.json依赖，删除node_modules文件夹。				 
> * 依赖express-urlrewrite

- [x] 系统热启动直接进入src目录运行server.js。（热启动依然不支持打包图片）	

- [x] 系统冷启动还是打包到static文件夹中。

- [x] 每个页面在src中都有自己的文件夹和自己的index，可以实现动态跳转。

####2、使用fetch进行ajax，替代jquery，详见src/Register/js/app.js                 
> * 依赖[whatwg-fetch](https://github.com/github/fetch)

###3、使用reflux类库控制数据流
> * 依赖[reflux](https://github.com/reflux/refluxjs)

####4、使用react-router实现页面路由的功能。	
> * 依赖[react-router](https://github.com/rackt/react-router)
