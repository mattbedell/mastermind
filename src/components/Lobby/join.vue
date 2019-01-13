<template>
  <section>
    <span :class="{ isErr: statusType.startsWith('err') }">{{ statusMessage }}</span>
    <form v-if="statusType === 'user'" @submit.self.prevent="connectSocket">
      <input type="text" placeholder="Lobby Id" required v-model="lobbyId" />
      <input type="text" placeholder="Username" required v-model="name" />
      <button type="submit">Join</button>
    </form>
  </section>

</template>

<script>
import io from 'socket.io-client';
import { mapState } from 'vuex';


export default {
  data() {
    return {
      lobbyId: null,
      name: null,
      statusType: 'user',
      statusMessage: 'Enter the lobby id and your name.',
    };
  },

  computed: mapState({
    player: state => state.player,
  }),

  mounted() {
    this.socket = io();

    this.$socket.on('game_started', (msg) => {
      // game view
    });
  },

  methods: {
    connectSocket(e) {
      this.connecting = true;

      const { lobbyId, name } = this;

      this.$socket.emit('player_connect', { lobbyId, name }, (player) => {
        this.$store.commit('set_player', player);
        this.statusType = 'waiting';
        this.statusMessage = player.isHost ? 'All players ready?' : 'Waiting for the host to start the game!';
      });
    }
  },
  components: {},
}
</script>

<style scoped>
form {
  margin-top: 5px;
}
</style>
