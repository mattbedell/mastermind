import io from 'socket.io-client';

/* eslint-disable */
export default {
  install(Vue, opts) {
    const socket = io();
    socket.on('connect', () => {

    });

    Vue.prototype.$socket = socket;
  },
};
/* eslint-enable */
