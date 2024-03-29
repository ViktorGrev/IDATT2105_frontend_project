<template>
  <div id="box">
    <div id="box1" class="splitt">
      <div>
        <div class="textBox">
          <p><strong>Login to Your Account</strong><br>Login to your account so you can continue...<br>and editing your
            onboarding flows</p>
        </div>
        <form @submit.prevent="attemptLogin" novalidate>
          <div class="omrs-input-group">
            <label class="omrs-input-underlined">
              <input v-model="username" required oninvalid="this.setCustomValidity('Please enter your username')"
                oninput="this.setCustomValidity('')">
              <span class="omrs-input-label">Username</span>
              <span class="omrs-input-helper" :style="{ 'color': alertColor }">{{ usernameError }}</span>
            </label>
          </div>
          <div class="omrs-input-group">
            <label class="omrs-input-underlined">
              <input v-model="password" required type="password"
                oninvalid="this.setCustomValidity('Please enter your password')" oninput="this.setCustomValidity('')">
              <span class="omrs-input-label">Password</span>
              <span class="omrs-input-helper" :style="{ 'color': alertColor }">{{ passwordError }}</span>
            </label>
          </div>
          <div class="buttonHolder">
            <button type="submit">
              LOGIN
              <div class="arrow-wrapper">
                <div class="arrow"></div>
              </div>
            </button>
            <p id="loginText">Don't have an Account Yet? <a id="loginLink" @click="redirectToPage">Sign up</a></p>
          </div>
        </form>
      </div>
    </div>
    <div class="splitt" id="box2">
      <img src="../assets/logo1.png" width="100%" height="55%">
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');

const alertColor = ref("red"); // Initialize dynamicColor with ref and default color
const usernameError = ref("");
const passwordError = ref("");

const attemptLogin = async () => {
  if (username.value === "" || password.value === "") {
    console.log("Hallo");
    if (username.value === "") { usernameError.value = "Username is empty"; } else { usernameError.value = "";}
    if (password.value === "") { passwordError.value = "Password is empty"; } else { passwordError.value = "";}
  }
  else {
      await login();
  }

};

const login = async () => {
  try {
    const response = await axios.post('http://localhost:8080/api/auth/login', {
      username: username.value,
      password: password.value
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.data && response.data.token) {
      sessionStorage.setItem('userToken', response.data.token);
      router.push({ name: 'home' });
    } else {
      console.error('Login failed: No token received');
    }
  } catch (error) {
    passwordError.value = error.response.data.message;
    console.log('Login error:', error.response.data.message);
  }
};

const redirectToPage = () => {
  router.push({ name: 'signup' });
};
</script>


<style scoped>
* {
  font-family: 'Segoe UI', sans-serif;
}

.html,
body {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: rosybrown;
}

#box {
  flex-direction: row;
  display: flex;
  width: 65%;
  height: 80vh;
  border-style: solid;
  border-width: 2px;
  border-color: rgba(19, 19, 21, 0.6);
  box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.3);
  background-color: white;
}

.splitt {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 100%;
}

#box2 {
  background-color: rgb(22, 144, 248);
  border-bottom-left-radius: 300px 350px;
}

.textBox {
  align-items: center;
  justify-content: center;
  display: flex;
  text-align: center;
  font-size: 13px;
  margin-bottom: 40px;
  line-height: 25px;
}

strong {
  font-size: 26px;
}

div.container {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  margin-top: 30px;
  border: 1px solid whitesmoke;
  padding: 21px;
  border-radius: 4px;
}

h4.title {
  text-align: center;
  margin-bottom: 45px;
}

.buttonHolder {
  display: flex;
  flex-direction: row;
}

#loginText {
  margin-left: 10px;
}

#loginLink {
  color: blue;
  cursor: pointer;
}

:root {
  --omrs-color-ink-lowest-contrast: rgba(47, 60, 85, 0.18);
  --omrs-color-ink-low-contrast: rgba(60, 60, 67, 0.3);
  --omrs-color-ink-medium-contrast: rgba(19, 19, 21, 0.6);
  --omrs-color-interaction: #1e4bd1;
  --omrs-color-interaction-minus-two: rgba(73, 133, 224, 0.12);
  --omrs-color-danger: #1e4bd1;
  --omrs-color-bg-low-contrast: #eff1f2;
  --omrs-color-ink-high-contrast: #121212;
  --omrs-color-bg-high-contrast: #ffffff;

}

/** END: Non Openmrs CSS **/
div.omrs-input-group {
  margin-bottom: 1.5rem;
  position: relative;
  width: 20.4375rem;
}

/* Input*/
.omrs-input-underlined>input,
.omrs-input-filled>input {
  border: none;
  border-bottom: 0.125rem solid rgba(19, 19, 21, 0.6);
  width: 100%;
  height: 2rem;
  font-size: 1.0625rem;
  padding-left: 0.875rem;
  line-height: 147.6%;
  padding-top: 0.825rem;
  padding-bottom: 0.5rem;
}

.omrs-input-underlined>input:focus,
.omrs-input-filled>input:focus {
  outline: none;
}

.omrs-input-underlined>.omrs-input-label,
.omrs-input-filled>.omrs-input-label {
  position: absolute;
  top: 0.9375rem;
  left: 0.875rem;
  line-height: 147.6%;
  color: rgba(19, 19, 21, 0.6);
  transition: top .2s;
}

.omrs-input-underlined>svg,
.omrs-input-filled>svg {
  position: absolute;
  top: 0.9375rem;
  right: 0.875rem;
  fill: rgba(19, 19, 21, 0.6);
}

.omrs-input-underlined>.omrs-input-helper,
.omrs-input-filled>.omrs-input-helper {
  font-size: 0.9375rem;
  color: rgba(19, 19, 21, 0.6);
  letter-spacing: 0.0275rem;
  margin: 0.125rem 0.875rem;
}

.omrs-input-underlined>input:hover,
.omrs-input-filled>input:hover {
  background: rgba(73, 133, 224, 0.12);
  border-color: #121212;
}

.omrs-input-underlined>input:focus+.omrs-input-label,
.omrs-input-underlined>input:valid+.omrs-input-label,
.omrs-input-filled>input:focus+.omrs-input-label,
.omrs-input-filled>input:valid+.omrs-input-label {
  top: 0;
  font-size: 0.9375rem;
  margin-bottom: 32px;
  ;
}

.omrs-input-underlined:not(.omrs-input-danger)>input:focus+.omrs-input-label,
.omrs-input-filled:not(.omrs-input-danger)>input:focus+.omrs-input-label {
  color: #1e4bd1;
}

.omrs-input-underlined:not(.omrs-input-danger)>input:focus,
.omrs-input-filled:not(.omrs-input-danger)>input:focus {
  border-color: #1e4bd1;
}

.omrs-input-underlined:not(.omrs-input-danger)>input:focus~svg,
.omrs-input-filled:not(.omrs-input-danger)>input:focus~svg {
  fill: #121212;
}

.omrs-input-label:hover {
  cursor: text;
}

/** Button */

button {
  --primary-color: rgb(22, 144, 248);
  --secondary-color: #fff;
  --hover-color: #111;
  --arrow-width: 10px;
  --arrow-stroke: 2px;
  box-sizing: border-box;
  border: 0;
  border-radius: 20px;
  color: var(--secondary-color);
  padding: 1em 1.8em;
  background: var(--primary-color);
  display: flex;
  transition: 0.2s background;
  align-items: center;
  gap: 0.6em;
  font-weight: bold;
}

button .arrow-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

button .arrow {
  --arrow-width: 10px;
  --arrow-stroke: 2px;
  --primary-color: rgb(22, 144, 248);
  margin-top: 1px;
  width: var(--arrow-width);
  background: var(--primary-color);
  height: var(--arrow-stroke);
  position: relative;
  transition: 0.2s;
}

button .arrow::before {
  --secondary-color: #fff;
  --arrow-stroke: 2px;
  content: "";
  box-sizing: border-box;
  position: absolute;
  border: solid var(--secondary-color);
  border-width: 0 var(--arrow-stroke) var(--arrow-stroke) 0;
  display: inline-block;
  top: -3px;
  right: 3px;
  transition: 0.2s;
  padding: 3px;
  transform: rotate(-45deg);
}

button:hover {
  background-color: var(--hover-color);
  cursor: pointer;
}

button:hover .arrow {
  background: var(--secondary-color);
  cursor: pointer;
}

button:hover .arrow:before {
  right: 0;
}
</style>