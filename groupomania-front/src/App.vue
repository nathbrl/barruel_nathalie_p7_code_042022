<template>
  <header>
      <img alt="Vue logo" class="logo" src="@/assets/icon-above-font.png" width="125" height="125" />

      <div class="wrapper">
         <h1>Bienvenue sur groupomania</h1>
         <nav v-if="isLogged == false">
            <RouterLink to="/">S'INSCRIRE</RouterLink>
            <RouterLink to="/login">SE CONNECTER</RouterLink>
         </nav>
         <nav v-else>
            <RouterLink to="/login" @click="logout()">SE DÉCONNECTER</RouterLink>
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
   background-color: white;
   border-radius: 20px;
   margin-top: 10px;
}

h1 {
   font-size: 2em;
}

.logo {
   display: block;
   margin: 8px;
}

a,
.green {
   text-decoration: none;
   color: #4e5166;
   transition: 0.4s;
}

nav {
   width: 100%;
   margin-top: 2rem;
}

nav a.router-link-exact-active {
   color: #fd2d01;
}

nav a.router-link-exact-active:hover {
   background-color: transparent;
}

nav a {
   display: inline-block;
   padding: 0 1rem;
   border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
   border: 0;
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
