<template>
    <div class="d-flex justify-content-center row">
        <div class="col-md-8">
            <div class="d-flex flex-column">
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
                        <p>{{ post.content }}</p>
                    </div>
                    <div class="mt-2 d-flex">
                        <img class="post-image " :src="post.image" alt="" v-if="post.image">
                    </div>
                </div>
                <div class="bg-white">
                    <div class="d-flex flex-row fs-12">
                        <div class="like p-2 cursor" id="like" @click="likePost(post)">
                            <a><i class="fa fa-thumbs-o-up"></i><span class="ml-1">Likes</span> {{ post.numberLikes
                            }}<span class="ml-1, like-counter"></span></a>
                        </div>
                        <div class="like p-2 cursor">
                            <a @click="deletePost(post.post_id)" v-if="post.user_id == user.userId || user.admin"><i
                                    class="fa fa-trash"></i><span class="ml-1">Supprimer</span></a>
                        </div>
                        <div class="like p-2 cursor">
                            <a @click="updatePost(post.post_id, post)"
                                v-if="isUpdating == false && (post.user_id == user.userId || user.admin)"><i
                                    class="fa fa-pen"></i><span class="ml-1">Modification</span></a>
                            <form v-if="isUpdating == true" method="PUT" enctype="multipart/form-data">
                                <textarea class="form-control" rows="2" v-model="newText.content"
                                    placeholder="Que souhaitez-vous partager aujourd'hui ?"></textarea>
                                <div class="mar-top">
                                    <input type="file" @change="selectFile" name="image" id="input-file">
                                    <button @click="postUpdated(post, $event)"><i class="fa fa-paper-plane"></i> <span
                                            class="ml-1">Modifier</span></button>
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
import { getUser } from '../utils/utils'

export default {
    props: {
        post: Object
    },
    data() {
        return {
            isUpdating: false,
            newText: {},
            newImage: {},
            errorMsg: "",
            user: {},
        }
    },
    async mounted() {
        const user = getUser();
        this.user = user;
    },
    methods: {
        formatDate(date) {
            const myDate = new Date(date).toLocaleString('en-IN', { "year": "numeric", "month": "long", "day": "numeric" });
            return myDate
        },
        async deletePost(postId) {
            try {
                const headers = getAuthenticationHeaders();

                const post = await fetch(`http://localhost:3001/api/posts/${postId}`, {
                    method: 'DELETE',
                    headers: headers,
                })
                const userData = await post.json();
                this.errorMsg = userData.message;

                if (post.status == 401) {
                    alert(this.errorMsg);
                } else {
                    this.$emit("delete", postId);
                    alert(this.errorMsg);
                }
            } catch (error) {
                console.log(error);
            }
        },
        selectFile() {
            this.newImage = event.target.files[0];
        },
        async updatePost(postId) {
            this.isUpdating = !this.isUpdating;
        },
        async postUpdated(post, e) {
            e.preventDefault();
            try {
                const headers = getAuthenticationHeaders();
                const postBody = JSON.stringify(this.newText);
                const postImage = this.newImage;
                if (headers) {
                    const formData = new FormData();
                    formData.append('document', postBody);
                    if (postImage) {
                        formData.append('image', postImage);
                        const post = await fetch(`http://localhost:3001/api/posts/${this.post.post_id}`,
                            {
                                method: 'PUT',
                                headers: headers,
                                body: formData,
                            });
                        const postData = await post.json();
                        this.post.content = this.newText.content;
                        this.post.image = postData.image;
                        this.updatePost();
                        this.errorMsg = postData.message;
                        if (post.status == 401) {
                            alert(this.errorMsg);
                        } else {
                            alert(this.errorMsg);
                        }
                    } else {
                        const post = await fetch(`http://localhost:3001/api/posts/${this.post.post_id}`, {
                            method: 'PUT',
                            headers: headers,
                            body: formData.postBody,
                        });
                        const postData = await post.json();
                        this.post.content = this.newText.content;
                        this.post.image = postData.image;
                        this.updatePost();
                        this.errorMsg = postData.message;
                        if (post.status == 401) {
                            alert(this.errorMsg = postData.message);
                        } else {
                            alert(this.errorMsg = postData.message);
                        }
                    }
                } else {
                    console.log(this.errorMsg);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async likePost(post) {
            const headers = getAuthenticationHeaders();
            const like = await fetch(`http://localhost:3001/api/posts/${post.post_id}/like`, {
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