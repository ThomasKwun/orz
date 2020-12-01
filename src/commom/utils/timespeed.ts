import { ref, Ref } from 'vue';

export default function () {
  const _timeStart: Ref<number> = ref(0);
  const timeStart = () => {
    _timeStart.value = new Date().getTime();
  };
  const timeEnd = (name = 'default'): number => {
    if (_timeStart.value === 0) {
      throw new Error('please start first');
    }
    const endTime = new Date().getTime();
    const speed = endTime - _timeStart.value;
    console.log(`任务名称：${name}`, `开始时间：${_timeStart.value}`, `结束时间：${endTime}`, `花费时间：${speed}ms`);
    return speed;
  };
  return {
    timeStart,
    timeEnd,
  };
}
/* export default {
  setup() {
    const _timeStart: Ref<number> = ref(0);
    const timeStart = () => {
      _timeStart.value = new Date().getTime();
    };
    const timeEnd = (name = 'default'): number => {
      if (_timeStart.value === 0) {
        throw new Error('please start first');
      }
      const endTime = new Date().getTime();
      const speed = endTime - _timeStart.value;
      console.log(`任务名称：${name}`, `开始时间：${_timeStart.value}`, `结束时间：${endTime}`, `花费时间：${speed}ms`);
      return speed;
    };
    return {
      timeStart,
      timeEnd,
    };
  },
}; */
