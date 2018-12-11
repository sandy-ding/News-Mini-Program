//index.js
//获取应用实例
const newsType = [
  { id: 0, type: "gn", title:"国内"},
  { id: 1, type: "gj", title:"国际"},
  { id: 2, type: "cj", title: "财经"},
  { id: 3, type: "yl", title: "娱乐"},
  { id: 4, type: "js", title: "军事"},
  { id: 5, type: "ty", title: "体育"},
  { id: 6, type: "other", title: "其他"},
]

Page({
  data: {
    newsType : newsType,
    currentId: 0,
    currentType:"gn",
    topImage:'',
    topTitle:"",
    topSource: "",
    topTime: ""
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.request({
      url: "https://test-miniprogram.com/api/news/list",
      data: {
        type: this.data.currentType
      },
      success: res => {
        let result = res.data.result
        console.log(result)
        this.setTopNews(result)
      },
      fail: () => {
        console.log("failed")
      }
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#36a6e9',
    })
    wx.setNavigationBarTitle({
      title:"快读·资讯"
    })
  },
  isSelected:function(e){
    this.setData({
      currentId: e.currentTarget.dataset.id
    });
  },
  setTopNews(result){
    let topNews = result[0]
    this.setData({
      topImage: topNews.firstImage,
      topTitle: topNews.title,
      topSource: topNews.source,
      topTime: topNews.date
    })
  }
})
