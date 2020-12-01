import { createApp } from 'vue';
import { registerMicroApps, start, runAfterFirstMounted } from 'qiankun';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/style/index.less';
import basicComp from './components/basic';

const app = createApp(App);
app.use(basicComp);
app.use(store).use(router).mount('#app');
app.config.globalProperties.$app = { text: '123456' };
registerMicroApps(
  [
    {
      name: 'orz-core-hr',
      entry: 'http://localhost:8081',
      container: '#__page_container',
      activeRule: (Location): boolean => {
        const pageList = ['/core-hr/employee/search'];
        return pageList.includes(Location.pathname);
      },
    },
  ],
);
start();

runAfterFirstMounted(() => {
  console.log('runAfterFirstMounted');
});

window._QIANKUN = true;
