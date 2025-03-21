
<template>
  <div :class="['transition-all duration-300 ease-in-out animate-slide-up', className]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TransitionWrapper',
  props: {
    className: {
      type: String,
      default: ''
    }
  }
}
</script>
