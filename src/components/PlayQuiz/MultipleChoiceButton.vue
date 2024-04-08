<template>
  <button
    :class="{ 'selected': isSelected }"
    @click="$emit('select', optionIndex)" type="button">
    {{ optionText }}
  </button>
</template>

<script setup lang="ts">
defineProps(['optionText', 'optionIndex', 'isSelected']);
</script>

<style scoped>
button {
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f7f7f7;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

button:hover {
  background-color: #e7e7e7;
}

button.selected {
  background-color: rgb(22, 144, 248);
  color: white;
  border-color: rgb(22, 144, 248);
}

/* You can also add a focus style if needed */
button:focus {
  outline: none;
  /* other focus styles */
}
</style>