
<template>
  <footer :class="['w-full p-6 border-t border-border/40 glass-morphism mt-auto', className]">
    <div class="container max-w-7xl mx-auto flex flex-col items-center justify-center">
      <div class="text-center">
        <p class="text-xs text-muted-foreground">
          © {{ currentYear }} Procesamiento de Documentos 
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  }
}
</script>
