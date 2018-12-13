//index.js
//获取应用实例
const newsType = [
  { type: "gn", title:"国内"},
  { type: "gj", title:"国际"},
  { type: "cj", title: "财经"},
  { type: "yl", title: "娱乐"},
  { type: "js", title: "军事"},
  { type: "ty", title: "体育"},
  { type: "other", title: "其他"},
]

Page({
  data: {
    newsType:newsType,
    currentType:"gn",
    topId:0,
    topImage:'',
    topTitle:"",
    topSource: "",
    topTime: ""
  },
  onPullDownRefresh() {
    this.getNews(() => {
      wx.stopPullDownRefresh()
    })
  },
  onLoad: function () {
    this.setNavigationBar()
    this.getNews(() => {
      wx.stopPullDownRefresh()
    })
  },
  setNavigationBar(){
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#36a6e9',
    });
    wx.setNavigationBarTitle({
      title: "快读·资讯"
    })
  },
  isSelected:function(e){
    this.setData({
      currentType: e.currentTarget.dataset.id
    })
    this.getNews(() => {
      wx.stopPullDownRefresh()
    })
  },
  getNews(callback) {
    wx.request({
      url: "https://test-miniprogram.com/api/news/list",
      data: {
        type: this.data.currentType
      },
      success: res => {
        let result = res.data.result
        console.log(result)
        this.setTopNews(result)
        this.setNewsList(result)
      },
      complete: () => {
        callback && callback()
      },
      fail: () => {
        wx.showToast({
          title: '获取失败',
          duration: 2000
        })
      }
    })
  },
  setTopNews(result){
    let topNews = result[0]
    if (topNews.firstImage == "") {
      topNews.firstImage = "/images/default.jpg";
    }
    this.setData({
      topId:topNews.id,
      topImage: topNews.firstImage,
      topTitle: topNews.title,
      topSource: topNews.source,
      topTime: topNews.date.substring(11,16)
    })
  },
  setNewsList(result){
    let newsList = []
    for (let i = 0; i < result.length; i += 1){
      newsList.push({
        title: result[i].title,
        source:result[i].source,
        time: result[i].date.substring(11,16),
        image: result[i].firstImage,
        id:result[i].id
      })
    }
    for (let i = 0; i < newsList.length; i += 1) {
      if (newsList[i].source == ""){
        newsList[i].source = "未知来源";
      }
      if (newsList[i].image == "") {
        newsList[i].image = "/images/default.jpg";
      }
    }
    this.setData({
      newsList: newsList
    })
  },
  onTapDetail:function(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    })
  }
})
