
<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader title="Proceso Finalizado" />
    
    <main class="flex-1 container max-w-2xl mx-auto p-6">
      <TransitionWrapper class="space-y-6">
        <div class="text-center">
          <div class="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 text-primary mb-4">
            <CheckCircle size="30" />
          </div>
          <h2 class="text-2xl font-bold mb-2">¡Proceso completado con éxito!</h2>
          <p class="text-muted-foreground mb-8">
            Gracias por completar todo el proceso de documentación y el examen de prevención de riesgos laborales.
          </p>
        </div>
        
        <Card class="border border-primary/20">
          <CardHeader>
            <CardTitle>Siguiente paso</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground">
              El departamento de Recursos Humanos revisará toda la documentación proporcionada y se pondrá en contacto con usted para los siguientes pasos del proceso de incorporación.
            </p>
          </CardContent>
        </Card>
        
        <div class="text-center mt-6">
          <Button 
            @click="goToHome"
            variant="outline"
          >
            Volver al inicio
          </Button>
        </div>
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
import Card from '../components/ui/Card.vue';
import CardHeader from '../components/ui/CardHeader.vue';
import CardTitle from '../components/ui/CardTitle.vue';
import CardContent from '../components/ui/CardContent.vue';
import { CheckCircle } from 'lucide-vue-next';

export default {
  name: 'ExamCompleted',
  components: {
    AppHeader,
    AppFooter,
    Button,
    TransitionWrapper,
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CheckCircle
  },
  methods: {
    goToHome() {
      this.$router.push('/');
    }
  }
}
</script>
