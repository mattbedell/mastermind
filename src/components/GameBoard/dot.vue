<template>
  <div class="dot" v-bind:style="style"></div>
</template>

<script>

export default {
  props: {
    color: { default: 'dimgrey'},
  },
  data() {
    return {};
  },
  computed: {
    style() {
      return {
        'border-color': this.color,
        'background-color': this.color,
      };
    },
  },
  methods: {},
}
</script>

<style scoped>
.dot {
  border: 1px solid dimgray;
  border-radius: 100%;
  background-color: dimgray;
  margin: 5px;
  width: 6vw;
  height: 6vw;
}
</style>
