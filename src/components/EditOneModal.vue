<template>
  <div>
    <Row>
      <i-col span='4'> <span class="star">*</span>编号：</i-col>
      <i-col span='7'><Input placeholder="编号" v-model="studno"  size="large"></Input></i-col>
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
        <!--<Button type="primary" class="mybutton" @click="login" size="large">修改</Button>&nbsp;-->
        <!--<Button type="primary" class="mybutton" @click="notShowDetail" size="large">返回</Button>&nbsp;-->
      </i-col>
    </Row>
    <Row>
      <i-col span="18">
        <span class="dispMsg">{{dispMsg}}</span>
      </i-col>
    </Row>

    <Spin fix v-if="spinShow">
      <div>加载中</div>
    </Spin>
  </div>
</template>

<script>
  import $ from 'jquery';
  import Vuex from 'vuex';
  import Querygrid from '@/components/Querygrid'
  let vue
  export default {
    name: 'EditOneModal',
    data () {
      return vue={
        parentVue:'',
        studno:'',
        password1:'',
        username:'',
        dispMsg:"",
        id:"",
        spinShow:true
      }
    },
    methods:{
      notShowDetail:function () {
        //父组件中的数据成员的值
        this.parentVue.modalEditOne=false;
      },
      getOneModal(id0,parentVue){
        this.spinShow=true;
        this.parentVue=parentVue;
        this.id=id0;
        var _self=this;
        _self.dispMsg="";
        $.ajax({
          url:  "http://localhost:8080/pw/getonebyid",
          type: "post",
          data: {"id": _self.id},
          dataType: "json",
          error: function(error) {
            _self.dispMsg=error;
          },
          success: function (data,status) {
            //返回获取的数据,写到数据成员中
            // var  mtext="id:"+data.id+",studno:"+data.studno+",userName:"+data.name+",pw:"+data.pw;
            //alert(mtext);
            _self.spinShow=false;
            _self.id = data.id;
            _self.studno = data.studno;
            _self.username = data.username;
            _self.password1 = data.pw;

          }
        });
      },
      login:function(){
        //保存数据
        var _self=this; //这一句非常重要呀！
        if (_self.password1.trim().length==0){
          _self.password1="123456";
        }

        if (_self.studno.trim().length==0){
          _self.dispMsg="学号为空";
        }else if (_self.username.trim()==""){
          _self.dispMsg="姓名为空"
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
                _self.parentVue.login();      //当修改完成后自动执行刷新操作--通过调用父窗体的查询操作
              }
            }
          });
        }
      }
    }
  }
</script>

<style lang='scss'>

</style>

