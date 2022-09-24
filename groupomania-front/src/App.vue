<template>
  <header>
      <img alt="Vue logo" class="logo" src="@/assets/icon-above-font.png" width="125" height="125" />

      <div class="wrapper">
         <h1>Bienvenue sur groupomania</h1>
         <nav v-if="isLogged == false">
            <a href=""><RouterLink class="logout" to="/">S'INSCRIRE</RouterLink></a>
            <a href=""><RouterLink class="logout" to="/login">SE CONNECTER</RouterLink></a>
         </nav>
         <nav v-else id="logout">
            <a href="" @click="logout()"><RouterLink to="/login">SE DÉCONNECTER</RouterLink></a>
         </nav>
      </div>
  </header>

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
      beforeMount(){
         if (localStorage.getItem('token')) {
               this.isLogged = true;
            } else {
               this.isLogged = false;
            }
      },
      methods: {
         logout(){
            this.isLogged = false;
            localStorage.clear();
         }
      }
   }
</script>
   

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

#app {
   max-width: 1280px;
   margin: 0 auto;
   padding: 2rem;
   font-weight: normal;
}

* {
   font-family: 'Lato', sans-serif;
}

body {
   display: flex;
}

header {
   max-height: 100vh;
   display: flex;
   background-color: #ffd7d7;
   border-radius: 20px;
   margin-top: 10px;
   padding: 20px;
}

h1 {
   font-size: 2em;
   text-align: center;
}

.logo {
   display: block;
   margin: 8px;
   border-radius: 15px;
}

a, .green {
   text-decoration: none;
   color: #4e5166;
   transition: 0.4s;
}

#logout, .logout{
   text-align: center;
   padding: 10px;
   border-radius: 15px;
   background-color: white;
   margin: 0 auto;
   width: 180px;
}

nav {
   width: 100%;
   margin-top: 2rem;
   display: flex;

}

nav a.router-link-exact-active {
   color: #fd2d01;
}

nav a {
   display: inline-block;
   padding: 0 1rem;
}

@media (min-width: 1024px) {
   body {
      display: flex;
      place-items: center;
   }

   #app {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 2rem;
   }

   header .wrapper {
      justify-content: center;
      place-items: flex-start;
      flex-wrap: wrap;
   }

   nav {
      text-align: left;
      margin-left: -1rem;
      font-size: 1rem;
      padding: 1rem 0;
      margin-top: 1rem;
   }
}
</style>
