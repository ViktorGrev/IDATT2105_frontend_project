<script setup lang="ts">

import {getSelf, changeUsername} from "@/api/UserController";
import {onMounted, ref} from "vue";
import { useUserInfoStore } from '@/stores/UserStore';

let username = ref("");
let usernameError = ref("");
let usernameResponse = ref("");
const userName = ref("");
const userStore = useUserInfoStore();

onMounted(() => {
  getSelf().then(response => {
    username.value = response.data.username;
    userName.value = useUserInfoStore().username;
  }).catch(error => {

  });
});

const showDatabase = async () => {
    changeUsername(username.value).then(response => {
      usernameError.value = "";
      userStore.setUsername(username.value);
      userName.value = useUserInfoStore().username;
      usernameResponse.value = "Username has been updated!";
    }).catch(error => {
      usernameError.value = error.response.data.message;
      usernameResponse.value = "";
    });
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
                                <div class="d-inline">
                                    <img src="@/assets/default_profile.svg" width="200px" style="margin:0;"><br>
                                </div>
                            </div>
                            <div class="col-md-9">
                                <div class="container">
                                    <p>{{ userName }}</p>
                                  <div class="d-flex align-items-center">
                                    <textarea v-model="username" style="margin-right: 1rem;" data-testid="username-textarea"></textarea>
                                    <button @click="showDatabase" type="button" class="blueButton">Update</button>
                                  </div>
                                    <p style="color: red">{{usernameError}}</p>
                                    <p style="color: green">{{usernameResponse}}</p>
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
.blueButton {
  padding: 1rem 1rem;
  background: rgb(22, 144, 248);
  border: none;
  border-color: #d9dde8;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  border-bottom: 5px solid #58638063;
  border-radius: .5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 1rem;
}

.blueButton:hover {
  padding: 1rem 1rem;
  background: rgb(30, 150, 253);
  border: none;
  border-color: #d9dde8;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  border-bottom: 5px solid #58638063;
  border-radius: .5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 1rem;
}

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
