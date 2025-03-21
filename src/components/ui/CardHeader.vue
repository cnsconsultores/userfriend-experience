
<template>
  <div :class="['p-6 flex flex-col space-y-1.5', className]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CardHeader',
  props: {
    className: {
      type: String,
      default: ''
    }
  }
}
</script>
