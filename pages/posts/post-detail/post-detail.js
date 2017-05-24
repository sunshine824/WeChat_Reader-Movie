var postsData=require("../../../data/posts-content.js")
var app = getApp(); //获取全局

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic:false
  },
  onLoad: function(option) {
    var globalData = app.globalData;

    var postId = option.id;
    // this.setData({
    //   currentPostId: postId
    // })
    //将postId传入data中方便之后的方法调用
    this.data.currentPostId = postId

    var postData = postsData.postLists[postId];
    //将数据传入data中
    this.setData(postData)

    //设置缓存
    // wx.setStorageSync('key', {
    //   game:'暴风',
    //   develper:'发展中'
    // })

    //获取缓存
    var postsCollected=wx.getStorageSync('posts_collect');
    if(postsCollected){
      var postsCollectId=postsCollected[postId]
      this.setData({
        collected: postsCollectId
      })
    }else{
      var postsCollected={};
      postsCollected[postId]=false;
      wx.setStorageSync('posts_collect',postsCollected)
    }

    if (globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId == postId){
      this.setData({
        isPlayingMusic:true
      })
    }
    this.setMusicMonitor()

  },

//操作总控开关
  setMusicMonitor:function(){
    var _this = this;
    //操作总音乐控制台
    wx.onBackgroundAudioPlay(function () {
      _this.setData({
        isPlayingMusic: true
      })

      //改变全局变量
      app.globalData.g_isPlayingMusic=true;
      app.globalData.g_currentMusicPostId = _this.data.currentPostId
    })

    wx.onBackgroundAudioPause(function () {
      _this.setData({
        isPlayingMusic: false
      })

      //改变全局变量
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    })

    //当音乐播放完恢复状态
    wx.onBackgroundAudioStop(function(){
      _this.setData({
        isPlayingMusic: false
      })

      //改变全局变量
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    })
  },

  //收藏功能
  onCollectionTip:function(event){

    var postsCollected = wx.getStorageSync('posts_collect')
    var postCollectId=postsCollected[this.data.currentPostId]

    //取反操作，收藏变成未收藏，未收藏变成收藏
    postCollectId=!postCollectId;
    postsCollected[this.data.currentPostId] = postCollectId;

    //更新文章缓存
    wx.setStorageSync('posts_collect', postsCollected);

    //更新数据绑定变量，从而实现图片切换
    this.setData({
      collected: postCollectId
    })

    //操作提示
    wx.showToast({
      title: postCollectId ? '收藏成功' : '取消成功',
      icon:'success',
      duration:1000
    })
  },

//分享功能
  onShareTap:function(event){
    //清除缓存
    //wx.removeStorageSync('key')
    //清除所有缓存
    //wx.clearStorageSync()
    var itemList=[
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor:'#405f80',
      success:function(res){
          //res.tapIndex 数组元素的序号，从0开始
        if (res.tapIndex!=undefined){
            wx.showModal({
              title: '用户' + itemList[res.tapIndex],
              content: '用户是否取消？现在无法实现分享功能',
            })
          }
      }
    })
  },

 //音乐播放
  onMusicTap:function(event){
    var isPlayingMusic=this.data.isPlayingMusic;
    var musicData = postsData.postLists[this.data.currentPostId];
    if(isPlayingMusic){
      //暂停
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic:false,
      })
    }else{
      //启动
      wx.playBackgroundAudio({
        dataUrl: musicData.music.url,
        title: musicData.music.title,
        coverImgUrl: musicData.music.coverImg
      })
      this.setData({
        isPlayingMusic:true,
      })
    }
  },
  //转发
  onShareAppMessage: function (event) {
    return {
      title: this.data.title,
      path: '/pages/posts/post-detail/post-detail?id=' + this.data.postId,
      success: function (res) {
        console.log(res)
        wx.getShareInfo()
      },
      fail: function () {
        console.log("分享失败")
      }
    }
  }
})