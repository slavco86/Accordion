<template>
  <div class="expansion-panel">
    <div class="expansion-panel__header">
      <slot name="header" />
    </div>
    <transition
      name="expand"
      v-on:before-enter="close"
      v-on:enter="open"
      v-on:before-leave="open"
      v-on:leave="close"
    >
      <div v-if="show" class="expansion-panel__content">
        <slot name="content" />
      </div>
    </transition>
    <slot name="footer" />
  </div>
</template>

<script>
export default {
  name: 'ExpansionPanel',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close(el) {
      // eslint-disable-next-line no-param-reassign
      el.style.height = 0;
    },
    open(el) {
      // eslint-disable-next-line no-param-reassign
      el.style.height = `${el.scrollHeight}px`;
    },
  },
};
</script>
