<template>
  <section>
    <h4>Lobby: <span id="lobby-id" v-html="lobbyId"></span></h4>
    <ul>
      <li v-for="(player, playerId) in players" :key="playerId">
        <span v-html="player.name"></span> has joined.
      </li>
    </ul>
  </section>
</template>

<script>

export default {
  data() {
    return {
      lobbyId: null,
      players: {},
    };
  },
  mounted() {
    this.$socket.emit('request_lobby_id', (lobby) => {
      Object.assign(this, lobby);
    });

    this.$socket.on('player_joined', (players) => {
      this.players = players;
    });
  },
  methods: {},
  components: {},
}
</script>

<style scoped>
h3 {
  color: red;
}

span {
  color: blue;
}

#lobby-id {
  color: red;
  letter-spacing: 0.5em;
}
</style>
