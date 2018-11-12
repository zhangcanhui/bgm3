<template>
  <div class="mybody">
    <div class="mycontent">
      <div class="mytitle">楼栋信息查询</div>
      <Row>
        <i-col span='2'>楼栋编号：</i-col>
        <i-col span='4'><Input placeholder="请输入楼栋编号" v-model="buildno"  size="large"></Input></i-col>
        <i-col span='2'>楼栋名称：</i-col>
        <i-col span='4'><Input placeholder="请输入楼栋名称" v-model="buildname" size="large"></Input></i-col>
        <i-col span='2'>楼栋户数：</i-col>
        <i-col span='4'><Input placeholder="请输入楼栋户数" v-model="familynum" size="large"></Input></i-col>
      </Row>
      <br>
      <Row>
        <i-col span='2'>楼栋层数：</i-col>
        <i-col span='4'><Input placeholder="请输入楼栋层数" v-model="floornum"  size="large"></Input></i-col>
        <i-col span='2'>楼栋单元数：</i-col>
        <i-col span='4'><Input placeholder="请输入楼栋单元数" v-model="buildcount"  size="large"></Input></i-col>
      </Row>
      <br>
      <Row>
        <i-col span='4'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</i-col>  <!--为了使按钮达到居中效果--加空格占位-->
        <i-col span='4'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</i-col>
        <i-col span="6">
          <Button type="primary" long class="mybutton" @click="login" size="large">查询</Button>&nbsp;
        </i-col>
      </Row>
      <div class="dispMsg">
        <table  border='1' cellspacing='0' padding='2'>
          <thead>
          <tr><th>序号</th><th>楼栋编号</th><th>楼栋名称</th><th>楼栋户数</th><th>楼栋层数</th><th>楼栋单元数</th></tr>
          </thead>
          <tbody>
          <tr v-for="build in dispMsg">
            <td>{{build.id}}</td>
            <td>{{build.buildno}}</td>
            <td>{{build.buildname}}</td>
            <td>{{build.familynum}}</td>
            <td>{{build.floornum}}</td>
            <td>{{build.buildcount}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  import Vuex from 'vuex';
  export default {
    name: 'QueryBuildInfo',
    data () {
      return {
        buildno:'',
        buildname:'',
        dispMsg:[],
        buildcount:'',
        familynum:'',
        floornum:'',
      }
    },
    methods:{
      login:function(){
        var _self=this; //这一句非常重要呀！
        $.ajax({
          url:  "http://localhost:8080/buildinfo/selectbuildinfo",
          type: "post",
          data: {"buildno": this.buildno,"buildname": this.buildname,"buildcount":this.buildcount,"familynum":this.familynum,"floornum":this.floornum},
          dataType: "json",
          error: function(error) {
            //alert(error);
            _self.dispMsg=error;
          },
          success: function (data,status) {
            //注册返回的是数据，不需要保存到共享变量中
            //返回的是对象，不是List，所以只要从data中取值
            _self.dispMsg=data;
            // var i=0;
            // var nLen=data.length;
            // //mtext="";
            // for (i=0;i<nLen;i++){
            //   _self.mtext+="\n"+data[i].id+" "+data[i].studno+" "+data[i].username+" "+data[i].pw;
            // }
            // alert("循环获取的数据:\n"+mtext);
          }
        });
      },
    }
  }
</script>
<style lang='scss'>
  html,body{
    width: 100%;
    height: 100%;
  }
  .mybody{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content:center ;
    align-items:center;
  }

  .mycontent{
    width: 1024px;
    height: 800px;

    background-image: url("../../static/img/bg3.png");
    background-repeat: repeat-x;
    justify-content:center;
    align-items:center;
    padding-left:50px;
  }
  .mytitle{
    padding-left:36px;
    padding-top:55px;
    font-family: '微软雅黑';
    font-size: 30px;
    height:135px;
  }
  .dispMsg{
    font-family: '微软雅黑';
    font-size: 18px;
    justify-content:center;
    align-items:center;
    padding-left: 120px;
  }
  .padd{
    padding:20px 0;
  }
  .star{
    color: black;
  }
  .PaddHeight{
    height:200px;
    width: 200px;
    display: inline-block;
  }
  .passwordinput{
    margin-top:44px;
  }
  .mybutton{
    font-size: larger;
  }
</style>
