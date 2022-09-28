<template>
   <div class="img-title">
      <img alt="Vue logo" class="logo" src="@/assets/icon-above-font.png" width="125" height="125" />
      <h1>Bienvenue sur groupomania</h1>
   </div>
   <div class="wrapper">
      <nav v-if="isLogged == false">
         <a href="">
            <RouterLink class="logout" to="/">S'INSCRIRE</RouterLink>
         </a>
         <a href="">
            <RouterLink class="logout" to="/login">SE CONNECTER</RouterLink>
         </a>
      </nav>
      <div v-else id="logout">
         <a href="" @click="logout()">
            <RouterLink to="/login">SE DÉCONNECTER</RouterLink>
         </a>
      </div>
   </div>
   <RouterView @isLogged="isLogged = true" />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
   data() {
      return {
         isLogged: true,
      }
   },
   beforeMount() {
      if (localStorage.getItem('token')) {
         this.isLogged = true;
         this.$router.push({ name: 'home' });
      } else {
         this.isLogged = false;
      }
   },
   methods: {
      logout() {
         this.isLogged = false;
         localStorage.clear();
      }
   }
}
</script>
   

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

@media only screen and (max-width: 600px) {
   #app {
      margin: 0 auto;
      padding: 1rem;
      font-weight: normal;
      min-width: 200px;
   }

   header {
      flex-direction: column;
   }

   .logo {
      margin: 0 auto;
   }

   .post-image {
      max-width: 350px;
      width: 280px;
      margin: 0 auto;
   }
}

@media only screen and (min-width: 600px) {
   .post-image {
      width: 630px;
      margin: 0 auto;
   }
}

#app {
   margin: 0 auto;
   padding: 1rem;
   font-weight: normal;
}

.container {
   padding: 15px;
   max-width: 800px;
   box-shadow: 4px 4px 8px #e1e1e1;
   margin: 20px 0px;
   border-radius: 20px;
   border: solid 1px #ffd7d7;
}

* {
   font-family: 'Lato', sans-serif;
}

body {
   display: flex;
}

h1 {
   font-size: 17px;
   text-transform: uppercase;
   text-align: center;
   color: #4e5166;
}

.img-title {
   display: flex;
   flex-direction: row;
   justify-content: center;
   background-color: #ffd7d7;
   border-radius: 20px;
   margin-top: 10px;
   padding: 10px;
   align-items: center;
}

.logo {
   display: block;
   margin: 8px;
   border-radius: 15px;
}

a,
.green {
   text-decoration: none;
   color: #4e5166;
}

#logout {
   text-align: center;
   padding: 6px 0 6px 0;
   border-radius: 15px;
   background-color: #ffd7d7;
   margin: 10px auto;
   width: 180px;
}

.logout {
   margin: 0 5px 0 5px;
   width: 150px;
   text-align: center;
   padding: 6px 0 6px 0;
   border-radius: 15px;
   background-color: #ffd7d7;
}

nav {
   width: 100%;
   margin-top: 2rem;
   display: flex;
   flex-direction: row;
   justify-content: center;
}

nav a.router-link-exact-active {
   color: #fd2d01;
}

nav a {
   display: inline-block;
}
</style>
