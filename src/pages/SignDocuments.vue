
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
            title="Recibo Entrega Uniforme" 
            description="Confirma la recepción del uniforme y equipamiento"
            :icon="FileCheck"
          >
            <div class="space-y-4">
              <div class="bg-muted/50 rounded-lg p-4">
                <h4 class="text-sm font-medium mb-2">Elementos recibidos:</h4>
                <div class="space-y-2">
                  <div v-for="item in uniformData" :key="item.id" class="flex justify-between text-sm">
                    <span>
                      {{ item.name }} ({{ item.size }})
                    </span>
                    <span class="font-medium">x{{ item.quantity }}</span>
                  </div>
                </div>
              </div>
              
              <SignatureCanvas
                id="uniformSignature"
                label="Firma de recepción"
                description="Firma confirmando la recepción del uniforme detallado arriba"
                required
                v-model="signatures.uniformReceipt"
              />
              
              <p v-if="errors.uniformReceipt" class="text-xs text-destructive">{{ errors.uniformReceipt }}</p>
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
                  :disabled="!hasScrolledToEnd"
                  class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label for="safetyAgreement" class="text-sm font-medium">
                  He leído y acepto la información preventiva
                </label>
              </div>
              
              <div v-if="safetyAgreement">
                <SignatureCanvas
                  id="safetySignature"
                  label="Firma de acuse de recibo"
                  description="Firma confirmando que has recibido y comprendido la información preventiva"
                  required
                  v-model="signatures.safetyInfo"
                />
              </div>
              
              <p v-if="errors.safetyInfo" class="text-xs text-destructive">{{ errors.safetyInfo }}</p>
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
import { FileCheck, AlertTriangle, HardHat } from 'lucide-vue-next';

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
    FileCheck,
    AlertTriangle,
    HardHat
  },
  data() {
    return {
      workflowSteps: [
        { id: 'personal-info', title: 'Información Personal' },
        { id: 'documents-upload', title: 'Subir Documentos' },
        { id: 'sign-documents', title: 'Firmar Documentos' },
        { id: 'confirmation', title: 'Confirmación' }
      ],
      uniformData: [
        { id: 1, name: 'Camiseta corporativa', size: 'M', quantity: 2 },
        { id: 2, name: 'Pantalón de trabajo', size: 'M', quantity: 2 },
        { id: 3, name: 'Chaqueta', size: 'M', quantity: 1 },
        { id: 4, name: 'Calzado de seguridad', size: '42', quantity: 1 }
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
      signatures: {
        uniformReceipt: null,
        safetyInfo: null
      },
      safetyAgreement: false,
      hasScrolledToEnd: false,
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
    handlePreventiveInfoScroll(event) {
      const element = event.target;
      // Check if scrolled to bottom
      const scrolledToEnd = Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 10;
      
      if (scrolledToEnd && !this.hasScrolledToEnd) {
        this.hasScrolledToEnd = true;
      }
    },
    
    validateForm() {
      const errors = {};
      
      if (!this.signatures.uniformReceipt) {
        errors.uniformReceipt = 'Es necesario firmar el recibo de entrega de uniforme';
      }
      
      if (!this.signatures.safetyInfo || !this.safetyAgreement) {
        errors.safetyInfo = 'Es necesario firmar el acuse de recibo de la información preventiva';
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
        signatures: {
          uniformReceipt: this.signatures.uniformReceipt ? 'signed' : null,
          safetyInfo: this.signatures.safetyInfo ? 'signed' : null
        },
        safetyExam: {
          completed: true,
          score: score,
          passed: score >= 80
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
