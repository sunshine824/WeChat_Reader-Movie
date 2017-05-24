var app=getApp();
var util=require("../../untils/untils.js")
Page({
  data:{
    inTheaters:{},
    comingSoon:{},
    top250:{},
    value:'',
    searchResult:{},
    containerShow:true,
    searchPanelShow:false
  },
  onLoad:function(event){
    //正在热映api
    var in_theaters = app.globalData.doubanBase+"/v2/movie/in_theaters"+"?start=0&count=3";
    //即将上映api
    var coming_soon = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
    //top250 api
    var top250 = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";

    //调用api
    this.getMovieListData(in_theaters,"inTheaters","正在热映")
    this.getMovieListData(coming_soon,"comingSoon","即将上映")
    this.getMovieListData(top250,"top250","豆瓣Top250")

  },
  onMoreTap:function(event){
    var category = event.currentTarget.dataset.category
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category,
    })
  },
  onMovieTap:function(event){
    var movieId = event.currentTarget.dataset.movieid
    wx.navigateTo({
      url: 'movies-detail/movies-detail?id=' + movieId,
    })
  },
  getMovieListData:function(url,settedKey,subjectTitle){
    var _this=this
    wx.request({
      url: url,
      data: {},
      header: {
        "Content-Type": "json"
      },
      method: 'GET',
      success: function (res) {
        //console.log(res)
        _this.processDoubanData(res.data, settedKey, subjectTitle)
      },
      fail: function () {
        console.log('failed')
      },
      complete: function () {

      }
    })
  },
  processDoubanData: function (moviesDouban, settedKey, subjectTitle){
    var movies=[];
    for (var index in moviesDouban.subjects){
      var subject = moviesDouban.subjects[index]
      var title=subject.title;
      if(title.length >= 6){
        title=title.substring(0,6)+"..."
      }
      var temp={
        title:title,
        average:subject.rating.average,
        coverageUrl:subject.images.large,
        movieId:subject.id,
        stars: util.convertToStarsArray(subject.rating.stars)
      }
      movies.push(temp)
    }
    var readyData={};
    readyData[settedKey]={
      subjectTitle:subjectTitle,
      movies:movies
    }
    this.setData(readyData)
  },

//点击input搜索框显示搜索页面
  onBindFocus:function(event){
    this.setData({
      containerShow:false,
      searchPanelShow:true
    })
  },

  //点击X关闭搜索页面
  onCancelImgTap:function(event){
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      value: '',
      searchResult:{}
    })
  },

  onBindBlur:function(event){

    this.setData({
      value:event.detail.value
    })

    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + this.data.value
    //调用url
    this.getMovieListData(searchUrl,"searchResult", "")
  }
})