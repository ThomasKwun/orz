<script lang="tsx">
import { CSSProperties, defineComponent } from 'vue';

export default defineComponent({
  name: 'Icon',
  props: {
    type: {
      type: String,
      require: true,
    },
    size: {
      type: Number,
      default: 16,
    },
  },
  render() {
    const style: CSSProperties = {
      fontSize: `${this.size}px`,
    };
    return (
      <i class={['ico', `icon-${this.type}`]} style={style}></i>
    );
  },
});
</script>

<style>

</style>
