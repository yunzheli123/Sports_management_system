import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/welcome.vue'
import UserList from '../components/admin/UserList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect:"/login"
  },
  {
    path:"/login",
    component: Login
  },
  {
    path:"/home",
    component: Home,
    redirect:"/welcome",
    children:[
      {path:"/welcome",component: Welcome,},
      {path:"/user",component: UserList,},
    ]
  }
]

const router = new VueRouter({
  routes
})

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject){
  if(onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to,from,next)=>{
  if(to.path=='/login') return next();
  const userflag = window.sessionStorage.getItem("user");
  if(!userflag) return next('/login');
  next();
})

export default router
