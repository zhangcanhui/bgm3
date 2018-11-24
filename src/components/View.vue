<template>
  <div class="layout">
    <Row><h1><font color="blue">桂花社区导航信息管理系统</font></h1></Row>
    <div id="location">{{$store.state.location}}</div>
    <Row type="flex">
      <i-col span="5" class="layout-menu-left">
        <Menu active-key="1-2" theme="dark" width="auto" :open-keys="['1']">
          <div class="layout-logo-left"></div>
          <Submenu key="1">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>
              系统功能
            </template>
            <Menu-item key="1-1"><router-link to="/Querygrid">人员信息查询</router-link></Menu-item>
            <Menu-item key="1-2"><router-link to="/QueryBuildInfo">楼栋信息查询</router-link></Menu-item>
            <Menu-item key="1-3">门面信息查询</Menu-item>
            <Menu-item key="1-4">单位信息查询</Menu-item>
          </Submenu>
          <Submenu key="2">
            <template slot="title">
              <Icon type="ios-keypad"></Icon>
              修改密码
            </template>
            <Menu-item key="1-1"><router-link to="/Editpassword">修改密码</router-link></Menu-item>
          </Submenu>
          <Submenu key="3">
            <template slot="title">
              <Icon type="ios-analytics"></Icon>
              打印社区导航图
            </template>
          </Submenu>
          <Submenu key="4">
            <template slot="title">
              <Icon type="ios-exit"></Icon>
              系统退出
            </template>
          </Submenu>
        </Menu>
      </i-col>
      <i-col span="19">
        <!--<div class="layout-header"></div>-->
        <!--<div class="layout-breadcrumb">-->
          <!--<Breadcrumb>-->
            <!--<Breadcrumb-item href="#">首页</Breadcrumb-item>-->
            <!--<Breadcrumb-item href="#">应用中心</Breadcrumb-item>-->
            <!--<Breadcrumb-item>某应用</Breadcrumb-item>-->
          <!--</Breadcrumb>-->
        <!--</div>-->
        <!--<div class="layout-content">-->
          <!--<div class="layout-content-main">内容区域</div>-->
          <!--<b-map-component></b-map-component>-->
        <!--</div>-->
        <!--<div class="layout-copy">-->
          <!--2011-2016 &copy; TalkingData-->
        <!--</div>-->
        <div id="allmap"
             style="
                width: 100%;
                height:1000px;
                border: 1px solid gray;
                overflow:hidden;">
        </div>
      </i-col>

    </Row>

  </div>

</template>
<script>
  import BMap from 'BMap'
  export default {
    name:"View",
    data () {
      return vue={
        modalBuildInfo:false,
        age:20,
        location:'',
        longandlati:''
      }
    },
    computed:{
      location:function () {
        return this.$store.state.location;
      },
      longandlati:function () {
        return this.$store.state.longandlati;
      }
    },
    // components: {
    //   comHeader
    // },
    // data: () => ({
    //   headerData: {
    //     title: '网点详情',
    //     toLink: '/SalesOutlets'
    //   }
    // }),
//    created () {
//      // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
//      this.loadMap()
//      // this.ready() // 如果在此处直接调用this.ready()方法，将无法加载地图
//    },
    mounted () {
      this.ready()
    },
    methods: {
      // loadMap: function () {
      //   console.log(this.$route.params.name)
      //   console.log(this.$route.params.addr)
      //   console.log(this.$route.params.phone)
      //   // setTimeout(this.ready, 0)
      // },
//      showBuildInfoModal:function () {
//        this.modalBuildInfo=true;
//
//      },
      ready: function () {
        //创建地图实例
        var map = new BMap.Map("allmap");
        //有经纬度根据经纬度定位，没经纬度就根据地址名称定位
//        this.longandlati = ''; // longandlati没有setter，这样写不会生效
        if(this.longandlati != null && this.longandlati != ''){
          var list = this.longandlati.split(",")
          map.centerAndZoom(new BMap.Point(list[0],list[1]),20);
        }else {
          map.centerAndZoom(this.location,20);
        }

        // 添加带有定位的导航控件
        var navigationControl = new BMap.NavigationControl({
          // 靠左上角位置
          anchor: BMAP_ANCHOR_TOP_LEFT,
          // LARGE类型
          type: BMAP_NAVIGATION_CONTROL_LARGE,
          // 启用显示定位
          enableGeolocation: true
        });
        map.addControl(navigationControl);

        map.enableScrollWheelZoom(true);
        var geoc = new BMap.Geocoder()
        // var mappoi = new MapPoi()
        var pots={
          width:500,
          height:400,
          title:"楼栋信息录入"
        }
        var html="<div class=\"modal\">\n" +
          "      <Modal class=\"buildInfo-modal\" title=\"楼栋信息\" v-model=\"modalBuildInfo\" on-text=\"确定\" cancel-text=\"返回\" width=\"50%\">\n" +
          "        <h3>请输入楼栋信息</h3>\n" +
          "        <br/>\n" +
          "        <form action=\"/upfileapi/file_uploadOne\" method=\"post\" enctype=\"multipart/form-data\">\n" +
          "          <label>请输入楼栋名称</label><input type=\"text\" name=\"image\" size=\"50\"/><br/>\n" +
          "          <label>请输入层数</label><input type=\"text\" name=\"image\" size=\"50\"/><br/>\n" +
          "          <label>请输入每层房间数<input type=\"text\"/></label>\n" +
          "          <input type=\"submit\" value=\"提交\"/>\n" +
          "        </form>\n" +
          "\n" +
          "      </Modal>\n" +
          "    </div>"
        var infoWindow=new BMap.InfoWindow(html,pots);

        map.addEventListener("click", function(e){
          var pt = e.point;
          var message = pt.lng+","+pt.lat+",";
          geoc.getLocation(pt, function(rs){
            var addComp = rs.addressComponents;

            message = message+ addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
            alert(message)
          });
          alert("ok")
          map.openInfoWindow(infoWindow,map.getCenter());

        });
        // console.log(map)
        //
        // var localSearch = new BMap.LocalSearch(map)
        // // localSearch.enableAutoViewport() // 允许自动调节窗体大小
        // map.clearOverlays() // 清空原来的标注
        // localSearch.setSearchCompleteCallback(function (searchResult) {
        //   var poi = searchResult.getPoi(0)
        //   map.centerAndZoom(poi.point, 20)
        //   var point = new BMap.Point(poi.point.lng, poi.point.lat)
        //   var marker = new BMap.Marker(point) // 创建标注，为要查询的地方对应的经纬度
        //   map.addOverlay(marker)
        // })
        // localSearch.search(this.$route.params.addr)
      }
    }
  }
</script>
<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
  }
  .layout-breadcrumb{
    padding: 10px 15px 0;
  }
  .layout-content{
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
  .layout-content-main{
    padding: 10px;
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
  .layout-menu-left{
    background: #464c5b;
  }
  .layout-header{
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
  .anchorBL {
    display:none
  }
  .buildInfo-modal {
    display: flex;
    align-items: center;
    justify-content: center;

  .ivu-modal {
    top: 100px;
  }

  }

</style>
