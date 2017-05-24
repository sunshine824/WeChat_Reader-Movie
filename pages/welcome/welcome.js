Page({
  onTap:(event)=>{
    // wx.navigateTo({
    //   url: '../posts/post',
    // });   //平行跳转，由主页面跳到子页面

    // wx.redirectTo({
    //   url: '../posts/post',
    // })   //平级跳转

    wx.switchTab({
       url: '../posts/post', //拥有tabbar页面才可以跳转
    });
  }
})