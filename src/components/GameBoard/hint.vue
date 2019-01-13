<template>
  <div class="dot-container">
    <!-- <Dot v-for="i of 4" :color="dimgray" :key="`hint-${i}`" /> -->
  </div>
</template>

<script>
import Dot from './dot.vue';
export default {
  components: { Dot },
}
</script>

<style scoped>
.dot-container {
  display: flex;
  flex-wrap: wrap;
}

</style>
