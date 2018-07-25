
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    singer:'',
    picURL:'',
    id:'',
    otherLangLyric:'',
    chLyric:'',
    audioURL:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;

    wx.showToast({
      title: 'Loading...',
      icon: "loading",
      duration: 1000
    });
    console.log('selected song name:' + options.name); 
    console.log('selected song singer:' + options.singer);
    console.log('selected song picURL:' + options.picURL);
    console.log('selected song ID:' + options.id);
    this.setData({
      name: options.name,
      singer: options.singer,
      picURL: options.picURL,
      id: options.id
    });

    // requesting lyric
    wx.request({
      url: 'https://mkblog.cn/blog/musicapi',
      data: {
        key: 'test',
        types: 'lyric',
        source: 'tencent',
        id: this.data.id
      },
      success: function (res) {
        wx.hideLoading();
        // console.log('lyric:');
        // console.log(res);
        if(res.tlyric === ''){
          that.setData({
            chLyric: res.data.lyric
          });
          console.log(that.data.chLyric);
        }else{
          that.setData({
            otherLangLyric: res.data.lyric,
            chLyric: res.data.tlyric
          });
          console.log(that.data.otherLangLyric);
          console.log(that.data.chLyric);
        }
      }
    });

    // requesting audio url
    wx.request({
      url: 'https://mkblog.cn/blog/musicapi',
      data: {
        key: 'test',
        types: 'url',
        source: 'tencent',
        id: this.data.id
      },
      success: function (res) {
        wx.hideLoading();
        // console.log('audioURL:');
        // console.log(res);
        that.setData({
          audioURL: res.data.url
        });
        console.log('audio URL:' + that.data.audioURL);
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})