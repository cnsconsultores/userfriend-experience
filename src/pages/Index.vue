
<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    
    <main class="flex-1 container max-w-4xl mx-auto p-6 md:p-8">
      <TransitionWrapper class="space-y-8">
        <div class="text-center my-12 md:my-16">
          <div class="inline-flex items-center justify-center p-1 px-3 mb-4 rounded-full bg-primary/10 text-primary text-sm">
            Proceso de Documentación
          </div>
          <h1 class="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Envío de información para su contratación en {{ campoNegocio }}
          </h1>
          <p class="text-lg text-muted-foreground max-w-2xl mx-auto" v-html="textoInstrucciones"></p>
        </div>
        
        <div class="flex flex-col items-center justify-center mt-8">
          <Button 
            @click="empezar"
            icon="ArrowRight"
            iconPosition="right"
            size="lg"
            class="px-8"
          >
            Empezar
          </Button>
        </div>
        
        <div class="bg-primary/5 rounded-xl p-6 border border-primary/20 mt-8">
          <h3 class="text-base font-medium mb-2">Acerca de este proceso</h3>
          <p class="text-sm text-muted-foreground">
            Este sistema le permite completar toda la documentación necesaria para su incorporación laboral desde su móvil.
            El proceso es totalmente seguro y los datos introducidos están protegidos según la normativa de protección de datos.
          </p>
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
import { ArrowRight } from 'lucide-vue-next';

export default {
  name: 'Index',
  components: {
    AppHeader,
    AppFooter,
    Button,
    TransitionWrapper,
    ArrowRight
  },
  data() {
    return {
      campoNegocio: 'Empresa S.A.',
      textoInstrucciones: 'A continuación se le solicita la información necesaria para su contratación, así como documentación como DNI, certificado de titularidad de la cuenta bancaria y tarjeta de la Seguridad Social. Por favor, tenga a mano esta documentación antes de continuar.<br>Una vez cumplimentados todos los datos y enviar el formulario, recibirá una copia de los documentos en el email proporcionado.'
    }
  },
  methods: {
    empezar() {
      this.$router.push('/personal-info');
    }
  }
}
</script>
