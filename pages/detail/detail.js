// pages/detail/detail.js 
Page({
  data: {
    title: "",
    source: "",
    time: "",
    readCount: 0
  },
  onLoad(options) {
    this.setNavigationBar()
    let id = options.id
    this.getNews(id)
  },
  setNavigationBar() {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff',
    });
    wx.setNavigationBarTitle({
      title: "快读·资讯"
    })
  },
  getNews(id) {
    wx.request({
      url: "https://test-miniprogram.com/api/news/detail",
      data: {
        id: id
      },
      success: res => {
        let result = res.data.result
        console.log(result)
        this.render(result)
      },
      fail: () => {
        console.log("failed")
      }
    })
  },
  render(result) {
    let source = result.source
    let content = []
    if (source == "") {
      source = "未知来源"
    }
    for (let i = 0; i < result.content.length; i += 1) {
      content.push({
        type: result.content[i].type,
        text: result.content[i].text,
        src: result.content[i].src
      })
    }
    this.setData({
      title: result.title,
      source: source,
      time: result.date.substring(11, 16),
      readCount: result.readCount,
      content: content
    })
  }
})