
<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader showBackButton title="Firmar Documentos" />
    
    <main class="flex-1 container max-w-2xl mx-auto p-6">
      <TransitionWrapper class="space-y-6">
        <WorkflowStep 
          :steps="workflowSteps" 
          currentStepId="sign-documents" 
          class="mb-8"
        />
        
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <FormSection 
            title="Acuse de recibo - Protocolo de Acoso" 
            description="Confirma que has recibido el protocolo de prevención y actuación frente al acoso"
            :icon="FileText"
          >
            <div class="space-y-4">
              <div 
                ref="harassmentProtocolScroll" 
                class="bg-muted/50 rounded-lg p-4 max-h-48 overflow-y-auto"
                @scroll="handleHarassmentProtocolScroll"
              >
                <h4 class="text-sm font-medium mb-2">Protocolo de Prevención y Actuación frente al Acoso:</h4>
                <p class="text-sm text-muted-foreground">
                  El empresario deberá informar a cada trabajador de la prevención y actuación frente al acoso sexual y del acoso por razón de sexo en cualquiera de sus manifestaciones, por ello, le entregamos el Protocolo para la prevención y actuación frente al acoso sexual y al acoso por razón de sexo establecido en la empresa.
                  <br><br>
                  (Continúe desplazándose para leer todo el contenido)
                  <br><br>
                  Última línea del documento informativo.
                </p>
              </div>
              
              <div class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="harassmentAgreement"
                  v-model="harassmentAgreement"
                  :disabled="!hasScrolledHarassmentToEnd"
                  class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label for="harassmentAgreement" class="text-sm font-medium">
                  He leído y acepto el protocolo de prevención y actuación frente al acoso
                </label>
              </div>
              
              <p v-if="errors.harassmentAgreement" class="text-xs text-destructive">{{ errors.harassmentAgreement }}</p>
            </div>
          </FormSection>
          
          <FormSection 
            title="Acuse de Recibo - Información Preventiva" 
            description="Confirma que has recibido la información de prevención de riesgos laborales"
            :icon="AlertTriangle"
          >
            <div class="space-y-4">
              <div 
                ref="preventiveInfoScroll" 
                class="bg-muted/50 rounded-lg p-4 max-h-48 overflow-y-auto"
                @scroll="handlePreventiveInfoScroll"
              >
                <h4 class="text-sm font-medium mb-2">Información de Prevención de Riesgos Laborales:</h4>
                <p class="text-sm text-muted-foreground">
                  Por la presente, confirmo haber recibido la información relativa a los riesgos 
                  laborales específicos de mi puesto de trabajo, así como las medidas preventivas 
                  y de protección aplicables. Me comprometo a seguir las instrucciones de seguridad 
                  proporcionadas y a utilizar correctamente los equipos de protección individual 
                  cuando sea necesario.
                  <br><br>
                  La información preventiva incluye:
                  <br><br>
                  1. Riesgos generales del centro de trabajo.
                  <br><br>
                  2. Riesgos específicos de mi puesto.
                  <br><br>
                  3. Medidas preventivas a adoptar.
                  <br><br>
                  4. Medidas de emergencia y evacuación.
                  <br><br>
                  5. Equipos de protección individual necesarios.
                  <br><br>
                  6. Procedimientos de trabajo seguros.
                  <br><br>
                  (Continúe desplazándose para leer todo el contenido)
                  <br><br>
                  Última línea del documento informativo.
                </p>
              </div>
              
              <div class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="safetyAgreement"
                  v-model="safetyAgreement"
                  :disabled="!hasScrolledSafetyToEnd"
                  class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label for="safetyAgreement" class="text-sm font-medium">
                  He leído y acepto la información preventiva
                </label>
              </div>
              
              <p v-if="errors.safetyAgreement" class="text-xs text-destructive">{{ errors.safetyAgreement }}</p>
            </div>
          </FormSection>
          
          <FormSection 
            title="Consentimiento Médico" 
            description="Información sobre reconocimiento médico"
            :icon="Stethoscope"
          >
            <div class="space-y-4">
              <div 
                ref="medicalConsentScroll" 
                class="bg-muted/50 rounded-lg p-4 max-h-48 overflow-y-auto"
                @scroll="handleMedicalConsentScroll"
              >
                <h4 class="text-sm font-medium mb-2">A) DESEO REALIZAR RECONOCIMIENTO MÉDICO</h4>
                <p class="text-sm text-muted-foreground">
                  1) En cumplimiento de lo establecido en la Ley Orgánica 15/1999, de 13 de Diciembre de Protección de datos de carácter Personal, le informamos que:
                  <br><br>
                  1. Los datos de carácter personal que Vd. facilite se incorporarán al fichero de la empresa de Vigilancia de Salud concertada.
                  <br><br>
                  2. Los datos aportados por el interesado se utilizaran con carácter único y exclusivo para los fines previstos en el procedimiento o actuación de que se trate. En ningún caso los datos referidos serán objeto de tratamiento o cesión a terceros sino es con el consentimiento inequívoco del afectado, o en los supuestos previstos en los artículos 6.2 y 11.2 de la Ley 15/1999 de 13 de Diciembre de Protección de datos de carácter personal (BOE nº 298 de 14 Diciembre 1999)
                  <br><br>
                  De conformidad con lo dispuesto en la Ley 41/2003, de 14 de Noviembre, la actividad sanitaria requiere la conservación de la documentación clínica que es necesaria para el conocimiento veraz y actualizado del estado de salud del trabajador. Para ello es preciso la recogida y tratamiento de sus datos de carácter personal incluidos los definidos en el artículo 7 de la citada Ley 15/1999.
                  <br><br>
                  Si usted decidiera ejercer sus derechos de acceso, rectificación y cancelación, siempre que legalmente proceda de acuerdo con la referida Ley 15/1999, puede hacerlo dirigiendo su petición a la empresa de Vigilancia de Salud concertada o con la dirección de su empresa.
                  <br><br>
                  2) Acepto la realización del Examen de Salud y la práctica de las pruebas complementarias y específicas pertinentes, de acuerdo a lo dispuesto en la ley 31/1995 y en el Reglamento de los Servicios de Prevención 39/1997, reconociendo que el Examen de Salud tiene carácter voluntario salvo en los tres supuestos siguientes:
                  <br><br>
                  1. Cuando la realización de los reconocimientos médicos sea imprescindible para evaluar los efectos de las condiciones de trabajo sobre la salud de los trabajadores.
                  <br><br>
                  2. Para verificar si el estado de salud del trabajador puede constituir un peligro para él mismo, para los demás o para otras personas relacionadas con la empresa.
                  <br><br>
                  3. Cuando así esté establecido en una disposición legal en relación con la protección de riesgos específicos y actividades de especial peligrosidad.
                  <br><br>
                  (Continúe desplazándose para leer todo el contenido)
                  <br><br>
                  Última línea del documento informativo.
                </p>
              </div>
              
              <div class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="medicalConsent"
                  v-model="medicalConsent"
                  :disabled="!hasScrolledMedicalToEnd"
                  class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label for="medicalConsent" class="text-sm font-medium">
                  He leído y acepto el consentimiento médico
                </label>
              </div>
              
              <p v-if="errors.medicalConsent" class="text-xs text-destructive">{{ errors.medicalConsent }}</p>
            </div>
          </FormSection>
          
          <FormSection 
            title="Examen Prevención Riesgos Laborales" 
            description="Contesta a las siguientes preguntas sobre prevención de riesgos"
            :icon="HardHat"
          >
            <div class="space-y-4">
              <Card v-for="question in safetyQuestions" :key="question.id" class="border border-border/40">
                <CardHeader class="pb-2">
                  <CardTitle class="text-sm">{{ question.text }}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div class="flex space-x-4">
                    <label class="flex items-center space-x-2">
                      <input
                        type="radio"
                        :name="question.id"
                        :value="true"
                        v-model="answers[question.id]"
                        class="h-4 w-4 text-primary focus:ring-primary"
                      />
                      <span class="text-sm">Verdadero</span>
                    </label>
                    
                    <label class="flex items-center space-x-2">
                      <input
                        type="radio"
                        :name="question.id"
                        :value="false"
                        v-model="answers[question.id]"
                        class="h-4 w-4 text-primary focus:ring-primary"
                      />
                      <span class="text-sm">Falso</span>
                    </label>
                  </div>
                </CardContent>
              </Card>
              
              <p v-if="errors.safetyExam" class="text-xs text-destructive">{{ errors.safetyExam }}</p>
            </div>
          </FormSection>
          
          <div class="flex justify-end pt-4">
            <Button 
              type="submit"
              :isLoading="isSubmitting"
              icon="ArrowRight"
              iconPosition="right"
            >
              Continuar
            </Button>
          </div>
        </form>
      </TransitionWrapper>
    </main>
    
    <AppFooter />
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import AppHeader from '../components/layout/Header.vue';
import AppFooter from '../components/layout/Footer.vue';
import Button from '../components/ui/Button.vue';
import TransitionWrapper from '../components/ui/TransitionWrapper.vue';
import WorkflowStep from '../components/workflow/WorkflowStep.vue';
import FormSection from '../components/workflow/FormSection.vue';
import SignatureCanvas from '../components/workflow/SignatureCanvas.vue';
import Card from '../components/ui/Card.vue';
import CardHeader from '../components/ui/CardHeader.vue';
import CardTitle from '../components/ui/CardTitle.vue';
import CardContent from '../components/ui/CardContent.vue';
import { FileText, AlertTriangle, HardHat, Stethoscope } from 'lucide-vue-next';

export default {
  name: 'SignDocuments',
  components: {
    AppHeader,
    AppFooter,
    Button,
    TransitionWrapper,
    WorkflowStep,
    FormSection,
    SignatureCanvas,
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    FileText,
    AlertTriangle,
    HardHat,
    Stethoscope
  },
  data() {
    return {
      workflowSteps: [
        { id: 'personal-info', title: 'Información Personal' },
        { id: 'documents-upload', title: 'Subir Documentos' },
        { id: 'sign-documents', title: 'Firmar Documentos' },
        { id: 'confirmation', title: 'Confirmación' }
      ],
      safetyQuestions: [
        {
          id: 'question1',
          text: 'Es obligatorio el uso de equipo de protección individual en las áreas señalizadas.',
          correct: true
        },
        {
          id: 'question2',
          text: 'En caso de emergencia, debo dirigirme al punto de encuentro más cercano siguiendo las indicaciones.',
          correct: true
        },
        {
          id: 'question3',
          text: 'Puedo utilizar equipos para los que no he recibido formación si es una emergencia.',
          correct: false
        },
        {
          id: 'question4',
          text: 'Debo informar inmediatamente de cualquier situación de riesgo que observe.',
          correct: true
        },
        {
          id: 'question5',
          text: 'La señalización de seguridad es solo una recomendación que puedo ignorar si tengo experiencia.',
          correct: false
        }
      ],
      harassmentAgreement: false,
      safetyAgreement: false,
      medicalConsent: false,
      hasScrolledHarassmentToEnd: false,
      hasScrolledSafetyToEnd: false,
      hasScrolledMedicalToEnd: false,
      answers: {},
      errors: {},
      isSubmitting: false
    }
  },
  created() {
    console.log('SignDocuments component created');
    
    // Initialize answers
    this.safetyQuestions.forEach(q => {
      this.answers[q.id] = null;
    });
  },
  mounted() {
    console.log('SignDocuments component mounted');
  },
  methods: {
    handleHarassmentProtocolScroll(event) {
      const element = event.target;
      // Check if scrolled to bottom
      const scrolledToEnd = Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 10;
      
      if (scrolledToEnd && !this.hasScrolledHarassmentToEnd) {
        this.hasScrolledHarassmentToEnd = true;
      }
    },
    
    handlePreventiveInfoScroll(event) {
      const element = event.target;
      // Check if scrolled to bottom
      const scrolledToEnd = Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 10;
      
      if (scrolledToEnd && !this.hasScrolledSafetyToEnd) {
        this.hasScrolledSafetyToEnd = true;
      }
    },
    
    handleMedicalConsentScroll(event) {
      const element = event.target;
      // Check if scrolled to bottom
      const scrolledToEnd = Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 10;
      
      if (scrolledToEnd && !this.hasScrolledMedicalToEnd) {
        this.hasScrolledMedicalToEnd = true;
      }
    },
    
    validateForm() {
      const errors = {};
      
      if (!this.harassmentAgreement) {
        errors.harassmentAgreement = 'Es necesario aceptar el protocolo de acoso';
      }
      
      if (!this.safetyAgreement) {
        errors.safetyAgreement = 'Es necesario aceptar la información preventiva';
      }
      
      if (!this.medicalConsent) {
        errors.medicalConsent = 'Es necesario aceptar el consentimiento médico';
      }
      
      // Check if all questions are answered
      const unansweredQuestions = Object.values(this.answers).filter(value => value === null);
      if (unansweredQuestions.length > 0) {
        errors.safetyExam = 'Es necesario contestar todas las preguntas del examen';
      }
      
      this.errors = errors;
      return Object.keys(errors).length === 0;
    },
    
    handleSubmit() {
      if (!this.validateForm()) {
        // Scroll to first error
        const firstErrorEl = document.querySelector('.text-destructive');
        if (firstErrorEl) {
          firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
      
      this.isSubmitting = true;
      
      // Calculate exam score
      const correctAnswers = this.safetyQuestions.filter(
        q => this.answers[q.id] === q.correct
      ).length;
      const score = (correctAnswers / this.safetyQuestions.length) * 100;
      
      // Save data
      const documentsInfo = {
        agreements: {
          harassmentProtocol: this.harassmentAgreement,
          safetyInfo: this.safetyAgreement,
          medicalConsent: this.medicalConsent
        },
        safetyExam: {
          completed: true,
          score: score,
          answers: this.answers
        }
      };
      localStorage.setItem('documentsInfo', JSON.stringify(documentsInfo));
      
      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        this.$router.push('/confirmation');
      }, 1500);
    }
  }
}
</script>
