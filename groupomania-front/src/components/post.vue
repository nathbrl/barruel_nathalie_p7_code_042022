<template>
    <div class="d-flex justify-content-center row">
        <div class="col-md-8">
            <div class="d-flex flex-column comment-section">
                <div class="bg-white p-2">
                    <div class="d-flex flex-row user-info"><img class="rounded-circle" src="{{ post.profile_picture }}" alt="profil"
                            width="40">
                        <div class="d-flex flex-column justify-content-start ml-2">
                            <span class="d-block font-weight-bold name">{{ post.pseudo }}</span>
                        </div>
                        <div class="d-flex flex-column justify-content-start ml-2">
                            <span class="date text-black-50">{{ formatDate(post.created_at) }}</span>
                        </div>
                    </div>
                    <div class="mt-2">
                        <p class="comment-text">{{ post.content }}</p>
                    </div>
                    <div class="mt-2">
                        <img class="post-image" src="{{ post.image }}" alt="">{{ post.image }}
                    </div>
                </div>
                <div class="bg-white">
                    <div class="d-flex flex-row fs-12">
                        <div class="like p-2 cursor">
                            <i class="fa fa-thumbs-o-up"></i><span class="ml-1">Liker</span>
                        </div>
                        <div class="like p-2 cursor">
                            <i class="fa fa-heart"></i><span class="ml-1">0</span>
                        </div>
                        <div class="like p-2 cursor">
                            <i class="fa fa-trash"></i><span class="ml-1">Supprimer</span>
                        </div>
                        <div class="like p-2 cursor">
                            <i class="fa fa-pen"></i><span class="ml-1">Modifier</span>
                        </div>
                    </div>
                </div>
                <div class="bg-light p-2">
                    <div class="d-flex flex-row align-items-start"><img class="rounded-circle"
                            src="{{ post.profile_picture }}" alt="profil" width="40">
                        <textarea class="form-control-comment ml-1 shadow-none textarea"></textarea>
                    </div>
                    <div class="mt-2 text-right">
                        <button class="btn btn-primary btn-sm shadow-none" type="button">Ajouter un commentaire</button>
                    </div>
                    <div class="mt-2 text-right">
                        <button @click="loadComments(post.post_id)" class="btn btn-sm shadow-none" id="btn-comms"
                            type="button">Afficher les commentaires</button>
                    </div>
                    <div class="container mt-5 mb-5" v-for="comment in comments">
                    <comment :comment="comment"></comment>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getAuthenticationHeaders } from '../utils/utils'
import commentComponent from '../components/comments.vue'

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
    components: {
        comment: commentComponent
    },
    methods: {
        async loadComments(postId) {
            try {
                const headers = getAuthenticationHeaders();
                if (headers) {
                    const comments = await fetch(`http://localhost:3001/api/post/${postId}/comments`, {
                        method: 'GET',
                        headers
                    })
                    //console.log(comments);
                    this.comments = await comments.json();
                } else {
                    console.log("Vous n'avez pas accès à l'application, car vous n'êtes pas connecté");
                    comment.status(400).json({ message: 'Aucun post ne correspond à cet identifiant'});
                }
            } catch (error) {
                console.log(error);
            }
        },
        formatDate(date) {
            const myDate = new Date(date).toLocaleString('en-IN', { "year": "numeric", "month": "long", "day": "numeric" });
            return myDate
        }
    }
}
</script>