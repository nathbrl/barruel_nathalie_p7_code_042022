<template>
    <div class="container">
        <div class="col-md-12">
            <div class="panel">
                <div class="panel-body">
                    <h2>Exprimez-vous !</h2>
                    <textarea class="form-control" rows="2" placeholder="Que souhaitez-vous partager aujourd'hui ?"></textarea>
                    <div class="mar-top">
                        <input type="file" name="" id="input-file">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container mt-5">
        <div class="d-flex justify-content-center row">
            <div class="col-md-8">
                <div class="d-flex flex-column comment-section">
                    <div class="bg-white p-2">
                        <div class="d-flex flex-row user-info"><img class="rounded-circle"
                                src="https://i.imgur.com/RpzrMR2.jpg" width="40">
                            <div class="d-flex flex-column justify-content-start ml-2">
                                <span class="d-block font-weight-bold name">Prénom Nom</span>
                            </div>
                            <div class="d-flex flex-column justify-content-start ml-2">
                                <span class="date text-black-50">Publié le 21 juin 2022</span>
                            </div>
                        </div>
                        <div class="mt-2">
                            <p class="comment-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat.</p>
                        </div>
                    </div>
                    <div class="bg-white">
                        <div class="d-flex flex-row fs-12">
                            <div class="like p-2 cursor">
                                <i class="fa fa-thumbs-o-up"></i><span class="ml-1">Like</span>
                            </div>
                            <div class="like p-2 cursor"><i class="fa fa-commenting-o"></i><span
                                    class="ml-1">Comment</span>
                            </div>
                        </div>
                    </div>
                    <div class="bg-light p-2">
                        <div class="d-flex flex-row align-items-start"><img class="rounded-circle"
                                src="https://i.imgur.com/RpzrMR2.jpg" width="40">
                            <textarea class="form-control-comment ml-1 shadow-none textarea"></textarea>
                        </div>
                        <div class="mt-2 text-right">
                            <button class="btn btn-primary btn-sm shadow-none" type="button">Commenter</button>
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

body {
    background: #f7f7f7;
}
.container {
    background: white;
    padding: 30px;
    max-width: 700px;
    box-shadow: 4px 4px 8px #e1e1e1;
    margin: 20px 0px;
    border-radius: 20px;
}

.bg-light {
    background: whitesmoke;
    padding: 20px;
    box-shadow: 4px 4px 8px #d3d3d3;
    border-radius: 20px;
    margin: 20px 0px;
}

.rounded-circle{
    width: 90px;
    height: 90px;
    border-radius: 50%;
    border: solid 1px #fd2d01;
}

.text-right {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}

.text-right button {
    padding: 10px;
    background-color: #fd2d01;
    color: white;
    border: none;
    border-radius: 15px;
    cursor: pointer;
}

.date {
    font-size: 12px
}

.comment-text, .fs-12 {
    font-size: 14px
}

.fa {
    padding-right: 5px;
}

.fs-12{
    display: flex;
    justify-content: space-around;
}

.name {
    color: #4e5166;
    font-weight: 600;
    font-size: 18px;
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
    
    border-radius: 20px;
}
.form-control  {
    min-width: 80%;
    width: 90%;
    height: 80px;
    min-height: 50px;
    border-color: #4e5166;
    border-radius: 20px;
    padding: 10px;
}
.mar-top{
    display: flex;
    justify-content: flex-start;
    padding: 10px 0px;
}
#input-file {
    color: #fd2d01;
}
</style>