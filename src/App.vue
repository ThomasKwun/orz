<template>
  <div id="home">
    <app-header v-if="!rootPage" :tirrgled="showMenu"
      @triggle-menu="handleTriggleMenu"></app-header>
    <pop-menu v-if="!rootPage" :show ="showMenu" :class="[showMenu?'menu_anim':'',hiddenCls]"
    @select-menu="handleTriggleMenu">
    </pop-menu>
    <div id="__page_container"></div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, Ref, watch,
} from 'vue';
import { useRoute } from 'vue-router';
import appHeader from './views/home/header.vue';
import popMenu from './views/home/popmenu.vue';

export default defineComponent({
  name: 'Home',
  components: { appHeader, popMenu },
  setup() {
    const showMenu: Ref<boolean> = ref(false);
    const hiddenCls: Ref<string> = ref('');

    const rootPage: Ref<boolean> = ref(true);
    const route = useRoute();
    const list = ['/login'];
    watch(route, (val) => {
      rootPage.value = list.includes(val.path);
    });

    let timer: any = null;
    const handleTriggleMenu = (isShow: boolean) => {
      if (!isShow) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          showMenu.value = isShow;
        }, 500);
        hiddenCls.value = 'menu_anim_out';
      } else {
        showMenu.value = isShow;
        hiddenCls.value = '';
      }
    };

    return {
      handleTriggleMenu,
      showMenu,
      hiddenCls,
      rootPage,
    };
  },
});
</script>

<style lang="less">
  .menu_anim{
    animation: fadeInLeft 0.5s ease;
  }
  .menu_anim_out{
    animation: fadeOut 0.5s ease;
  }
  @keyframes fadeInLeft {
    from{
      transform: translateX(-200px);
      opacity: 0.3;
    }
    to{
      transform: translateX(0px);
      opacity: 1;
    }
  }
  @keyframes fadeOut{
    from{
      transform: translateX(0px);
      opacity: 1;
    }
    to{
      transform: translateX(-200px);
      opacity: 0.3;
    }
  }
</style>
