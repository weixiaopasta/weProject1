var url = "http://helios.m.58.com/wechat/authentication/";
var page = 0;
var GetList = function(that){
    that.setData({
        hidden:true
    });
    wx.request({
        url:url,
        data:{
            page : page,
        },
        success:function(res){
            var list = that.data.list;
            if(res.data.data.length==0){
                that.setData({
                    hidden:false
                }); 
                return false;
            }
            for(var i = 0; i < res.data.data.length; i++){
                list.push(res.data.data[i]);
            }
            that.setData({
                list : list
            });
            page ++;
        }
    });
}
Page({
   data:{
      hidden:true,
      list:[],
      scrollTop : 0,
      scrollHeight:0
  },
  onLoad:function(){
      var that = this;
      wx.getSystemInfo({
          success:function(res){
              console.info(res.windowHeight);
              that.setData({
                  scrollHeight:res.windowHeight
              });
          }
      });
  },
  onShow:function(){
    var that = this;
    GetList(that);
  },
  bindDownLoad:function(){
      var that = this;
      GetList(that);
  },
  scroll:function(event){
     this.setData({
         scrollTop : event.detail.scrollTop
     });
  },
  refresh:function(event){
      page = 0;
      this.setData({
          list : [],
          scrollTop : 0
      });
      GetList(this)
  }
});
