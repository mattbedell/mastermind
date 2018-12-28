<template>
  <main>
    <Header></Header>
    <router-view></router-view>
  </main>
</template>

<script>
import Header from './Header/index.vue';


export default {
  data() {
    return {};
  },
  methods: {},
  components: { Header },
}
</script>

<style>
</style>
