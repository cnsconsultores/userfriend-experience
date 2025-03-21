
<template>
  <button
    :class="[
      'relative inline-flex items-center justify-center rounded-lg font-medium transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      'disabled:opacity-50 disabled:pointer-events-none',
      sizeClasses,
      variantClasses,
      fullWidth ? 'w-full' : '',
      className
    ]"
    :disabled="disabled || isLoading"
    v-bind="$attrs"
  >
    <component v-if="isLoading" :is="Loader2" class="mr-2 h-4 w-4 animate-spin" />
    <span v-else-if="icon && iconPosition === 'left'" class="mr-2">
      <component :is="icon" />
    </span>
    <span class="flex-1">
      <slot></slot>
    </span>
    <span v-if="!isLoading && icon && iconPosition === 'right'" class="ml-2">
      <component :is="icon" />
    </span>
  </button>
</template>

<script>
import { Loader2 } from 'lucide-vue-next';

export default {
  name: 'Button',
  components: {
    Loader2
  },
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (val) => ['primary', 'secondary', 'outline', 'ghost', 'link'].includes(val)
    },
    size: {
      type: String,
      default: 'md',
      validator: (val) => ['sm', 'md', 'lg'].includes(val)
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    icon: {
      type: [Object, null],
      default: null
    },
    iconPosition: {
      type: String,
      default: 'left',
      validator: (val) => ['left', 'right'].includes(val)
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    sizeClasses() {
      return {
        'sm': 'px-3 py-1.5 text-sm h-8',
        'md': 'px-4 py-2 text-base h-10',
        'lg': 'px-6 py-3 text-lg h-12'
      }[this.size];
    },
    variantClasses() {
      return {
        'primary': 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
        'secondary': 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        'outline': 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        'ghost': 'hover:bg-accent hover:text-accent-foreground',
        'link': 'text-primary underline-offset-4 hover:underline'
      }[this.variant];
    }
  }
}
</script>
