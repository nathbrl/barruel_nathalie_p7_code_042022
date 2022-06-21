<template>
   <div class="container"> 
      <div class="row"> 
         <div class="col-md-6"> 
            <div class="card"> 
               <form action="post" class="box"> 
                  <h1>Se connecter</h1> 
                  <h3 class="text">Si vous n'avez pas de compte, créez-en un  avant de vous connecter sur l'application</h3>
                  <p class="text"> Entrez votre mail et votre mot de passe </p> 
                  <input type="text" class="text" name="email" placeholder="email" v-model="email">
                  <input type="password" class="text" name="password" placeholder="mot de passe" v-model="password">
                  <div>
                     <button class="login-button" @click= "click">Je me connecte</button>
                     <span v-if="errorMsg"> {{ errorMsg }}</span>
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
         async click(e) {
            e.preventDefault();
            try {
               const response = await fetch('http://localhost:3001/api/user/login', 
               {  method: 'POST', 
                  headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json'
                  }, 
                  body: JSON.stringify({ email: this.email, password: this.password})
               })
               
               const userData = await response.json();
               const userToken = userData.token;

               if (response.status == 401) {
                  this.errorMsg = userData.error;
               } else {
                  console.log('Félicitation ! Vous êtes connecté !');
                  const tokenStored = localStorage.setItem('token', userToken);
               }
               this.$router.push({name: 'home'})
            } catch(error) {
               this.errorMsg = error.error;
            }
         }
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

.card{
   margin-bottom:20px;
   border:none;
}
.label-text{
   color:#ffd7d7;
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
.box h1 {
   color: #fff;
   font-weight: 500;
   border-bottom: solid 2px white;
   margin-bottom: 1em;
}

.box input[type="text"]:focus,
.box input[type="password"]:focus {
   width: 300px;
   border-color: #ff7d7d
}
input::placeholder{
   color: white;
}
.box input[type="submit"] {
   border: 0;
   background: none;
   display: block;
   margin: 20px auto;
   text-align: center;
   border: 2px solid #ff7d7d;
   padding: 14px 40px;
   outline: none;
   color: #fff;
   border-radius: 24px;
   transition: 0.25s;
   cursor: pointer
}

.text{
   color: #fff;
}
span {
   color: #fd2f01;
}
</style>