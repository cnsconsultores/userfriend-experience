
<template>
  <header class="glass-morphism sticky top-0 z-10 w-full py-4 px-6 flex items-center justify-between border-b border-border/40 animate-fade-in">
    <div class="flex items-center">
      <button 
        v-if="showBackButton && $route.path !== '/'" 
        @click="goBack"
        class="mr-4 rounded-full w-8 h-8 flex items-center justify-center bg-secondary hover:bg-secondary/80 transition-colors"
        aria-label="Volver atrás"
      >
        <ChevronLeft :size="18" />
      </button>
      <h1 class="font-medium text-lg">{{ pageTitle }}</h1>
    </div>
    <div class="h-8 w-8 flex items-center justify-center">
      <div class="relative">
        <div class="w-2 h-2 rounded-full bg-primary absolute -top-1 -right-1"></div>
      </div>
    </div>
  </header>
</template>

<script>
import { ChevronLeft } from 'lucide-vue-next';

export default {
  name: 'AppHeader',
  components: {
    ChevronLeft
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    showBackButton: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    pageTitle() {
      if (this.title) return this.title;
      
      // Determine based on route
      const route = this.$route.path;
      switch (route) {
        case '/': return 'Inicio';
        case '/personal-info': return 'Información Personal';
        case '/documents-upload': return 'Subir Documentos';
        case '/sign-documents': return 'Firmar Documentos';
        case '/confirmation': return 'Confirmación';
        case '/completed': return 'Proceso Completado';
        default: return 'Flujo de Trabajo';
      }
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>
