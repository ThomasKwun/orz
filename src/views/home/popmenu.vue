<template>
  <div id="pop_menu" v-show="isShow">
    <ul class="menu">
      <li @click="handleMenuClick"><router-link to="/about"><icon type="vip" :size="20"></icon>首页
      <!-- <icon type="arrow-down" size="20"></icon> --></router-link></li>
      <li class="active" @click="handleMenuClick"><router-link to="/core-hr/employee/search">
      <icon type="tongxunlu" :size="20"></icon>
      核心人事</router-link></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'PopMenu',
  props: {
    show: {
      type: Boolean,
      require: true,
    },
  },
  setup(props, context) {
    const isShow = ref(props.show);
    const setShow = (_show: boolean): void => {
      isShow.value = _show;
    };
    const handleMenuClick = () => {
      context.emit('select-menu');
    };
    watch(props, (val) => {
      setShow(val.show);
    });
    return {
      isShow,
      handleMenuClick,
    };
  },
});
</script>

<style lang="less">
#pop_menu{
  background: #333;
  box-shadow: -5px 5px 10px #000;
  height: 100%;
  color:#fff;
  position: absolute;
  top:60px;
  left: 0;
  // opacity: .8;
  a{
    color:#fff;
  }
  .menu{
    padding-top:10px;
    min-width:200px;
    text-align: left;
    li{
      height:50px;
      line-height:50px;
      padding-left: 10px;
      &.active,&:hover{
        background: #444;
      }
      &:hover{
        border-bottom: 1px #666 solid;
        border-top: 1px #666 solid;
      }
      .icon-arrow-down{
        float:right;
        margin-right: 10px;
      }
    }
  }
}
</style>
