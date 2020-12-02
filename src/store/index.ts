import { createStore } from 'vuex';
import login from './login';

export default createStore({
  modules: {
    login,
  },
});
