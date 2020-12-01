<script lang="tsx">
import {
  defineComponent, computed, inject, PropType, onMounted,
} from 'vue';
import { exec, useGlobalConfig } from '@utils/index';

export default defineComponent({
  name: 'ElButton',
  props: {
    type: {
      type: String,
      default: 'default',
    },
    size: String,
    icon: {
      type: String,
      default: '',
    },
    nativeType: {
      type: String as PropType<'submit'|'button'|'reset'>,
      default: 'button',
      validator: (val: string) => ['submit', 'button', 'reset'].indexOf(val) !== -1,
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autoFocus: Boolean,
    round: Boolean,
    circle: Boolean,
  },
  setup(props, context) {
    const handleClick = (evt: Event) => {
      context.emit('btn-click', evt);
    };
    interface IelFormItem{
      elFormItemSize: string;
    }
    interface IelForm {
      disabled: boolean;
    }
    onMounted(() => {
      const i = true;
      exec(i && console.log(useGlobalConfig()));
    });
    const elForm = inject('elForm', {} as IelForm);
    const elFormItem = inject('elFormItem', {} as IelFormItem);
    const _elFormItemSize = computed(() => (elFormItem ? elFormItem.elFormItemSize : null));
    const buttonSize = computed(() => props.size || _elFormItemSize.value);
    const buttonDisabled = computed(() => props.disabled || (elForm || {}).disabled);
    return {
      handleClick,
      buttonSize,
      buttonDisabled,
    };
  },
  render() {
    const {
      handleClick, buttonDisabled, loading, autoFocus,
      type, nativeType, buttonSize, plain, round, circle, icon,
    } = this;
    return (
      <button
        onClick={handleClick}
        disabled={buttonDisabled || loading}
        autofocus={autoFocus}
        type={nativeType}
        class={[
          'el-button',
          type ? `el-button--${type}` : '',
          buttonSize ? `el-button--${buttonSize}` : '',
          {
            'is-disabled': buttonDisabled,
            'is-loading': loading,
            'is-plain': plain,
            'is-round': round,
            'is-circle': circle,
          },
        ]}
      >
        {loading ? <i class="el-icon-loading"></i> : ''}
        {icon && !loading ? <i class="icon"></i> : ''}
        {this.$slots.default ? this.$slots.default() : ''}
      </button>
    );
  },
});
</script>

<style>

</style>
