<template>
  <div class="mybody">
    <div class="mycontent">
      <div class="mytitle">修改记录</div>
      <Row>
        <i-col span='4'> <span class="star">*</span>编号：</i-col>
        <i-col span='7'><Input placeholder="编号" v-model="id"  size="large"></Input></i-col>
      </Row>
      <Row>
        <i-col span='4'> <span class="star">*</span>学号：</i-col>
        <i-col span='7'><Input placeholder="学号" v-model="studno"  size="large"></Input></i-col>
      </Row>
      <Row class="padd">
        <i-col span='4'><span class="star">*</span>姓名：</i-col>
        <i-col span='7'><Input placeholder="姓名" v-model="username" size="large"></Input></i-col>
      </Row>
      <Row  class="padd">
        <i-col span='4'>密码：</i-col>
        <i-col span='7'>
          <Input placeholder="密码"   v-model="password1"  size="large" type="password"></Input>
        </i-col>
      </Row>
      <Row>
        <i-col span="12">
          <Button type="primary" class="mybutton" @click="login" size="large">修改</Button>&nbsp;
          <!--
          <Button type="primary" class="mybutton" @click="returnquerygrid" size="large">返回</Button>&nbsp;
          都是同一个页面，a是在新页面中，重新回到登录页面了
          <a href="/Querygrid">返回</a>
          -->
          <router-link to="/Querygrid" >返回</router-link>
        </i-col>
      </Row>
      <Row>
        <i-col span="18">
          <span class="dispMsg">{{dispMsg}}</span>
        </i-col>
      </Row>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  import Vuex from 'vuex';
  export default {
    name: 'Editone',
    data () {
      return {
        studno:'',
        password1:'',
        username:'',
        dispMsg:"",
        id:""
      }
    },
    //mounted:function(){
    beforeMount:function(){
      var _self=this;
      //将调用方送来的数据保存到数据成员中
      _self.id=_self.$route.params.id;
      //读取id所指的记录
      _self.getOne();
    },
    methods:{
      returnquerygrid:function () {
        var _self=this;
        _self.$router.push('/Querygrid');
      },
      getOne:function(){
        var _self=this;
        $.ajax({
          url:  "http://localhost:8080/pw/getonebyid",
          type: "post",
          data: {"id": _self.id},
          dataType: "json",
          error: function(error) {
            //alert(error);
            _self.dispMsg=error;
          },
          success: function (data,status) {
            //返回获取的数据,写到数据成员中
            // var  mtext="id:"+data.id+",studno:"+data.studno+",userName:"+data.name+",pw:"+data.pw;
            //alert(mtext);
            _self.id=data.id;
            _self.studno=data.studno;
            _self.username=data.username;
            _self.password1=data.pw;
          }
        });
      },
      login:function(){
        var _self=this; //这一句非常重要呀！
        if (_self.password1.trim().length==0){
          _self.password1="123456";
        }

        if (_self.studno.trim().length==0){
          _self.dispMsg="学号为空";
        }else if (_self.username.trim()==""){
          _self.dispMsg="姓名为空";
        } else {
          $.ajax({
            url:  "http://localhost:8080/pw/modione",
            type: "post",
            data: {"username": this.username,
              "pw":this.password1,
              "studno": this.studno,
              "id":this.id},
            dataType: "json",
            error: function(error) {
              //alert(error);
              _self.dispMsg=error;
            },
            success: function (data,status) {
              //注册返回的是数据，不需要保存到共享变量中
              //返回的是对象，不是List，所以只要从data中取值
              if (data.id<1){
                _self.dispMsg=data.username;
              } else {
                _self.dispMsg="修改成功！其id:"+data.id+",用户名："+data.username+"，学号："+data.studno+"，密码："+data.pw;
              }
            }
          });
        }
      }
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
    padding-left:53px;
    padding-top:55px;
    font-family: '微软雅黑';
    font-size: 30px;
    height:135px;
  }
  .dispMsg{
    font-family: '微软雅黑';
    font-size: 18px;
    /*color: red;*/
    justify-content:center;
    align-items:center;
  }
  .padd{
    padding:20px 0;
  }
  .star{
    color: red;
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
