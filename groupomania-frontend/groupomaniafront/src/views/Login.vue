<!-- <template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style> -->
<template>
   <div class="login">
         <h1>Bienvenue sur la page de connection</h1>
         <form action="post" class="form">
            <label for="mail">Votre e-mail</label>
            <input type="mail" placeholder="e-mail" class="input-email">
            <label for="password">Votre Mot de passe </label>
            <input type="password" placeholder="mot de passe" class="input-password" v-model="password">
            <div>
               <button @click="click">Submit</button>
            </div>
         </form>
   </div>
</template>

<script>

export default {
   data() {
      return {
         password: "",
         email: ""
      }
   },
   methods: {
      async click(event) {
         event.preventDefault()
         try {
            //debugger
            const response = await fetch('http://localhost:3001/api/user/login', {method: 'POST', body:{ password: this.password, email: this.email}})
            const data = await response.json();
            console.log(data);
         }
         catch(error) {
            console.log(error);
         }
      }
   }
};
</script>

<style>
@media (min-width: 1024px) {
  .login {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>