import VueRouter from 'vue-router';
import Lobby from '../components/Lobby/index.vue';
import Game from '../components/Game/index.vue';
import GameBoard from '../components/GameBoard/index.vue';
import Join from '../components/Lobby/join.vue';

/* eslint-disable */
export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/lobby', component: Lobby },
    { path: '/', component: Game, children: [
      { path: '/', component: Join },
      { path: '/game', component: GameBoard }
    ] },
  ],
});
