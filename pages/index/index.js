//index.js
//获取应用实例
import {getMultiData,getProduct} from '../../service/home.js'
import {
  POP,
  SELL,
  NEW,
  BACK_TOP_POSITION
} from '../../common/const.js'
Page({
  data: {
    banners: [],
    recommends:[],
    titles: ["流行", "新款", "精选"],
    goods: {
      [POP]: { page: 1, list: [] },
      [NEW]: { page: 1, list: [] },
      [SELL]: { page:1, list: [] },
    },
    currentType: 'pop',
    topPosition: 0,
    tabControlTop: 0,
    showBackTop: false,
    showTabControl: false
  },
  //事件处理函数
  onLoad: function (options) {
    this._getData()
  },
 //-------------------------事件监听函数----------------------------------
 tabClick(e){
  // 1.根据当前的点击赋值最新的currentType
  let currentType = ''
  switch(e.detail.index) {
    case 0:
      currentType = POP
      break
    case 1:
      currentType = NEW
      break
    case 2:
      currentType = SELL
      break
  }
  this.setData({
    currentType: currentType
  })
  console.log(this.selectComponent('.tab-control'));
  this.selectComponent('.tab-control').setCurrentIndex(e.detail.index)
  this.selectComponent('.tab-control-temp').setCurrentIndex(e.detail.index)
},

  scrollPosition(e) {
    // 1.获取滚动的顶部
    const position = e.detail.scrollTop;
    // 2.设置是否显示
    this.setData({
      showBackTop: position > BACK_TOP_POSITION,
    })
    wx.createSelectorQuery().select('.tab-control').boundingClientRect((rect) => {
      const show = rect.top > 0
    
      this.setData({
        showTabControl: !show
      })
    }).exec()
  },
  onImageLoad() {
    wx.createSelectorQuery().select('.tab-control').boundingClientRect((rect) => {
      this.setData({
        tabControlTop: rect.top
      })
    }).exec()
  },
  onPageScroll(res) {
  },
  onBackTop() {
    this.setData({
      showBackTop: false,
      topPosition: 0,
      tabControlTop: 0
    })
  },
  loadMore() {
    this._getProductData(this.data.currentType);
  },
  //----------------------网络请求函数----------------------------------
  // 网络请求相关方法
  _getData() {
    this._getMultidata(); // 获取上面的数据
    this._getProductData(POP);
    this._getProductData(NEW);
    this._getProductData(SELL);
  },
  _getMultidata(){    
    //1.请求轮播图以及推荐数据
  getMultiData().then(res =>{
    //取出轮播图和推荐的数据
    const banners = res.data.data.banner.list;
    const recommends = res.data.data.recommend.list;

   //将banners和recommends放到data中
   this.setData({
     banners,
     recommends
   })
  })
  },
  _getProductData(type) {
    // 1.获取数据对应的页码
    const page = this.data.goods[type].page;
    // 2.请求数据
    getProduct(type, page).then(res => {
      // 1.取出数据
      const list = res.data.data.list;
      // 2.将数据临时获取
      const goods = this.data.goods;
      goods[type].list.push(...list)
      goods[type].page += 1;

      // 3.最新的goods设置到goods中
      this.setData({
        goods: goods
      })
    })
  },
 
  
  
})
