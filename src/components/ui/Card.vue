
<template>
  <div :class="['bg-card text-card-foreground rounded-xl shadow', className]">
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
    }
  }
}
</script>
