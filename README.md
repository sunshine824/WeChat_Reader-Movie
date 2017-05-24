微信小程序Reader&Movie 
===================================  
   
运行项目
-----------------------------------  
 #### 下载微信web开发者工具，clone项目到本地，用微信web开发者打开项目，模拟器上（编译或CTRL+S）查看项目
      git clone https://github.com/sunshine824/WeChat_Reader-Movie.git
 #### 最后模拟器上效果如下：
  ![](https://github.com/sunshine824/WeChat_Reader-Movie/blob/master/static/jdfw.gif)
  
 项目结构
-----------------------------------

 注意事项
-----------------------------------
      1.如何设置纵向轮播:vertical="{{true}}"

      2.如何阻止事件冒泡:catch+事件

      3.wx.navigateTo 是平行跳转，由主页面跳到子页面 跳转后会触发 onHide
        wx.redirectTo 是平级跳转 跳转后会触发 onUnload 

      4.如果页面使用了tabBar组件，只能使用wx.switchTab实现跳转，wx.navigateTo、wx.redirectTo则不行

      5.为什么会出现“脚本错误或者未正确调用Page()”的错误提示？
       *出现这个错误的原因通常是因为对应页面的js文件里，没有调用Page方法。即使js文件里没有任何代码，也需要在js里添加一个空的 Page({})。注意Page的P要大写。

      6.为什么会出现“Expecting ‘String，‘Number，‘NULL，‘True....’”’’的错误提示？
       *出现这个错误的原因在于对应页面的json文件没有加入{ }。即使json文件里没有任何内容，也需要加入一个{ }，作为默认代码。json文件不允许出现注释代码，如果有注释的代码，同样会报这个错误。

      7.为什么 出现“ Failed to load image http://2110932784.debug.open.weixin.qq.com/pages/posts/images/post/crab.png : the server responded with a status of 404 (HTTP/1.1 404 Not Found) From server 127.0.0.1”
       *出现类似的这种错误，通常是由于图片的路径不对而引起的。外网的图片，我们这里不再说了，因为没有相对和绝对的路径概念，如果报错了就是你外网的图片url错了。我们说说本地的图片路径问题。请注意，如果图片路径被写在一个js文件A里，而B引用了这个js文件，那么图片的路径必须是相对于B的相对路径。所以，最好在公共的js文件里使用绝对路径。
       还有一点，提醒大家，小程序对资源文件，比如图片是有缓存的，这个大家要注意。

### 更多注意事项请查看[小程序注意事项](https://zhuanlan.zhihu.com/oldtimes)

### 后续会增加分享功能，扫一扫，点赞
