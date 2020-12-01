<template>
  <transition
    ref='$dialogEl'
    name="dialog-fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave">
    <div
      v-show="visible"
      class="el-dialog__wrapper"
      @click.self="handleWrapperClick">
      <div
        role="dialog"
        :key="key"
        aria-modal="true"
        :aria-label="title || 'dialog'"
        :class="['el-dialog', { 'is-fullscreen': fullscreen,
        'el-dialog--center': center }, customClass]"
        ref="dialog"
        :style="style">
        <div class="el-dialog__header">
          <slot name="title">
            <span class="el-dialog__title">{{ title }}</span>
          </slot>
          <button
            type="button"
            class="el-dialog__headerbtn"
            aria-label="Close"
            v-if="showClose"
            @click="handleClose">
            <i class="el-dialog__close el-icon el-icon-close"></i>
          </button>
        </div>
        <div class="el-dialog__body" v-if="rendered"><slot></slot></div>
        <div class="el-dialog__footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="tsx">
import {
  defineComponent, Ref, ref, watch, nextTick, computed,
  onMounted, onUnmounted, CSSProperties,
} from 'vue';
import { exec } from '@utils/index';

export default defineComponent({
  name: 'ElDialog',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },

    modal: {
      type: Boolean,
      default: true,
    },

    modalAppendToBody: {
      type: Boolean,
      default: true,
    },

    appendToBody: {
      type: Boolean,
      default: false,
    },

    lockScroll: {
      type: Boolean,
      default: true,
    },

    closeOnClickModal: {
      type: Boolean,
      default: true,
    },

    closeOnPressEscape: {
      type: Boolean,
      default: true,
    },

    showClose: {
      type: Boolean,
      default: true,
    },

    width: String,

    fullscreen: Boolean,

    customClass: {
      type: String,
      default: '',
    },

    top: {
      type: String,
      default: '15vh',
    },
    beforeClose: Function,
    center: {
      type: Boolean,
      default: false,
    },

    destroyOnClose: Boolean,
  },
  setup(props, context) {
    const $dialogEl: Ref<HTMLObjectElement|null> = ref(null);
    const closed: Ref<boolean> = ref(false);
    const key: Ref<number> = ref(0);
    const visible: Ref<boolean> = ref(props.visible);
    const dialog: Ref<HTMLObjectElement|null> = ref(null);
    const rendered = ref(false);
    /* const getMigratingConfig = ()=> {
      return {
        props: {
          'size': 'size is removed.'
        }
      };
    }; */

    const hide = (cancel: boolean) => {
      if (cancel !== false) {
        context.emit('update:visible', false);
        context.emit('close');
        closed.value = true;
      }
    };

    const handleClose = () => {
      if (typeof props.beforeClose === 'function') {
        props.beforeClose(hide);
      } else {
        hide(false);
      }
    };

    const handleWrapperClick = () => {
      if (!props.closeOnClickModal) return;
      handleClose();
    };

    const updatePopper = () => {
      // this.broadcast('ElSelectDropdown', 'updatePopper');
      // this.broadcast('ElDropdownMenu', 'updatePopper');
    };
    const afterEnter = () => {
      context.emit('opened');
    };
    const afterLeave = () => {
      context.emit('closed');
    };

    watch(visible, (val) => {
      if (val) {
        closed.value = false;
        context.emit('open');
        $dialogEl.value?.addEventListener('scroll', updatePopper);
        nextTick(() => {
          if (dialog.value) {
            dialog.value.scrollTop = 0;
          }
        });
        if (props.appendToBody) {
          exec($dialogEl.value && document.body.appendChild($dialogEl.value));
        }
      } else {
        if ($dialogEl.value) {
          $dialogEl.value.removeEventListener('scroll', updatePopper);
        }
        if (!closed.value) context.emit('close');
        if (props.destroyOnClose) {
          nextTick(() => {
            key.value += 1;
          });
        }
      }
    });

    const style = computed(() => {
      const _style: CSSProperties = {};
      if (!props.fullscreen) {
        _style.marginTop = props.top;
        if (props.width) {
          _style.width = props.width;
        }
      }
      return _style;
    });

    onMounted(() => {
      if (props.visible) {
        rendered.value = true;
        if (props.appendToBody) {
          exec($dialogEl.value && document.body.appendChild($dialogEl.value));
        }
      }
    });

    onUnmounted(() => {
      if (props.appendToBody && $dialogEl && $dialogEl.value?.parentNode) {
        exec($dialogEl.value && $dialogEl.value.parentNode.removeChild($dialogEl.value));
      }
    });

    return {
      closed,
      key,
      style,
      dialog,
      rendered,
      $dialogEl,
      handleWrapperClick,
      handleClose,
      hide,
      afterEnter,
      afterLeave,
    };
  },
});
</script>

<style>

</style>
