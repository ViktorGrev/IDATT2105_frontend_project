<template>
  <nav>
    <div class="wrapper">
      <div class="logo"><a href="#" @click="home"><img src="../../assets/rizzletRpng.png">Rizzlet</a></div>
      <input type="radio" name="slider" id="menu-btn">
      <input type="radio" name="slider" id="close-btn">
      <ul class="nav-links">
        <label for="close-btn" class="btn close-btn"><i class="fas fa-times"></i></label>
        <li><a href="#" @click="home"><img src="@/assets/icons/download (2).svg">Home</a></li>
        <li><a href="#" @click="yourLibrary"><img src="@/assets/icons/download (6).svg">Your Library</a></li>
        <li><a href="#" @click="create"><img src="@/assets/icons/download (7).svg">Create</a></li>
        <li><a href="#" @click="search"><img src="@/assets/icons/download (4).svg">Search</a></li>
        <li v-if="isLoggedIn">
          <a href="#" class="desktop-item"><img src="@/assets/icons/download (5).svg">{{ username }}</a>
          <input type="checkbox" id="showDrop">
          <label for="showDrop" class="mobile-item">Dropdown Menu</label>
          <ul class="drop-menu">
            <li><a href="#" @click="user"><img src="@/assets/icons/download (5).svg">Profile</a></li>
            <li><a href="#" @click="feedback"><img src="@/assets/icons/download (8).svg">Feedback</a></li>
            <li><a href="#" @click="settings"><img src="@/assets/icons/download.svg">Settings</a></li>
            <li><a href="#" @click="logout"><img src="@/assets/icons/download (1).svg">Log out</a></li>
          </ul>
        </li>
        <li v-else>
          <a href="#" @click="login">Login</a>
          <a href="#" @click="signup">Sign up</a>
        </li>
      </ul>
      <label for="menu-btn" class="btn menu-btn"><i class="fas fa-bars"></i></label>
    </div>
  </nav>
</template>

<script>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserInfoStore } from '@/stores/UserStore';

export default {
  setup() {
    const userStore = useUserInfoStore();
    const isLoggedIn = computed(() => userStore.isLoggedIn); 
    const username = computed(() => userStore.username);
    const router = useRouter();


    return {
      username,
      login() {
        router.push({ name: 'login' });
      },
      signup() {
        router.push({ name: 'signup' });
      },
      home() {
        router.push({ name: 'home' });
      },
      create() {
        router.push({ name: 'create' });
      },
      settings() {
        router.push({ name: 'settings' });
      },
      logout() {
        userStore.clearUserInfo();
        router.push({ name: 'login' });
      },
      user() {
        router.push({ name: 'profile', params: {username: userStore.username}}); 
      },
      feedback() {
        router.push({ name: 'feedback' }); 
      },
      yourLibrary() {
        router.push({ name: 'feedback' }); 
      },
      search() {
        router.push({ name: 'search' }); 
      },
      isLoggedIn
    };
  }
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
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

nav{
  width: 100%;
  background: rgb(22, 144, 248);
}
nav .wrapper{
  padding: 0px 30px;
  height: auto;
  line-height: 70px;
  margin: auto;
  margin-right: 7%;
  margin-left: 7%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
}

.wrapper .logo img{
    height: 70px;
    widows: 70px;
    margin-right: 5px;
}

.wrapper .logo a{
  color: #f2f2f2;
  font-size: 40px;
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  justify-content: center;
  display: flex;
}
.wrapper .nav-links{
  display: inline-flex;
  flex-wrap: wrap;
  display: flex;
}
.nav-links li{
  list-style: none;
}
.nav-links li a{
  color: #f2f2f2;
  text-decoration: none;
  font-size: 20px;
  font-weight: 500;
  padding: 9px 15px;
  border-radius: 5px;
  transition: all 0.3s ease;
}
.nav-links li a:hover{
  background: rgb(87, 174, 250);
}
.nav-links .mobile-item{
  display: none;
}
.nav-links .drop-menu{
  position: absolute;
  background: rgb(22, 144, 248);
  width: 180px;
  line-height: 45px;
  top: 85px;
  opacity: 0;
  visibility: hidden;
  box-shadow: 0 6px 10px rgba(0,0,0,0.15);
  padding-inline-start: 0px;
  padding: 5px;
}
.nav-links li:hover .drop-menu,
.nav-links li:hover .mega-box{
  transition: all 0.3s ease;
  top: 70px;
  opacity: 1;
  visibility: visible;
}
.drop-menu li a{
  display: block;
  padding: 0px 0px 0px 10px;
  font-weight: 400;
  border-radius: 0px;
}
.content .row img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.content .row header{
  color: #f2f2f2;
  font-size: 20px;
  font-weight: 500;
}
.content .row .mega-links{
  margin-left: -40px;
  border-left: 1px solid rgba(255,255,255,0.09);
}
.row .mega-links li{
  padding: 0 20px;
}
.row .mega-links li a{
  padding: 0px;
  padding: 0 20px;
  color: #d9d9d9;
  font-size: 17px;
  display: block;
}
.row .mega-links li a:hover{
  color: #f2f2f2;
}
.wrapper .btn{
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  display: none;
}
.wrapper .btn.close-btn{
  position: absolute;
  right: 30px;
  top: 10px;
}



nav input{
  display: none;
}

.body-text{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
  padding: 0 30px;
}
.body-text div{
  font-size: 45px;
  font-weight: 600;
}
</style>