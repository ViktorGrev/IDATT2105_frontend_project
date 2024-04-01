<script setup lang="ts">
import Menu from '../components/Menu.vue'
</script>

<template>
  <main>
    <Menu></Menu>
    <div class="header">
      Trivium
    </div>
    <div>
      <ul class="nav-links">
        <label for="close-btn" class="btn close-btn"><i class="fas fa-times"></i></label>
        <li><a href="#recentContent">Recent</a></li>
        <li><a href="#topContent">Top 10</a></li>
        <li><a href="#triviumContent">Trivium verified</a></li>
        <li><a href="#">History</a></li>
        <li><a href="#">Countries</a></li>
        <li><a href="#idatt2105Content">IDATT2105</a></li>
      </ul>
    </div>
    <div class="contentBox">
      <div id="contentSpace"></div>
      <div id="quizID">
        <div id="recentContent">
          <h3>Recent</h3>
          <div>

          </div>
        </div>
        <div id = "space"></div>
        <div id="topContent">
          <h3>Top 10</h3>
          <div>

          </div>
        </div>
        <div id = "space"></div>
        <div id="triviumContent">
          <h3>Trivium verified</h3>
          <div>

          </div>
        </div>
        <div id="idatt2105Content">
          <h3>IDATT2105</h3>
          <div>

          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  scroll-behavior: smooth;
}

.header {
  font-size: 50px;
  margin: 30px;
}

.nav-links {
  display: inline-flex;
}

.nav-links li {
  list-style: none;
}

.nav-links li a {
  color: #000000;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  padding: 9px 15px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.nav-links li a:hover {
  background: rgb(87, 174, 250);
}

.contentBox {
  width: 100%;
  font-size: 25px;
  display: flex;
  flex-direction: row;
}

#contentSpace {
  width: 10%;
}

#space {
  height: 1000px;
}
</style>