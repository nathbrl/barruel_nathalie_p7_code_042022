<template>
   <div class="container">
      <div class="col-md-12">
         <div class="panel">
            <div class="panel-body">
               <h2>Exprimez-vous !</h2>
               <form method="POST" action="/images" enctype="multipart/form-data">
                  <textarea class="form-control" rows="2" v-model="post.content"
                     placeholder="Que souhaitez-vous partager aujourd'hui ?"></textarea>
                  <div class="mar-top">
                     <input type="file" @change="selectFile" name="image" id="input-file" ref="file">
                     <a href="#" @click="createPost ($event)"><i class="fa fa-paper-plane"></i><span
                           class="ml-1">Publier</span></a>
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
import { toRaw } from 'vue'

export default {
   async mounted() {
      // DISPLAY ALL POSTS
      try {
         const headers = getAuthenticationHeaders();
         if (headers) {
            const posts = await fetch("http://localhost:3001/api/posts/", {
               method: 'GET',
               headers
            });
            this.posts = await posts.json();
         }
      } catch (error) {
         console.log(error);
      }
   },
   data() {
      return {
         posts: [],
         post: {},
         image: {},
      }
   },
   components: {
      post: PostComponent,
   },
   emits: ['isLogged'],
   methods: {
      deletePost(postId) {
         this.posts = toRaw(this.posts).filter((post) => {
            return post.post_id !== postId
         })
      },
      selectFile() {
         this.image = event.target.files[0];
      },
      async createPost(e) {
         e.preventDefault();
         try {
            const headers = getAuthenticationHeaders();
            const postBody = JSON.stringify(this.post);
            const postImage = this.image;
            const inputFile = this.$refs;

            if (headers) {
               const formData = new FormData();
               formData.append('document', postBody);
               if (postImage) {
                  formData.append('image', postImage);
                  const newPost = await fetch("http://localhost:3001/api/posts",
                     {
                        method: "POST",
                        headers,
                        body: formData
                     });
                  const postData = await newPost.json();
                  if (newPost.status == 400) {
                     alert(postData.message);
                  } else {
                     this.posts.unshift(postData);
                     alert('Nouveau post crée avec succès');
                     this.post = {};
                     inputFile.file.value = '';
                  }
               } else {
                  const newPost = await fetch("http://localhost:3001/api/posts",
                     {
                        method: "POST",
                        headers,
                        body: formData.postBody
                     });
                  const postData = await newPost.json();
                  if (newPost.status == 400) {
                     alert(postData.message);
                  } else {
                     this.posts.unshift(postData);
                     alert('Nouveau post crée avec succès');
                     this.post = {};
                  }
               }
            }
         } catch (error) {
            console.log(error);
         }
      }
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
   max-width: 800px;
   box-shadow: 4px 4px 8px #e1e1e1;
   margin: 20px 0px;
   border-radius: 20px;
   border: solid 1px #ffd7d7;
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

.text-right button:hover {
   background-color: #fd2d01;
   color: white;
}

.fa {
   padding-right: 5px;
   color: #fd2d01;
}

.fs-12 {
   display: flex;
   justify-content: space-evenly;
   margin-top: 20px;
}

.user-info {
   display: flex;
   justify-content: space-between;
}

.name {
   color: #4e5166;
   font-weight: 600;
   font-size: 18px;
}

.cursor {
   cursor: pointer
}

.form-control {
   min-width: 80%;
   width: 90%;
   height: 80px;
   min-height: 50px;
   border-color: #4e5166;
   border-radius: 20px;
   padding: 10px;
   border: solid 1px lightgrey;
}

.mar-top {
   display: flex;
   justify-content: flex-start;
   padding: 10px 0px;
}

#input-file {
   color: #fd2d01;
}

.like-counter {
   margin-left: 5px;
   color: #ffd7d7;
   font-weight: 600;
}
</style>