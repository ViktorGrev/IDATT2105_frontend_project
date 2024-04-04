<script setup lang="ts">
import axios from 'axios';

const showDatabase = async () => {
    let username = "Viktor";
    const response = await axios.post('http://localhost:8080/api/data', username);
    console.log(response.data.message.username);
    console.log(response.data.message.password);
}
</script>

<template>
    <main>
        <div class="wrapper">
            <div class="contentBox">
                <div class="col-md-9">
                    <div class="container content clear-fix">
                        <h2 class="mt-5 mb-5">Profile Settings</h2>
                        <div class="row" style="height:100%">
                            <div class="col-md-3">
                                <!-- Fixed incorrect usage of href=# by moving it to the a tag where it's supposed to be -->
                                <div class="d-inline">
                                    <img src="../assets/profile-circle.svg" width="200px" style="margin:0;"><br>
                                    <p class="pl-2 mt-2">
                                        <a href="#" class="btn" style="color:#8f9096;font-weight:600">Edit Picture</a>
                                    </p>
                                </div>
                            </div>
                            <div class="col-md-9">
                                <div class="container">
                                    <form>
                                        <div class="form-group">
                                            <label for="fullName">Edit Username:</label>
                                            <input type="text" class="form-control" id="fullName">
                                        </div>
                                        <button type="button" class="btn btn-primary btn-block">Save Changes</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
.wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.contentBox {
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 3rem;
}

.row {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

h2 {
    font-weight: bolder;
    color: #898dbf;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 3rem;
}

form {
    width: 550px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

form * {
    font-weight: bold;
}

form label {
    font-size: 1.5rem;
    color: #8f9096;
}

form .form-control,
form .form-control:focus {
    border-color: transparent;
    border-bottom-color: #bebcc1;
    box-shadow: none;
    background: #edeff4;
    height: 1.5rem;
}

form .btn {
    border-radius: 0px;
    border-color: transparent;
    font-size: 1.5rem;
}

p {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}


.btn.btn-default {
    background: #ebebeb;
    color: #8f9096;
    cursor: pointer;
}

.btn.btn-primary {
    margin: 1rem;
    background: rgb(22, 144, 248);
    color: white;
    cursor: pointer;
}

.btn.btn-primary:hover {
    border: 2px solid rgb(0, 0, 0);
}

.btn.btn-primary:active {
    border-bottom: 5px solid rgb(0, 0, 0);
    border-right: 5px solid rgb(0, 0, 0);
}

@media screen and (max-width:768px) {
    .content {
        padding-left: 50px;
        width: 100%;
        padding-top: 200px;
        padding-bottom: 50px;
    }

    form {
        width: 100%;
        margin: auto;
    }

}
</style>
