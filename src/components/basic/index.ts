import { App } from 'vue';
import Icon from './icon/index.vue';
import Button from './button/index.vue';
import Tag from './tag/index.vue';
import Dialog from './dialog/index.vue';

export default {
  install(app: App<Element>) {
    app.component('icon', Icon);
    app.component('orz-button', Button);
    app.component('orz-tag', Tag);
    app.component('orz-dialog', Dialog);
  },
};
