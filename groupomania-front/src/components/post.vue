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
                        <div class="like p-2 cursor" id="like" @click="likePost(post)">
                            <a><i class="fa fa-thumbs-o-up"></i><span class="ml-1">Likes</span> {{ post.numberLikes }}<span class="ml-1, like-counter"></span></a>
                        </div>
                        <div class="like p-2 cursor">
                            <a @click="deletePost(post.post_id)"><i class="fa fa-trash"></i><span class="ml-1">Supprimer</span></a>
                        </div>
                        <div class="like p-2 cursor">
                            <a  @click="updatePost(post.post_id)" v-if="isUpdating == false"><i class="fa fa-pen"></i><span class="ml-1">Modification</span></a>
                            <form v-else method="PUT" enctype="multipart/form-data"> <!-- action="/images"-->
                                <textarea class="form-control" rows="2" v-model="newText.content" placeholder="Que souhaitez-vous partager aujourd'hui ?"></textarea>
                                <div class="mar-top">
                                    <input type="file" @change="selectFile" name="image" id="input-file">
                                    <button @click="postUpdated"><i class="fa fa-paper-plane"></i><span class="ml-1">Modifier</span></button>
                                </div>
                            </form>
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
            isUpdating: false,
            newText: {},
            newImage: {},
        }
    },
    methods: {
        formatDate(date) {
            const myDate = new Date(date).toLocaleString('en-IN', { "year": "numeric", "month": "long", "day": "numeric" });
            return myDate
        },
        async deletePost(postId) {
            try {
                const headers = getAuthenticationHeaders();
                const post = await fetch(`http://localhost:3001/api/post/${postId}`, {
                    method: 'DELETE',
                    headers: headers,
                })
                this.$emit("delete", postId);
            } catch (error) {
                console.log(error);
            }
        },
        selectFile() {
            this.newImage = event.target.files[0];
        },
        async updatePost(post) {
            this.isUpdating = !this.isUpdating;
        },
        async postUpdated(){
            debugger
            try {
                const headers = getAuthenticationHeaders();
                const postBody = JSON.stringify(this.newText);
                console.log(postBody);
                const postImage = this.newImage;
                console.log(postImage);
                
                if (headers) {
                    const formData = new FormData();
                    formData.append('document', postBody);

                    if(postImage) {
                        formData.append('image', postImage);
                        const post = await fetch(`http://localhost:3001/api/post/${postId}`, {
                            method: 'PUT',
                            headers: headers,
                            body: formData,
                        });
                        console.log(post);
                        this.posts.unshift(await post.json());
                        alert('Post modifié avec succès');

                    } else {
                        const post = await fetch(`http://localhost:3001/api/post/${postId}`, {
                            method: 'PUT',
                            headers: headers,
                            body: formData.postBody,
                        });
                        console.log(post);
                        this.posts.unshift(await post.json());
                        alert('Post modifié avec succès');
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        async likePost (post) {
            const headers = getAuthenticationHeaders();
            const like = await fetch(`http://localhost:3001/api/post/${post.post_id}/like`, {
                    method: 'POST',
                    headers: headers,
                    body: ""
                });
                const likes = await like.json();

                post.numberLikes = likes.likes;
        }
    }
}
</script>

<style>
</style>