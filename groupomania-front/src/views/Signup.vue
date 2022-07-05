<template>
   <div class="container"> 
      <div class="row"> 
         <div class="col-md-6"> 
            <div class="card"> 
               <form action="post" class="box"> 
                  <h1>S'inscrire</h1> 
                  <label for="pseudo" class="text">Choisissez un pseudo</label>
                  <input type="text" name="pseudo" placeholder=" pseudo" v-model="pseudo">
                  <label for="email" class="text">Votre adresse mail</label>
                  <input type="text" name="email" placeholder="email" v-model="email">
                  <label for="pseudo" class="text">Choisissez un mot de passe</label>
                  <input type="password" name="password" placeholder="mot de passe" v-model="password">
                  <div>
                     <button class="signup-button" @click="click">Je m'inscris</button>
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
         pseudo: "",
         password: "",
         email: "",
         errorMsg: ""
      }
   },
   methods: {
      async click(e) {
         e.preventDefault()
         try {
            const response = await fetch('http://localhost:3001/api/user/signup', 
            {  method: 'POST',
               headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify({ pseudo: this.pseudo, password: this.password, email: this.email})
            })
            const userData = await response.json();
            console.log(userData);

            if (response.status == 400) {
               this.errorMsg = userData.message;
            } else {
               console.log('Félicitations votre compte a bien été créé');
               this.$router.push({name: 'login'})
            }
         } catch(error) {
            console.log(this.errorMsg = error);
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
.signup-button {
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
