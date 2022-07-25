<template>
    <div class="d-flex justify-content-center row">
        <div class="col-md-8">
            <div class="d-flex flex-column comment-section">
                <div class="bg-white p-2">
                    <div class="d-flex flex-row user-info">
                        <div class="d-flex flex-column justify-content-start ml-2">
                            <span class="d-block font-weight-bold name">Publié par: {{ post.pseudo }}</span>
                        </div>
                        <div class="d-flex flex-column justify-content-start ml-2">
                            <span class="date text-black-50">{{ formatDate(post.created_at) }}</span>
                        </div>
                    </div>
                    <div class="mt-2">
                        <p class="comment-text">{{ post.content }}</p>
                    </div>
                    <div class="mt-2">
                        <img class="post-image" :src="post.image" alt="">
                    </div>
                </div>
                <div class="bg-white">
                    <div class="d-flex flex-row fs-12">
                        <div class="like p-2 cursor" id="like" @click="likePost(post.post_id)">
                            <a><i class="fa fa-thumbs-o-up"></i><span class="ml-1">Likes</span><span class="ml-1, like-counter">0</span></a>
                        </div>
                        <div class="like p-2 cursor">
                            <a @click="deletePost(post.post_id)"><i class="fa fa-trash"></i><span class="ml-1">Supprimer</span></a>
                        </div>
                        <div class="like p-2 cursor" @click="updatePost(post.post_id)">
                            <a><i class="fa fa-pen"></i><span class="ml-1">Modifier</span></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getAuthenticationHeaders } from '../utils/utils'

export default {
    props: {
        post: Object
    },
    data() {
        return {
            comments: [
                {
                    content: "",
                    created_at: "",
                    updated_at: "",
                    post_id: "",
                    user_id: "",
                }
            ],
        }
    },
    methods: {
        formatDate(date) {
            const myDate = new Date(date).toLocaleString('en-IN', { "year": "numeric", "month": "long", "day": "numeric" });
            return myDate
        },
        async deletePost(postId) {
            console.log(postId);
            try {
                const headers = getAuthenticationHeaders();
                const post = await fetch(`http://localhost:3001/api/post/${postId}`, {
                    method: 'DELETE',
                    headers: headers,
                })
                this.$emit("delete", postId);//envoie un évent vers le parent
                console.log(post);
            } catch (error) {
                console.log(error);
            }
        },
        async updatePost(postId) {
            console.log(postId);
            try {
                //éléments à modifier
                console.log(document.querySelector('.comment-text'));
                console.log(document.querySelector('.mt-2 img'));
                console.log(document.querySelector('.date'));

                let text = document.querySelector('.comment-text');
                let image = document.querySelector('.mt-2 img');
                let date = document.querySelector('.date');

                const headers = getAuthenticationHeaders();
                const post = await fetch(`http://localhost:3001/api/post/${postId}`, {
                    method: 'PUT',
                    headers: headers,
                    body: ""
                })
                console.log(post);
            } catch (error) {
                console.log(error);
            }
            
        console.log(updatePost());
        },
        async likePost(postId) {
            console.log(postId);
            let like = document.querySelector('#like');
            let likeCounter = document.querySelector('.like-counter').innerHTML;
            like.addEventListener('click', (e) => {
                likeCounter++;
                console.log(likeCounter);
            })
            console.log(like);
        }
    }
}
</script>

<style>
</style>