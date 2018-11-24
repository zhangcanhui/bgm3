// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'iview';	//静态导入iview
import Boot from './Boot'
import router from './router'
//导入router框架
import VueRouter from 'vue-router'

import VueResource from 'vue-resource' //数据共享需要此组件
import  'iview/dist/styles/iview.css'//样式库
//导入Vuxe状态管理框架
import Vuex from 'vuex'    //用于管理多个组件之间数据共享

Vue.use(iView);
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Vuex);  // 注册vuex组件
Vue.config.productionTip = false;
//状态管理，会话变量等
const store=new Vuex.Store({
  //vuex的配置
  //在任何组件中可以调用main.js中$store.state.count的值
  //这个数据只能读取，修改需提交给mutations
  //_self.$store.state.count
  state:{
    // count:10,
    // list:[1,5,800,120,140,50],
    // loginok:0,
    // loginname:'ddv'
    id:0,
    memberid:'',
    location:'',
    longandlati:'',
    status:0
  },
  mutations:{
    newId(state,id){
      state.id=id;
    },
    newMemberid(state,memberid){
      state.memberid=memberid;
    },
    newLocation(state,location){
      state.location=location;
      localStorage.setItem('location',location);
    },
    newLongandlati(state,longandlati){
      state.longandlati=longandlati;
      localStorage.setItem('longandlati',longandlati);
    },
    newStatus(state,status){
      state.status=status;
    }
  },
});
// export default  store //怎么这句话忘记写了
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, //这样就能全局使用vuex了(可以在任何组件里面使用this.$store了)
  components: { Boot },
  created(){
    this.$store.state.location = localStorage.getItem('location');
    this.$store.state.longandlati = localStorage.getItem('longandlati');
  },
  template: '<Boot/>'
  //render:h=>{return h(Boot)}
})
