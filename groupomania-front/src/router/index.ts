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
   if (main?.meta?.auth == true) {
      if (!localStorage.getItem('token')) {
         return next({ name: 'signup' });
      }
   }
   next();
});
export default router
