<template>
   <div class="container">
      <div class="col-md-12">
         <div class="panel">
            <div class="panel-body">
               <h2>Exprimez-vous !</h2>
               <form method="POST" action="/images" enctype="multipart/form-data">
                  <textarea class="form-control" rows="2" v-model="post.content" placeholder="Que souhaitez-vous partager aujourd'hui ?"></textarea>
                  <div class="mar-top">
                     <input type="file" @change="selectFile" name="image" id="input-file">
                     <a href="#" @click="createPost"><i class="fa fa-paper-plane"></i><span class="ml-1">Publier</span></a>
                  </div>
               </form>
            </div>
         </div>
      </div>
   </div>
   <div class="container mt-5" v-for="post in posts">
      <post :post="post" @delete="deletePost"></post>
   </div>
</template>

<script>
import { getAuthenticationHeaders } from '../utils/utils'
import PostComponent from '../components/post.vue'
import {toRaw} from 'vue'

export default {
   async mounted() {
      // POSTS
      try {
         const headers = getAuthenticationHeaders();
         if (headers) {
            const posts = await fetch("http://localhost:3001/api/post/", {
               method: 'GET',
               headers
            });
            this.posts = await posts.json();
         } else {
            console.log("Vous n'avez pas accès à l'application, car vous n'êtes pas connecté");
         }
      } catch (error) {
         console.log(error);
      }
   },
   data() {
      return {
         posts: [
            {
               content: "",
               image: "",
               created_at: "",
               updated_at: "",
               likes: ""
            }
         ],
         post: {},
         image: {},
      }
   },
   components: {
      post: PostComponent,
   },
   methods: {
      async getPosts() {
      },
      async createPost(){
         try {
            const headers = getAuthenticationHeaders();
            const postBody = JSON.stringify(this.post);
            const postImage = this.image;
            debugger
            if (headers) {
               const formData = new FormData();
               formData.append('document', postBody);
               if(postImage) {
                  formData.append('image', postImage);
                  console.log(formData.postImage);
                  const newPost = await fetch("http://localhost:3001/api/post", 
                  {  method: "POST",
                     headers,
                     body: formData
                  });
                  this.posts.unshift(await newPost.json());

               } else {
                  console.log(postImage);
                  const newPost = await fetch("http://localhost:3001/api/post", 
                  {  method: "POST",
                     headers,
                     body: formData.postBody
                  });
                  console.log(formData.postBody);
                  this.posts.unshift(await newPost.json());
               }
            }
         } catch (error) {
            console.log(error);
         }
      },
      deletePost(postId){
         
         this.posts = toRaw(this.posts).filter((post) => { 
         return post.post_id !== postId})
      },
      /*async createPostWithNoImage(){
         try {
            const headers = getAuthenticationHeaders();
            const postBody = JSON.stringify(this.post);
            
            if (headers) {
               const formData = new FormData();
               formData.append('document', postBody);

               if(formData) {
                  const newPost = await fetch("http://localhost:3001/api/post", 
                  {  method: "POST",
                     headers,
                     body: formData
                  });

                  console.log(newPost);
                  this.posts.unshift(await newPost.json());
               }
            }
         } catch (error) {
            console.log(error);
         }
      },*/
      selectFile() {
         this.image = event.target.files[0];
      },
   }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');


body {
   background: #f7f7f7;
}

.container {
   background: white;
   padding: 15px;
   max-width: 700px;
   box-shadow: 4px 4px 8px #e1e1e1;
   margin: 20px 0px;
   border-radius: 20px;
   border: solid 1px #ffd7d7;
}

.bg-light {
   background: #fcfcfc;
   padding: 20px;
   border: 1px solid whitesmoke;
   border-radius: 20px;
   margin: 20px 0px;
}
.post-image{
   width: 630px;
   margin: 0 auto;
}
.text-right {
   display: flex;
   justify-content: center;
   margin-top: 10px;
}
span {
   color: #4e5166;
}

.text-right button {
   padding: 10px;
   background-color: #4e5166;
   color: white;
   border: none;
   border-radius: 15px;
   cursor: pointer;
}

.text-right button:hover, #btn-comms:hover{
   background-color: #fd2d01;
   color: white;
}

.fa {
   padding-right: 5px;
   color: #fd2d01;
}

#comment-card{
   display: flex;
}

#image-comment{
   margin-right: 5em;
   width: 50px;
   height: 50px;
}

.fs-12{
   display: flex;
   justify-content: space-evenly;
   margin-top: 20px;
}

.user-info{
   display: flex;
   justify-content: space-between;
}

.name {
   color: #4e5166;
   font-weight: 600;
   font-size: 18px;
}

#btn-comms {
   background-color: #ffd7d7;
   color:#4e5166;
}

.cursor {
   cursor: pointer
}

.form-control-comment {
   min-width: 300px;
   margin: 0 30px;
   width: 450px;
   height: 80px;
   border-color: #4e5166;
   padding: 20px;
   border-radius: 20px;
   border: solid 1px lightgrey;
}

.form-control  {
   min-width: 80%;
   width: 90%;
   height: 80px;
   min-height: 50px;
   border-color: #4e5166;
   border-radius: 20px;
   padding: 10px;
   border: solid 1px lightgrey;
}

.mar-top{
   display: flex;
   justify-content: flex-start;
   padding: 10px 0px;
}

#input-file {
   color: #fd2d01;
}
.like-counter{
   margin-left: 5px;
   color: #fd2d01;
   font-weight: 600;
}
</style>