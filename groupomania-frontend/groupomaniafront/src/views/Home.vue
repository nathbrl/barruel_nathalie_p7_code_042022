<template>
    <div class="container px-4 py-5 mx-auto">
        <div class="row d-flex justify-content-center">
            <div class="card">
                <div class="row px-3">
                    <img class="profile-pic mr-3"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png"
                        al="user-avatar">
                    <h3 class="mb-0 font-weight-normal">Prénom Nom</h3>
                </div>
                <div class="row px-3 form-group">
                    <textarea class="text-muted bg-light mt-4 mb-3"
                        placeholder="Que souhaitez-vous partager avec vos collègues?"></textarea>
                </div>
                <div class="row px-3">
                    <p class="fa fa-image options mb-0 mr-4"></p>
                    <button>Publier</button>
                </div>
                <div class="container mt-3 d-flex justify-content-center">

                    <div class="row d-flex justify-content-center">

                        <div class="card-comment p-3 mb-2">

                            <div class="d-flex flex-row">
                                <img src="https://i.imgur.com/dwiGgJr.jpg" height="40" width="40"
                                    class="rounded-circle">
                                <div class="d-flex flex-column ms-2">
                                    <h6 class="mb-1 text-primary">Emma</h6>
                                <div class="d-flex flex-row">
                                    <span class="text-muted fw-normal fs-10">May 22,2020 12:10 PM</span>
                                </div>
                                    <p class="comment-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                        lectus
                                        nibh, efficitur in bibendum id, pellentesque quis nibh. Ut dictum facilisis dui,
                                        non
                                        faucibus dolor sit amet lorem auctor vitae. Class aptent taciti sociosqu ad
                                        litora
                                        torquent per conubia nostra, per inceptos himenaeos. Quisque risus mauris</p>
                                </div>
                            </div>

                            <div class="d-flex justify-content-between">
                                <div class="d-flex flex-row gap-3 align-items-center">
                                    <div class="d-flex align-items-center">
                                        <i class="fa fa-heart-o"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

div.card {
    border-radius: 10px;
    width: 500px;
    padding: 20px;
    margin-top: 50px;
    margin-bottom: 50px;
    background-color: #e7e7e7;
}

.profile-pic {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: contain;
    background-color: #E0E0E0;
    margin-right: 20px;
}

div.row.px-3, h3.mb-0{
    margin-bottom: 30px;
    display: flex;
    color:#4e5166;
}

textarea {
    padding: 15px 20px;
    border-radius: 10px;
    box-sizing: border-box;
    color: #616161;
    border: 1px solid #F5F5F5;
    font-size: 16px;
    letter-spacing: 1px;
    height: 120px !important;
    width: 100%;
}

textarea:focus {
    -moz-box-shadow: none !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    border: 1px solid #00C853 !important;
    outline-width: 0 !important;
}

select {
    border: none;
    font-size: 15px;
    background-color: #fff !important;
}

select:focus {
    -moz-box-shadow: none !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    outline-width: 0 !important;
}
button {
   border: 0;
   background: none;
   display: block;
   margin: 20px auto;
   text-align: center;
   border: 2px solid #44ff44;
   padding: 10px 10px;
   width: 150px;
   outline: none;
   color: #4e5166;
   border-radius: 24px;
   transition: 0.25s
}

::placeholder {
    color: #BDBDBD;
}

:-ms-input-placeholder {
    color: #BDBDBD;
}

::-ms-input-placeholder {
    color: #BDBDBD;
}

.btn-success {
    border-radius: 50px;
    padding: 4px 40px;
} 

.options {
    font-size: 23px;
    color: #757575;
    cursor: pointer;
}

.options:hover {
    color: #4e5166;
}
/**COMMENT SECTION */
.card-comment{
    border:none;
    -webkit-box-shadow: 0 2px 3px rgba(0, 0, 0, 0.03);
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.03);
    background-color: white;
    padding: 20px;
}

.comment-text{
    font-size:12px;
}

.fs-10{
    font-size:12px;
    
}
</style>