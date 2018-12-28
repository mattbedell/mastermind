import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './components/app.vue';
import router from './utils/router';
import socket from './plugins/socket';

Vue.use(VueRouter);
Vue.use(socket);

new Vue({
  router,
  render: h => h(App),
}).$mount('#root');
