<template>
  <div class="mybody">
    <div class="mycontent">
      <div class="mytitle">修改密码</div>
      <Row>
        <i-col span='4'> <span class="star">*</span>会员号：</i-col>
        <i-col span='7'><Input placeholder="会员号" v-model="memberid"  size="large"></Input></i-col>
      </Row>
      <Row>
        <i-col span='4'> <span class="star">*</span>原密码：</i-col>
        <i-col span='7'><Input placeholder="请输入原密码" v-model="password"  size="large"></Input></i-col>
      </Row>
      <Row>
        <i-col span='4'> <span class="star">*</span>新密码：</i-col>
        <i-col span='7'><Input placeholder="请输入新密码" v-model="password1"  size="large" type="password"></Input></i-col>
      </Row>
      <Row class="padd">
        <i-col span='4'><span class="star">*</span>新密码确认：</i-col>
        <i-col span='7'><Input placeholder="请再次输入新密码" v-model="password2" size="large" type="password"></Input></i-col>
      </Row>

      <Row>
        <i-col span="12">
          <Button type="primary" class="mybutton" @click="login" size="large">确定</Button>&nbsp;
          <!--
          <Button type="primary" class="mybutton" @click="returnquerygrid" size="large">返回</Button>&nbsp;
          都是同一个页面，a是在新页面中，重新回到登录页面了
          <a href="/Querygrid">返回</a>
          -->
          <router-link to="/View" >返回</router-link>
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
        name: "editpassword",
        data(){
          return{
            memberid:"",
            password:'',
            password1:'',
            password2:'',
            dispMsg:"",
          }
        },
      methods:{
          login:function () {
            var _self=this;
            $.ajax({
              url:  "http://localhost:8080/pw/updateuserinfo",
              type: "post",
              data: {"memberid": this.memberid,
                      "password":this.password,
                      "password1":this.password1,
                      "password2":this.password2},
              dataType: "json",
              error: function(error) {
                alert("修改失败");

              },
              success: function (data,status) {
                //返回获取的数据,写到数据成员中
                _self.dispMsg="修改成功！其memberid:"+data.memberid+",password:"+data.password;


              }
            });
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

