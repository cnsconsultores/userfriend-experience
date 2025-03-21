
<template>
  <h3 :class="['font-semibold text-lg tracking-tight', className]">
    <slot></slot>
  </h3>
</template>

<script>
export default {
  name: 'CardTitle',
  props: {
    className: {
      type: String,
      default: ''
    }
  }
}
</script>
