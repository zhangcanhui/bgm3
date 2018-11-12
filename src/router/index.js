import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Reg  from '@/components/Reg'
import Querygrid from '@/components/Querygrid'
import Editone from '@/components/Editone'
import View from '@/components/View'
import QueryBuildInfo from '@/components/QueryBuildInfo'
import Baiduditu from '@/components/Baiduditu'
import Editpassword from '@/components/Editpassword'
import EditOneModal from '@/components/EditOneModal'
import Upload from '@/components/Upload'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Reg',
      name: 'Reg',
      component: Reg
    },
    {
      path: '/Querygrid',
      name: 'Querygrid',
      component: Querygrid
    },
    {
      path: '/Editone/:id',
      name: 'Editone',
      component: Editone
    },
    {
      path: '/View',
      name: 'View',
      component: View
    },
    {
      path: '/QueryBuildInfo',
      name: 'QueryBuildInfo',
      component: QueryBuildInfo
    },
    {
      path: '/Baiduditu',
      name: 'Baiduditu',
      component: Baiduditu
    },
    {
      path: '/Editpassword',
      name: 'Editpassword',
      component: Editpassword
    },
    {
      path: '/EditOneModal',
      name: 'EditOneModal',
      component: EditOneModal
    },
    {
      path: '/Upload',
      name: 'Upload',
      component: Upload
    },
  ]
})
