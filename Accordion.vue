<template>
  <div class="accordion">
    <expansion-panel
      v-for="(item, index) in items"
      :key="index"
      :show="state[index]"
      class="accordion__expansion-panel"
    >
      <template slot="header" class="accordion__header">
        <slot name="header" :item="item" />
        <button v-on:click="togglePanel(index)" class="accordion__activator">
          <component
            :is="state[index] ? 'minus-icon' : 'plus-icon'"
            show-border
          />
        </button>
      </template>
      <template slot="content">
        <slot :item="item" />
      </template>
      <template slot="footer">
        <slot name="footer" :item="item" />
      </template>
    </expansion-panel>
  </div>
</template>

<script>
import ExpansionPanel from '@/components/ExpansionPanel.vue';
import { PlusIcon, MinusIcon } from '@/components/icons';

export default {
  name: 'Accordion',
  components: {
    ExpansionPanel,
    PlusIcon,
    MinusIcon,
  },
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      state: [],
    };
  },
  methods: {
    togglePanel(index) {
      this.$set(this.state, index, !this.state[index]);
    },
  },
};
</script>
