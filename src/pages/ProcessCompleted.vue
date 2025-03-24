
<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader title="Proceso Completado" />
    
    <main class="flex-1 container max-w-2xl mx-auto p-6">
      <TransitionWrapper class="space-y-6">
        <WorkflowStep 
          :steps="workflowSteps" 
          currentStepId="completed" 
          class="mb-8"
        />
        
        <div class="text-center">
          <div class="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 text-primary mb-4">
            <CheckCircle size="30" />
          </div>
          <h2 class="text-2xl font-bold mb-2">¡Gracias por completar la documentación!</h2>
          <p class="text-muted-foreground mb-8">
            Hemos recibido correctamente todos los documentos y datos necesarios para tu incorporación.
          </p>
        </div>
        
        <Card class="border border-primary/20">
          <CardHeader>
            <CardTitle>A continuación deberá realizar un examen de PREVENCIÓN DE RIESGOS LABORALES</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <p>Por favor, descargue el manual desde este enlace:</p>
            
            <div class="text-center py-2">
              <Button 
                @click="downloadManual"
                icon="Download"
                iconPosition="left"
                variant="outline"
              >
                Descargar Manual
              </Button>
            </div>
            
            <div class="border-t pt-4 text-center">
              <p class="mb-4">Cuando esté listo para realizar el examen pulse en empezar.</p>
              <Button 
                @click="startExam"
                icon="ArrowRight"
                iconPosition="right"
              >
                Empezar examen
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div class="bg-muted/30 rounded-lg p-6 mt-4">
          <h3 class="text-lg font-medium mb-2">¿Qué sigue ahora?</h3>
          <p class="text-sm text-muted-foreground">
            Después de que complete el examen de prevención de riesgos laborales, el departamento de Recursos Humanos revisará toda la documentación proporcionada y se pondrá en contacto con usted para los siguientes pasos del proceso de incorporación.
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
import WorkflowStep from '../components/workflow/WorkflowStep.vue';
import Card from '../components/ui/Card.vue';
import CardHeader from '../components/ui/CardHeader.vue';
import CardTitle from '../components/ui/CardTitle.vue';
import CardContent from '../components/ui/CardContent.vue';
import { CheckCircle, Download, ArrowRight } from 'lucide-vue-next';

export default {
  name: 'ProcessCompleted',
  components: {
    AppHeader,
    AppFooter,
    Button,
    TransitionWrapper,
    WorkflowStep,
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CheckCircle,
    Download,
    ArrowRight
  },
  data() {
    return {
      workflowSteps: [
        { id: 'personal-info', title: 'Información Personal' },
        { id: 'documents-upload', title: 'Subir Documentos' },
        { id: 'sign-documents', title: 'Firmar Documentos' },
        { id: 'confirmation', title: 'Confirmación' },
        { id: 'completed', title: 'Proceso Completado' }
      ]
    }
  },
  methods: {
    downloadManual() {
      // En una aplicación real, esto descargaría el manual
      alert('En una aplicación real, aquí se descargaría el manual de prevención de riesgos laborales.');
    },
    startExam() {
      this.$router.push('/safety-exam');
    }
  }
}
</script>
