<script setup lang="ts">
import Menu from '../components/Menu.vue'
</script>

<template>
  <main>
    <Menu></Menu>
    <div class = "header">
      Trivium
    </div>
    <div>
      The best method to learn
    </div>
    <ul class="nav-links">
      <label for="close-btn" class="btn close-btn"><i class="fas fa-times"></i></label>
      <li><a href="#">Recent</a></li>
      <li><a href="#">Top 10</a></li>
      <li><a href="#">Trivium verified</a></li>
    </ul>
  </main>
</template>

<style scoped>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .header {
    font-size: 50px;
    margin: 30px;
  }

  .nav-links{
  display: inline-flex;
}

  .nav-links li{
  list-style: none;
}
.nav-links li a{
  color: #000000;
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
</style>