// 引入本地数据
var postsDate=require("../../data/posts-content.js")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    //小程序总是会读取data对象来做数据绑定，这个动作我们称为动作A
    //而这个动作A的执行，是在onLoad事件执行之后发生的
    urlImg:[
      '/images/post/cat.png',
      '/images/post/vr.png',
      '/images/post/bl.png',
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      posts_key: postsDate.postLists
    })
  },
  onPostTap:(event)=>{
    //target 和 currenTarget
    //target 指的点击的当前组件 而 currenTarget指的是事件捕获的组件

    var postId=event.currentTarget.dataset.postid;
    //页面跳转
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId,
    })

  }
})