<template>
  <div id="app">
    <!--
    <table>
      <tr><td id="toparea" colspan="2" ><img src="../static/img/yshtop.png">
        </td></tr>
      <tr><td>&nbsp;</td>
      <td id="content" style="width:1200px;height:800px;"><router-view/> </td>
      </tr>
      <tr><td colspan="2">数据共享部分:count:{{$store.state.count}},loginok:{{$store.state.loginok}},loginname:{{$store.state.loginname}}</td></tr>
    </table>
    -->
    <router-view/>
    <!--数据共享部分:id:{{$store.state.id}},memberid:{{$store.state.memberid}},location:{{this.$store.state.location}},longandlati:{{$store.state.longandlati}},status:{{$store.state.status}}-->
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
  }
  #toparea{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background-image: url("../static/img/yshtop.png");
    background-repeat: repeat-x;
    display: flex;
    justify-content:center ;
    align-items:center;
  }
</style>
