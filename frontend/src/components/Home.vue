<template>
    <nav>
  <div class="wrapper">
    <div class="logo"><a href="#"><img src = "../assets/trivium_logo.png">Trivium</a></div>
    <input type="radio" name="slider" id="menu-btn">
    <input type="radio" name="slider" id="close-btn">
    <ul class="nav-links">
      <label for="close-btn" class="btn close-btn"><i class="fas fa-times"></i></label>
      <li><a href="#">Home</a></li>
      <li><a href="#">Your Library</a></li>
      <li><a href="#">Create</a></li>
      <li>
        <a href="#" class="desktop-item">Mega Menu</a>
        <input type="checkbox" id="showMega">
        <label for="showMega" class="mobile-item">Mega Menu</label>
        <div class="mega-box">
          <div class="content">
            <div class="row">
              <img src="https://fadzrinmadu.github.io/hosted-assets/responsive-mega-menu-and-dropdown-menu-using-only-html-and-css/img.jpg" alt="">
            </div>
            <div class="row">
              <header>Multiple choice</header>
              <ul class="mega-links">
                <li><a href="#">Made by Trivium</a></li>
                <li><a href="#">History</a></li>
                <li><a href="#">Business cards</a></li>
                <li><a href="#">Custom logo</a></li>
              </ul>
            </div>
            <div class="row">
              <header>True or False</header>
              <ul class="mega-links">
                <li><a href="#">Made by Trivium</a></li>
                <li><a href="#">Business Email</a></li>
                <li><a href="#">Mobile Email</a></li>
                <li><a href="#">Web Marketing</a></li>
              </ul>
            </div>
            <div class="row">
              <header>Top quizes</header>
              <ul class="mega-links">
                <li><a href="#">Site Seal</a></li>
                <li><a href="#">VPS Hosting</a></li>
                <li><a href="#">Privacy Seal</a></li>
                <li><a href="#">Website design</a></li>
              </ul>
            </div>
          </div>
        </div>
      </li>
      <li>
        <a href="#" class="desktop-item">Login</a>
        <input type="checkbox" id="showDrop">
        <label for="showDrop" class="mobile-item">Dropdown Menu</label>
        <ul class="drop-menu">
          <li><a href="#">Settings</a></li>
          <li><a href="#">Your Library</a></li>
          <li><a href="#">Profile</a></li>
          <li><a href="#">Log out</a></li>
        </ul>
      </li>
    </ul>
    <label for="menu-btn" class="btn menu-btn"><i class="fas fa-bars"></i></label>
  </div>
</nav>


</template>

<style scoped>
.html,
body {
  width: 100vw;
  height: 100vh;
  margin: 0px;
  padding: 0px;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: rosybrown;
}

nav{
  width: 100vw;
  background: rgb(22, 144, 248);
}
nav .wrapper{
  max-width: 1300px;
  padding: 0px 30px;
  height: 70px;
  line-height: 70px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.wrapper .logo img{
    height: 50px;
    widows: 50px;
    margin-top: 10px;
    margin-right: 5px;
}

.wrapper .logo a{
  color: #f2f2f2;
  font-size: 30px;
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  justify-content: center;
  display: flex;
}
.wrapper .nav-links{
  display: inline-flex;
}
.nav-links li{
  list-style: none;
}
.nav-links li a{
  color: #f2f2f2;
  text-decoration: none;
  font-size: 18px;
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
  left:-30px;
  opacity: 0;
  visibility: hidden;
  box-shadow: 0 6px 10px rgba(0,0,0,0.15);
}
.nav-links li:hover .drop-menu,
.nav-links li:hover .mega-box{
  transition: all 0.3s ease;
  top: 70px;
  opacity: 1;
  visibility: visible;
}
.drop-menu li a{
  width: 100%;
  display: block;
  padding: 0px 10px 0px 0px;
  font-weight: 400;
  border-radius: 0px;
}
.mega-box{
  position: absolute;
  left: 0;
  width: 100%;
  padding: 0 0px;
  top: 85px;
  opacity: 0;
  visibility: hidden;
}
.mega-box .content{
  background: rgb(22, 144, 248);
  padding: 25px 20px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  box-shadow: 0 6px 10px rgba(0,0,0,0.15);
}
.mega-box .content .row{
  width: calc(25% - 30px);
  line-height: 45px;
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