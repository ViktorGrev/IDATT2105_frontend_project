<template>
    <div class="historyBox">
      <div class="infoBox">
        <slot name="infoBoxContent">
          <!-- Default content for infoBox -->
          <p>The art of war 2</p>
          <p>25 Questions</p>
        </slot>
      </div>
      <div class="creatorBox">
        <slot name="creatorBoxContent">
          <!-- Default content for creatorBox -->
          Vekaste
        </slot>
      </div>
    </div>
  </template>

<style scoped>
.historyBox {
    padding: 10px;
    box-shadow: rgba(87, 174, 250, 0.25) 0px 25px 50px -12px;
    display: flex;
    border-radius: 1em;
    flex-direction: column;
    width: 100%;
    cursor: pointer;
    margin: 40px;
}

.infoBox {
    flex-direction: column;
    font-size: 20px;
}
.creatorBox {
    color: rgb(21, 83, 137);
}
</style>