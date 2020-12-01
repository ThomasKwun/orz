<template>
  <div id="home">
    <orz-button type="primary" :loading="false" :disabled="false"
   @btn-click="handleClick" nativeType="butto2">hello world</orz-button>

    <!-- <orz-tag>标签一</orz-tag>
    <orz-tag type="success">标签二</orz-tag>
    <orz-tag type="info">标签三</orz-tag>
    <orz-tag type="warning">标签四</orz-tag>
    <orz-tag type="danger">标签五</orz-tag>

    <orz-dialog :visible="true" title="test">
      hello world
      <span slot:footer class="dialog-footer">
        <orz-button @click="dialogVisible = false">取 消</orz-button>
        <orz-button type="primary" @click="dialogVisible = false">确 定</orz-button>
      </span>
    </orz-dialog> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted } from 'vue';
import timespeed from '../../commom/utils/timespeed';

export default defineComponent({
  name: 'Home',
  setup() {
    const { timeStart, timeEnd } = timespeed();
    const handleClick = () => {
      console.log('12345');
    };
    onBeforeMount(() => {
      timeStart();
    });
    onMounted(() => {
      timeEnd('渲染耗时');
    });
    return {
      handleClick,
    };
  },
});
</script>

<style lang="less">
</style>
