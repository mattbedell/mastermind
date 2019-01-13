<template>
  <div class="bg-dark">
    <div class="check disabled"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.check {
  height: 70%;
  width: 30%;
  border-bottom: 5px solid gray;
  border-right: 5px solid gray;
  transform: rotate(45deg);
}

.enabled {
  border-color: green;
}

.disabled {
  border-color: dimgray;
}
</style>
