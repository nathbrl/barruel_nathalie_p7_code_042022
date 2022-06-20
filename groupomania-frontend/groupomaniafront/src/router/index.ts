import { createRouter, createWebHistory } from 'vue-router'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'



const router = createRouter({

   history: createWebHistory(import.meta.env.BASE_URL),
   routes : [
      {
         path: '/',
         name: 'signup',
         component: Signup,
         meta: {
            auth: false
         }
      },
      {
         path: '/login',
         name: 'login',
         component: Login,
         meta: {
            auth: false
         }
      },
      {
         path: '/home',
         name: 'home',
         component: Home,
         meta: {
            auth: true
         }
      }
 ]
})
router.beforeEach((to, from, next) => {
   
   const main = to.matched[0];
   debugger
   console.log('test1', main.meta);
   if(main?.meta?.auth == true){
      console.log('test2');
      if(!localStorage.getItem('token')) {
         console.log('test3');
         return next({ name: 'signup' });
      }
   }
   next();
   
});
export default router
