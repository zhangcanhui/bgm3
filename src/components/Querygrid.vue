<template>
  <div class="mybody">
    <div class="mycontent">
      <div class="mytitle">查询</div>
      <Row>
        <i-col span='2'>编号：</i-col>
        <i-col span='4'><Input placeholder="编号" v-model="studno"  size="large"></Input></i-col>
        <i-col span='2'>姓名：</i-col>
        <i-col span='4'><Input placeholder="姓名" v-model="username" size="large"></Input></i-col>
        <i-col span="4">
          <Button type="primary" long class="mybutton" @click="login" size="large">查询</Button>&nbsp;

        </i-col>
      </Row>
      <div>
        <editonemodal @click="login"> </editonemodal>
      </div>
      <div class="dispMsg">
        <table  border='1' cellspacing='0' padding='2'>
          <thead>
          <tr><th>序号</th><th>编号</th><th>姓名</th><th>密码</th><th>操作</th></tr>
          </thead>
          <tbody>
          <tr v-for="person in dispMsg"> <!--6-->
            <td>{{person.id}}</td>
            <td>{{person.studno}}</td>
            <td>{{person.username}}</td>
            <td>{{person.pw}}</td>
            <td><a @click=editOne(person.id)>修改</a><a @click=showEditOneModal(person.id)>修改2</a>
                <a @click=showUpfileOneModal(person.id)>上传文件</a>
            </td>

          </tr>
          </tbody>
        </table>
        <div>
          <Modal class="vertical-center-modal" title="修改单条记录" v-model='modalEditOne' ok-text='确定' cancel-text="返回"
                 @on-ok="modalOk" width="50%">
              <editOneModal ref="editOneModal"></editOneModal>
          </Modal>
          <!--上传文件-->
          <Modal class="vertical-center-modal" title="文件上传" v-model="modalUpfile" on-text="确定" cancel-text="返回" width="50%">
            <h3>文件上传</h3>
            选择一个文件上传：<br/>
            <form action="/upfileapi/file_uploadOne" method="post" enctype="multipart/form-data">
              <label>第一个文件</label><input type="file" name="image" size="50"/><br/>
              <label>第二个文件</label><input type="file" name="image" size="50"/><br/>
              <input type="submit" value="上传文件"/>
            </form>

          </Modal>
        </div>
      </div>
      <Row>
          <i-col span="16">
              <!--<span class="mtext">{{mtext}}</span>-->
          </i-col>
      </Row>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  import Vuex from 'vuex';
  // import EditOne from '@/components/EditOne'
  import EditOneModal from '@/components/EditOneModal'
  let vue
  export default {
    name: 'Querygrid',
    data () {
      return vue={
        studno:'',
        username:'',
        dispMsg:[],
        modalEditOne:false,
        spinShow:false,
        modalUpfile:false,
        mtext:'',
      }
    },
    //这一句很重要呀，否则调用子组件出错
    components:{
      EditOneModal
    },
    beforeMount:function(){   //进页面之前把数据取出来
      var _self=this;
      //将调用方送来的数据保存到数据成员中
      _self.id=_self.$route.params.id;
      //读取所有记录
      _self.login();
    },
    methods:{
      login:function(){
        var _self=this; //这一句非常重要呀！
        $.ajax({
          url:  "http://localhost:8080/pw/select",
          type: "post",
          data: {"username": this.username,"studno": this.studno,},
          dataType: "json",
          error: function(error) {
            //alert(error);
            _self.dispMsg=error;
          },
          success: function (data,status) {
            //注册返回的是数据，不需要保存到共享变量中
            //返回的是对象，不是List，所以只要从data中取值
            _self.dispMsg=data;
            var i=0;
            var nLen=data.length;
            //mtext="";
            for (i=0;i<nLen;i++){
              _self.mtext+="\n"+data[i].id+" "+data[i].studno+" "+data[i].username+" "+data[i].pw;
            }
            alert("循环获取的数据:\n"+mtext);
          }
        });
      },
      modalOk:function () {
        //调用子组件中的函数对数据进行修改，从而可以彻底解决了模态窗体的问题
        this.$refs.editOneModal.login();
      },
      showUpfileOneModal:function (id0) {
        this.modalUpfile=true;
      },
      editOne:function (id0) {
        var _self=this;
        _self.$router.push('/editOne/'+id0);  //到路由表中查路由项（从全局变量中取值）
      },
      showEditOneModal:function (id0) {
        this.modalEditOne=true;
        //调用子组件中的函数，读取指定记录的数据，记录号与当前对象
        //这个语句有点另类
        this.$refs.editOneModal.getOneModal(id0,this);    //父模板调用子类的方法
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
  .vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;
    .ivu-modal{
      top: 100px;
    }
  }
</style>
