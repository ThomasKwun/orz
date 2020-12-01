<script lang="tsx">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'ElTag',
  props: {
    closable: Boolean,
    type: String,
    hit: Boolean,
    disableTransitions: Boolean,
    color: String,
    size: String,
    effect: {
      type: String,
      default: 'light',
      validator: (val: string | null) => {
        if (!val) {
          return false;
        }
        return ['dark', 'light', 'plain'].indexOf(val) !== -1;
      },
    },
  },
  setup(props, context) {
    const handleClose = (event: Event) => {
      event.stopPropagation();
      context.emit('close', event);
    };
    const handleClick = (event: Event) => {
      context.emit('click', event);
    };
    const tagSize = computed(() => props.size);
    return {
      handleClose,
      handleClick,
      tagSize,
    };
  },
  render() {
    const {
      type, tagSize, hit, effect,
    } = this;
    const classes = [
      'el-tag',
      type ? `el-tag--${type}` : '',
      tagSize ? `el-tag--${tagSize}` : '',
      effect ? `el-tag--${effect}` : '',
      hit && 'is-hit',
    ];
    const tagEl = (
      <span
        class={ classes }
        style={{ backgroundColor: this.color }}
        on-click={ this.handleClick }>
        { this.$slots.default ? this.$slots.default() : '' }
        {
          this.closable && <i class="el-tag__close el-icon-close" on-click={ this.handleClose }></i>
        }
      </span>
    );

    return this.disableTransitions ? tagEl : <transition name="el-zoom-in-center">{ tagEl }</transition>;
  },
});
</script>
