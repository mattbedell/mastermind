<template>
  <section>
    <div class="row-container flex-center">
      <div class="dot-container">
        <Hint class="row-content"/>
        <slot>
          <Dot v-for="i of 4"
            :key="`dot-${idx}-${i}`"
            :id="i"
            :color="colors[move[i - 1]]"
          />
        </slot>
      </div>
    </div>
  </section>

</template>

<script>
import { mapState } from 'vuex';
import Dot from './dot.vue';
import Hint from './hint.vue';
import Continue from './continue.vue';


export default {
  data() {
    return {
      defaultColor: 'dimgrey',
    };
  },

  components: { Dot, Hint, Continue },

  props: {
    idx: { default: 0 },
    move: {},
  },

  computed: {
    ...mapState({
      colors: state => state.colors,
    }),
  },

  mounted() {},
  methods: {},
}
</script>

<style scoped>
.flex-center {
  display: flex;
  justify-content: center;
}
.row-container {
  background-color: gray;
  padding: 5px;
  width: 70vw;
}
.dot-container {
  display: flex;
  justify-content: center;
}

.row-content {
  margin: 5px;
  height: 100%;
  width: 7vw;
}
</style>
