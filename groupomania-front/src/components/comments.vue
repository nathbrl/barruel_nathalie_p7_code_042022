<template>
    <div class="row height d-flex justify-content-center align-items-center">
        <div class="col-md-7">
            <div class="card">
                <div class="d-flex flex-row p-3" id="comment-card"> <img src="" width="40" height="40"
                        class="rounded-circle mr-3" id="image-comment">
                    <div class="w-100">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex flex-row align-items-center"> <span class="mr-2">{{comment.pseudo}}</span></div>
                            <small>{{ formatDate(comment.created_at) }}</small>
                        </div>
                        <p class="text-justify comment-text mb-0">{{ comment.content }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        comment: Object
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
        }
    }
}
</script>