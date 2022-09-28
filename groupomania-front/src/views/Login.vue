<template>
   <div class="container">
      <div class="row">
         <div class="col-md-6">
            <div class="card">
               <form action="post" class="box">
                  <h1>Se connecter</h1>
                  <h3 class="text">Si vous n'avez pas de compte, créez-en un avant de vous connecter sur l'application
                  </h3>
                  <p class="text"> Entrez votre mail et votre mot de passe </p>
                  <input type="text" class="text" name="email" placeholder="email" v-model="email">
                  <input type="password" class="text" name="password" placeholder="mot de passe" v-model="password">
                  <div>
                     <button class="login-button" @click="login">Je me connecte</button>
                     <span id="msg" v-if="errorMsg"> {{ errorMsg }}</span>
                  </div>
               </form>
            </div>
         </div>
      </div>
   </div>
</template>

<script>

export default {
   data() {
      return {
         email: "",
         password: "",
         errorMsg: ""
      }
   },
   methods: {
      async login(e) {
         e.preventDefault();
         try {
            const response = await fetch('http://localhost:3001/api/user/login',
               {
                  method: 'POST',
                  headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ email: this.email, password: this.password })
               })

            const userData = await response.json();
            const userToken = userData.token;

            if (response.status == 401) {
               this.errorMsg = userData.message;
            } else {
               const tokenStored = localStorage.setItem('token', userToken);
               this.$emit('isLogged');
               this.$router.push({ name: 'home' })
            }
         } catch (error) {
            this.errorMsg = error.error;
         }
      },

   }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

@media (min-width: 1024px) {
   .login {
      min-height: 100vh;
      width: 100px;
      margin: auto;
      display: flex;
      align-items: center;
   }
}

* {
   font-family: 'Lato', sans-serif;
}

body {
   margin: 0;
   padding: 0;
   background: #fff
}

.card {
   margin-bottom: 20px;
   border: none;
}

.box {
   padding: 10px;
   background: #4e5166;
   text-align: center;
   transition: 0.25s;
   margin-top: 20px
}

.box input[type="text"],
.box input[type="password"] {
   border: 0;
   background: none;
   display: block;
   margin: 20px auto;
   text-align: center;
   border: 2px solid #ffd7d7;
   padding: 10px 10px;
   width: 250px;
   outline: none;
   color: white;
   border-radius: 24px;
   transition: 0.25s
}

.login-button {
   border: 0;
   background: none;
   display: block;
   margin: 20px auto;
   text-align: center;
   border: 2px solid #44ff44;
   padding: 10px 10px;
   width: 150px;
   outline: none;
   color: white;
   border-radius: 24px;
   transition: 0.25s
}

.box input[type="text"]:focus,
.box input[type="password"]:focus {
   width: 300px;
   border-color: #ff7d7d;
}

input::placeholder {
   color: white;
}

.text {
   color: #fff;
}

span#msg {
   color: #fd2f01;
}
</style>