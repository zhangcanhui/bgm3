<template>
  <div class="layout">
    <Row><h1><font color="blue">桂花社区导航信息管理系统</font></h1></Row>
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
    // components: {
    //   comHeader
    // },
    // data: () => ({
    //   headerData: {
    //     title: '网点详情',
    //     toLink: '/SalesOutlets'
    //   }
    // }),
    created () {
      // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
      this.loadMap()
      // this.ready() // 如果在此处直接调用this.ready()方法，将无法加载地图
    },
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
      ready: function () {
        var map = new BMap.Map("allmap");
        map.centerAndZoom("湖南大学社区", 30);
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
        map.addEventListener("click",function(e){
          var pt = e.point;

        })
        var geoc = new BMap.Geocoder()
        // var mappoi = new MapPoi()

        map.addEventListener("click", function(e){
          var pt = e.point;
          var message = pt.lng+","+pt.lat+",";
          geoc.getLocation(pt, function(rs){
            var addComp = rs.addressComponents;

            message = message+ addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
            alert(message)
          });

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
</style>
