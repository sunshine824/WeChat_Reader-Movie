// pages/movies/more-movie/more-movie.js
var app = getApp();
var util = require("../../../untils/untils.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigateTitle:'',
    movies:{},
    requestUrl:'',
    totalCount:0,
    isEmpty:true,
  },

  onLoad: function (options) {
    var category = options.category;
    var dataUrl="";
    //存储变量
    this.data.navigateTitle=category;

    // wx.setNavigationBarTitle({
    //   title: navigateTitle
    // })
    switch(category){
      case "正在热映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
    this.data.requestUrl=dataUrl;
    util.http(dataUrl, this.processDoubanData)
  },

  //上拉加载
  onReachBottom:function(event){
    var nextUrl=this.data.requestUrl+"?start="+this.data.totalCount + "&count=20";
    util.http(nextUrl, this.processDoubanData)
    //启动loading
    wx.showNavigationBarLoading();
  },

  //下拉刷新
  onPullDownRefresh:function(event){
    var refreshUrl = this.data.requestUrl+"?start=0&count=20";
    this.data.movies={};
    this.data.isEmpty=true;
    this.data.totalCount=0;
    util.http(refreshUrl, this.processDoubanData)
    //启动loading
    wx.showNavigationBarLoading();
  },

  //callBack回调
  processDoubanData:function(data){
    var movies = [];
    for (var index in data.subjects) {
      var subject = data.subjects[index]
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "..."
      }
      var temp = {
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id,
        stars: util.convertToStarsArray(subject.rating.stars)
      }
      movies.push(temp)
    }

    //如果要绑定新加载的数据，那么需要同旧有的数据合并在一起
    var titalMovies={}
    if(!this.data.isEmpty){
      titalMovies=this.data.movies.concat(movies)
    }else{
      titalMovies=movies
      this.data.isEmpty=false;
    }

    this.setData({
      movies: titalMovies
    })
    this.data.totalCount += 20;
    //停止loading
    wx.hideNavigationBarLoading()
    //停止下拉刷新
    wx.stopPullDownRefresh();
  },

  onReady:function(event){
    //动态设定导航栏标题
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
  },

  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid
    wx.navigateTo({
      url: '../movies-detail/movies-detail?id=' + movieId,
    })
  },
})