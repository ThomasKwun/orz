<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script lang="ts">
import { ComponentInternalInstance, defineComponent, getCurrentInstance } from 'vue';

export default defineComponent({
  name: 'about',
  setup(props, context) {
    /* console.log(props, context);
    const instance: ComponentInternalInstance | null = getCurrentInstance();
    console.log(instance);
    console.log(instance ? instance.appContext.config.globalProperties.$ajax : ''); */
  },
});
</script>
