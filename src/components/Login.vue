<template>
  <div class="mybody">
    <div class="mycontent">
      <div class="logindiv">
        <div class="mytitle">桂花社区导航信息管理系统</div>
        <div class="logininput">
          <input placeholder="会员号" v-model="memberId" size="large" @on-keypress="handlePress"></input>
          <input placeholder="密码" class="passwordinput" v-model="password1" size="large" type="password" @on-keypress="handlePress"></input>
          <p class="autologin"><a @click="forgetCode">忘记密码</a><br>
            <!-- <a @click="regOne">注册</a>
            -->
          </p>
          <Button type="primary" long class="mybutton" @click="login" size="large">登录</Button>&nbsp;
          <Button type="primary" long class="mybutton" @click="getdataysh" size="large">获取数据</Button>
          <router-link to="/Reg">注册</router-link> <a @click="modiLoginName">同步</a><br>
          <!--passyn={{passyn}},id={{id}},userName={{userName}}!-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //import {yshlogin} from'../assets/js/comm';
  import $ from 'jquery';
  import Vuex from 'vuex';
  export default {
    name: 'Login',
//    data () {
//      return {
//        memberId:'',
//        password1:'',
//        id:0,
//        location:'',
//        longandlati:'',
//        status:0
//      }
//    },
    methods:{
      login:function(){
        var _self=this; //这一句非常重要呀！
        $.ajax({
          //url:  "api/bgm5/person2",
          url:  "http://localhost:8080/pw/checkuser",
          type: "post",
          data: {"memberid": this.memberId, "password":this.password1},
          dataType: "json",
          error: function(error) {//function (xhr, info) {
            alert("用户名或密码错误，请重新输入");
          },
          success: function (data) {

            //返回的是对象，不是List，所以只要从data中取值
            //var  mtext="isOk:"+data.memberid+",id:"+data.id+",userName:"+data.password;//xhr.responseText;
            // _self.memberId=data.memberid;
            // _self.id=data.id;
            // _self.password1=data.password;
            if(data.memberid==_self.memberId&&data.password==_self.password1){
//              _self.id=data.id;
//              _self.location=data.location;
              _self.$store.commit('newId',data.id);
              _self.$store.commit('newMemberid',data.memberid);
              _self.$store.commit('newLocation',data.location);
              _self.$store.commit('newLongandlati',data.longandlati);
              _self.$store.commit('newStatus',data.status);
              window.location="http://localhost:8081/#/View";
//              this.router.push("/View");    //调用路由链接进行页面的跳转
            }
            //alert("成功执行了身份校验功能：\n"+mtext+","+status);
            // _self.$store.commit('newLoginOk',data.passyn); //一次只能修改一个属性值也
            // _self.$store.commit('newLogin',data.userName);
            // _self.$store.state.loginname=data.userName;
          }

        });

      },
      getdataysh:function(){
        var _self=this;
        $.ajax({
          //url:  "api/bgm5/person2",
          url:  "http://localhost:8080/bgm5/person3",
          type: "post",
          data: {"username": this.memberId, "userpass":this.password1},
          dataType: "json",
          //beforeSend: function (xhr) {
          // addHeaders(xhr);
          //},
          error: function(error) {//function (xhr, info) {
            //resultfunc(false, info);
            alert(error);
          },
          success: function (data,status) {
            //alert(this.memberId+","+this.password1);
            var  mtext=data[0].age+","+data[0].id+","+data[0].name;//xhr.responseText;
            mtext+="\n"+data[1].age+","+data[1].id+","+data[1].name;
            //alert("成功执行了：\n"+mtext+","+status);
            //将数据共享中vuex中，然后循环读取
            var i=0;
            var nLen=data.length;
            mtext="";
            for (i=0;i<nLen;i++){
              mtext+="\n"+data[i].id+"_"+data[i].age+"_"+data[i].name;
            }
            alert("循环获取的数据:\n"+mtext);
            //modiLoinState(true,data[0].name);//调用此函数修改
            //alert("==="+data[0].name);
            //this.$store.commit('newLogin',data[0].name);
            //$store.commitMessage('setloginok',true);
            //$store.commit('setloginok',true);
            //alert("==222="+data[0].name);
            //this.loginname=data[0].name;
            //modiLoinName(data[0].name);
            //this.loginName=data[0].name;
            //因为使用_self所以才可以
            _self.$store.commit('newLogin',data[0].name);
          }
        });
      },
      modiLoginName:function(){
        this.$store.commit('newLogin',this.memberId);
      },
      handlePress:function(){
        if(this.event.keyCode==13){ //回车
          //this.login();
          //console.write("fafafadfa");
          window.alert("回车就是提交！");
          this.login();
        }
      },
      forgetCode:function(){
        window.alert("请您拔打客服热线：0731-85411666，进行咨询！");
      },
      regOne:function () {
        window.alert("regOne:0");
        this.router.push("/Reg");    //调用路由链接进行页面的跳转
        window.alert("regOne:1");
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  html,body{
    width: 100%;
    height: 100%;
  }
  .mybody{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background-image: url("../../static/img/bg3.png");
    background-repeat: repeat-x;
    display: flex;
    justify-content:center ;
    align-items:center;
  }

  .mycontent{
    width: 1056px;
    height: 668px;
    background-image: url("../../static/img/bg1.png");
    display: flex;
    justify-content:flex-end;
    align-items:center;
    padding-right:20px;
  }
  .logindiv{
    width:347px;
    height:493px;
    margin-right:50px;
    margin-top:60px;
    background-color: #ffffff;
  }
  .mytitle{
    padding-left:30px;
    padding-top:55px;
    font-family: '微软雅黑';
    font-size: 20px;
    height:135px;
    color: #0000C6;
  }
  .logininput{
    padding-left:27px;
    padding-right:27px;
  }

  .autologin{
    margin-top:54px;
    font-size:14px;
  }
  .mybutton{
    margin-top:14px;
  }
  .passwordinput{
    margin-top:44px;
  }
</style>
