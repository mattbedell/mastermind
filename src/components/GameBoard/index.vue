<template>
  <section>
    <div class="game-container">
      <Row :idx="0" :move="currentMove">
        <a @click="() => handleClick(i-1)" v-for="i of 4" :key="`picker-${i}`">
          <Dot :color="colors[currentMove[i-1]]" />
        </a>
      </Row>
      <Row v-for="(move, idx) of moves" :move="moves[(moves.length - 1) - idx]" :idx="idx" :key="`row-${idx}`" />
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

import Row from './row.vue';
import Dot from './dot.vue';


export default {
  data() {
    return {
      clickCounts: [0, 0, 0, 0],
    };
  },
  computed: mapState({
    player: state => state.player,
    moves: state => state.player.moves,
    colors: state => state.colors,
    currentMove: state => state.player.currentMove,
  }),
  mounted() {},
  methods: {
    handleClick(idx) {
      this.$store.commit('setColor', { idx, value: this.clickCounts[idx] % this.colors.length });
      this.clickCounts[idx] += 1;
    },
  },
  components: { Row, Dot },
}
</script>

<style scoped>
.game-container {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
</style>
