
<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader title="Proceso Completado" />
    
    <main class="flex-1 container max-w-2xl mx-auto p-6 flex flex-col items-center justify-center">
      <TransitionWrapper class="text-center">
        <div class="inline-flex h-24 w-24 items-center justify-center rounded-full bg-primary/20 mb-6">
          <div class="h-12 w-12 text-primary flex items-center justify-center">
            <!-- Uso directo de SVG en lugar del componente CheckCircle -->
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
        </div>
        
        <h1 class="text-3xl font-bold mb-4">¡Información Enviada!</h1>
        
        <p class="text-muted-foreground mb-8 max-w-md mx-auto">
          Se ha completado el proceso de envío de documentación. Hemos enviado una copia al correo electrónico proporcionado.
        </p>
        
        <div class="p-4 rounded-lg bg-muted/50 mb-8 max-w-md mx-auto">
          <h3 class="font-medium text-base mb-2">Próximos pasos</h3>
          <p class="text-sm text-muted-foreground">
            El departamento de Recursos Humanos revisará la documentación y se pondrá en contacto con usted en los próximos días.
          </p>
        </div>
        
        <Button 
          @click="goToStart"
          variant="outline"
        >
          Volver al inicio
        </Button>
      </TransitionWrapper>
    </main>
    
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '../components/layout/Header.vue';
import AppFooter from '../components/layout/Footer.vue';
import Button from '../components/ui/Button.vue';
import TransitionWrapper from '../components/ui/TransitionWrapper.vue';

export default {
  name: 'ProcessCompleted',
  components: {
    AppHeader,
    AppFooter,
    Button,
    TransitionWrapper
  },
  methods: {
    goToStart() {
      this.$router.push('/');
    }
  }
}
</script>
