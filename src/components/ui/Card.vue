
<template>
  <div :class="['rounded-lg border bg-card text-card-foreground shadow-sm', className]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    className: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'glass'].includes(value)
    }
  },
  computed: {
    computedClass() {
      return {
        'backdrop-blur-sm bg-white/50 border-transparent': this.variant === 'glass'
      }
    }
  }
}
</script>
