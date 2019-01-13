import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import App from './components/app.vue';
import router from './utils/router';
import socket from './plugins/socket';
import state from './store/index';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(socket);

const store = new Vuex.Store(state);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#root');
