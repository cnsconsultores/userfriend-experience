
<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader title="Página no encontrada" />
    
    <main class="flex-1 container mx-auto p-6 flex flex-col items-center justify-center">
      <TransitionWrapper class="text-center">
        <h1 class="text-6xl font-bold mb-4">404</h1>
        <p class="text-xl text-muted-foreground mb-8">
          La página que estás buscando no existe.
        </p>
        <Button @click="goHome">Volver al inicio</Button>
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
  name: 'NotFound',
  components: {
    AppHeader,
    AppFooter,
    Button,
    TransitionWrapper
  },
  methods: {
    goHome() {
      this.$router.push('/');
    }
  }
}
</script>
