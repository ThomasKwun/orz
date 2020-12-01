<template>
  <div>
    <slot name="top"></slot>
    <input class="inpt" v-model="userName" placeholder="请输入用户名" />
    <input class="inpt" v-model="pwd" type="password" placeholder="请输入密码" />
    <button :class="['btn','btn-primary','btn-login',loading?'disabled':'']" @click="handleLogin">
      <i v-if="loading" class="ico icon-loading"></i>登录
    </button>
    <span class="tip">{{props.tip}}</span>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, watch,
} from 'vue';

export interface LoginComp{
  /*
    重置页面状态
  */
  resetStatus: () => {};
  /*
    处理登录
  */
  handleLogin: () => {};
}
type PageEvent = 'on-login';
export default defineComponent({
  name: 'LoginComp',
  props: {
    defaultUserName: {
      type: String,
      default: '',
    },
    defaultPwd: {
      type: String,
      default: '',
    },
    tip: {
      type: String,
      default: '',
    },
  },
  emits: ['on-login'] as Array<PageEvent>,
  setup(props, context) {
    const userName = ref(props.defaultUserName);
    const pwd = ref(props.defaultPwd);
    const loading = ref(false);

    const handleLogin = () => {
      loading.value = true;
      context.emit('on-login', userName.value, pwd.value);
    };

    const resetStatus = () => {
      loading.value = false;
    };

    watch(props, (val) => {
      userName.value = val.defaultUserName;
      pwd.value = val.defaultPwd;
    });
    return {
      userName,
      pwd,
      handleLogin,
      props,
      loading,
      resetStatus,
    };
  },
});
</script>

<style>

</style>
