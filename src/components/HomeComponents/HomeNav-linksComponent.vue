<template>
    <div>
      <ul class="nav-links">
        <label for="close-btn" class="btn close-btn"><i class="fas fa-times"></i></label>
        <li><a href="#recent">Recent</a></li>
        <li><a href="#topContent">Top 10</a></li>
        <li><a href="#triviumContent">Trivium verified</a></li>
        <li><a href="#idatt2105Content">IDATT2105</a></li>
      </ul>
    </div>
</template>

<style scoped>
.nav-links {
  display: inline-flex;
}

.nav-links li {
  list-style: none;
}

.nav-links li a {
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  padding: 9px 15px;
  border-radius: 5px;
  transition: all 0.3s ease;
  color: #6d6e72;
}

.nav-links li a:hover {
  background: rgb(87, 174, 250);
  color: white;
}
</style>