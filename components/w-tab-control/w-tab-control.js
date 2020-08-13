// components/w-tab-control/w-tab-control.js
Component({
  properties: {
    titles:{
      type:Array,
      value:[]
    }
  },
  data: {
    currentIndex: 0
  },
  methods: {
    onItemClick(event){
      //1.获取传入的index
      const index = event.currentTarget.dataset.index;
      //2.改变记录的currentIndex
      this.setData({
        currentIndex:index
      })
      //3.发出自定义事件
      this.triggerEvent('titleclick',{index},{})
    }
  }
})
