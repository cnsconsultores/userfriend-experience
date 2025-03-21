
<template>
  <p :class="['text-sm text-muted-foreground', className]">
    <slot></slot>
  </p>
</template>

<script>
export default {
  name: 'CardDescription',
  props: {
    className: {
      type: String,
      default: ''
    }
  }
}
</script>
