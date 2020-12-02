<template>
<div id="app_header">
  <div class="menu-entry">
    <i class="ico icon-all link" @click="handleTriggleMenu"></i>
  </div>
  <div class="head_logo">
    <a href="/"><img src="@/assets/img/logo.png" alt="logo" />
    MyApplication</a>
  </div>
  <div class="welcome">
    Welcome, {{nickName}} ,<span class="link" @click="logout">登出</span>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { LoginState } from '@/store/login';

type PageEvent = 'triggle-menu';

export default defineComponent({
  name: 'appHeader',
  props: {
    tirrgled: {
      type: Boolean,
      require: true,
    },
    height: {
      type: Number,
      default: 60,
    },
  },
  emits: ['triggle-menu'] as Array<PageEvent>,
  setup(props, context) {
    const router = useRouter();
    const store = useStore();
    const isTirrgled = ref(props.tirrgled);
    const handleTriggleMenu = () => {
      isTirrgled.value = !isTirrgled.value;
      context.emit('triggle-menu', isTirrgled.value);
    };
    const logout = (): void => {
      router.push({ path: '/login' });
    };
    const loginState: LoginState = store.state.login as LoginState;
    const nickName = ref(loginState.nickName);

    watch(props, (val) => {
      isTirrgled.value = val.tirrgled;
    });
    return {
      handleTriggleMenu,
      logout,
      nickName,
    };
  },
});
</script>

<style lang="less">
  @import url('~@/assets/style/mixin.less');
  #app_header{
    height: 60px;
    line-height: 60px;
    background: #333;
    color: #fff;
    font-size: 14px;
    position: relative;
    a{
      color:#fff;
    }
    .menu-entry{
      float: left;
      margin-left: 20px;
      .ico{
        font-size: 26px;
        cursor: pointer;
      }
    }
    .head_logo{
      font-size: 16px;
      height: 26px;
      line-height: 26px;
      width:200px;
      position: absolute;
      left:50%;
      margin-left:-100px;
      top:17px;
      transition: all 1s;
      img{
        width:26px;
        margin-right: 10px;
        vertical-align: -10px;
      }
      &:hover{
        font-style: italic;
        transform: scale(1.1);
      }
    }
    .welcome{
      float: right;
      margin-right: 20px;
    }
  }
</style>
