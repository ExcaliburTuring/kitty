![kitty](http://www.iconpng.com/png/hello_kitty/kitty_2.png)
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

####3、使用reflux类库控制数据流
> * 依赖[reflux](https://github.com/reflux/refluxjs)

####4、使用react-router实现页面路由的功能。	
> * 依赖[react-router](https://github.com/rackt/react-router)


##2016-1-13 更新日志：
####1、删除static文件夹,并在gitignore中添加对static文件夹的忽略。

####2、添加FZYouHJW字体及对字体的引用。

####3、前端样式微调，并增加了对热启动加载图片的支持 get√。


##2016-1-21 更新日志：
####1、新建HomePage工程，删除旧的RegisterTest。

####2、前端样式微调，使用CommonsChunkPlugin插件打包公共代码。

####3、使用轮播插件swiper。
> * [swiper](http://www.idangero.us/swiper)


##2016-1-25 更新日志：
####1、新建Product产品介绍页工程。

####2、使用amaze-ui前端库。
> * [amaze-ui](http://amazeui.org/react/)

####3、使用marked插件。
> * [marked](https://github.com/chjj/marked)

####4、问题！
-- 产品展示我想用markdown来做，现在前端可以显示markdown格式的文本了，但是前后端这个文本不知道怎么传。
-- sticky那个玩意儿我自己用的时候在chrome上显示正常，ie和edge浏览器都不兼容，但是官方的demo就没事，这个我后面再看看。

##2016-3-3 更新日志
####1、创建lib目录
####2、使用gulp
