// pages/movies/movies-detail/movies-detail.js
import {Movie} from "class/Movie.js"
var app = getApp();
Page({
  data: {
    movie:{}
  }, 
  //es6 基础知识点 module,class,promise,=>
  onLoad: function (options) {
    var movieId=options.id;
    var url = app.globalData.doubanBase +"/v2/movie/subject/"+movieId;
    //util.http(url, this.processDoubanData);

    var movie=new Movie(url)  //new一个Movie实例
    // var _this = this;
    // movie.getMovieData(function(movie){
    //   _this.setData({
    //     movie: movie
    //   })
    // })
    movie.getMovieData((movie) => {
      this.setData({
        movie: movie
      })
    })
  },

  //大图阅览
  viewMoviePostImg:function(event){
    var src = event.currentTarget.dataset.src;
    wx.previewImage({
      urls: [src],
      currrent:src
    })
  }

})