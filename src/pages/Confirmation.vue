
<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader showBackButton title="Confirmación" />
    
    <main class="flex-1 container max-w-2xl mx-auto p-6">
      <TransitionWrapper class="space-y-6">
        <WorkflowStep 
          :steps="workflowSteps" 
          currentStepId="confirmation" 
          class="mb-8"
        />
        
        <FormSection 
          title="Resumen de Información" 
          description="Revisa la información proporcionada antes de enviar"
          :icon="ClipboardCheck"
        >
          <div class="space-y-4">
            <div v-if="personalInfo" class="bg-muted/50 rounded-lg p-4 space-y-3">
              <h4 class="text-sm font-medium">Datos Personales</h4>
              <div class="grid grid-cols-2 gap-2 text-xs">
                <div><span class="font-medium">Nombre:</span> {{ personalInfo.fullName }}</div>
                <div><span class="font-medium">DNI/NIE:</span> {{ personalInfo.dni }}</div>
                <div><span class="font-medium">Email:</span> {{ personalInfo.email }}</div>
                <div><span class="font-medium">Teléfono:</span> {{ personalInfo.phone }}</div>
              </div>
              
              <h4 class="text-sm font-medium pt-2">Dirección</h4>
              <div class="grid grid-cols-2 gap-2 text-xs">
                <div><span class="font-medium">Dirección:</span> {{ personalInfo.address }}</div>
                <div><span class="font-medium">Código Postal:</span> {{ personalInfo.postalCode }}</div>
                <div><span class="font-medium">Ciudad:</span> {{ personalInfo.city }}</div>
                <div><span class="font-medium">Provincia:</span> {{ personalInfo.province }}</div>
              </div>
              
              <h4 class="text-sm font-medium pt-2">Datos Bancarios</h4>
              <div class="grid grid-cols-2 gap-2 text-xs">
                <div><span class="font-medium">IBAN:</span> {{ personalInfo.iban }}</div>
                <div><span class="font-medium">Titular:</span> {{ personalInfo.accountHolder }}</div>
              </div>
            </div>
            
            <div v-if="documentInfo" class="bg-muted/50 rounded-lg p-4">
              <h4 class="text-sm font-medium mb-2">Documentos Subidos</h4>
              <div class="space-y-2 text-xs">
                <div v-if="documentInfo.idCard && documentInfo.idCard.length">
                  <span class="font-medium">DNI/NIE:</span> {{ documentInfo.idCard.join(', ') }}
                </div>
                <div v-if="documentInfo.socialSecurity && documentInfo.socialSecurity.length">
                  <span class="font-medium">Tarjeta Seg. Social:</span> {{ documentInfo.socialSecurity.join(', ') }}
                </div>
                <div v-if="documentInfo.bankCertificate && documentInfo.bankCertificate.length">
                  <span class="font-medium">Certificado Bancario:</span> {{ documentInfo.bankCertificate.join(', ') }}
                </div>
              </div>
            </div>
            
            <div v-if="documentsInfo" class="bg-muted/50 rounded-lg p-4">
              <h4 class="text-sm font-medium mb-2">Documentos Firmados</h4>
              <div class="space-y-2 text-xs">
                <div>
                  <span class="font-medium">Recibo Entrega Uniforme:</span> 
                  {{ documentsInfo.signatures.uniformReceipt ? 'Firmado ✓' : 'No firmado ✗' }}
                </div>
                <div>
                  <span class="font-medium">Acuse Recibo Información Preventiva:</span> 
                  {{ documentsInfo.signatures.safetyInfo ? 'Firmado ✓' : 'No firmado ✗' }}
                </div>
                <div v-if="documentsInfo.safetyExam">
                  <span class="font-medium">Examen Prevención:</span> 
                  {{ documentsInfo.safetyExam.score.toFixed(0) }}% 
                  ({{ documentsInfo.safetyExam.passed ? 'Aprobado ✓' : 'No aprobado ✗' }})
                </div>
              </div>
            </div>
            
            <div class="space-y-3 pt-2">
              <div class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="confirmCheck"
                  v-model="confirmCheck"
                  class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label for="confirmCheck" class="text-sm font-medium">
                  Confirmo que toda la información proporcionada es correcta
                </label>
              </div>
              
              <div class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="privacyCheck"
                  v-model="privacyCheck"
                  class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label for="privacyCheck" class="text-sm font-medium">
                  He leído y acepto la política de privacidad y protección de datos
                </label>
              </div>
              
              <p v-if="errors.confirm" class="text-xs text-destructive">{{ errors.confirm }}</p>
            </div>
          </div>
        </FormSection>
        
        <div class="flex justify-end pt-4">
          <Button 
            @click="handleSubmit"
            :isLoading="isSubmitting"
            icon="SendHorizontal"
            iconPosition="right"
          >
            Enviar Información
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
import WorkflowStep from '../components/workflow/WorkflowStep.vue';
import FormSection from '../components/workflow/FormSection.vue';
import { ClipboardCheck, SendHorizontal } from 'lucide-vue-next';

export default {
  name: 'Confirmation',
  components: {
    AppHeader,
    AppFooter,
    Button,
    TransitionWrapper,
    WorkflowStep,
    FormSection,
    ClipboardCheck,
    SendHorizontal
  },
  data() {
    return {
      workflowSteps: [
        { id: 'personal-info', title: 'Información Personal' },
        { id: 'documents-upload', title: 'Subir Documentos' },
        { id: 'sign-documents', title: 'Firmar Documentos' },
        { id: 'confirmation', title: 'Confirmación' }
      ],
      personalInfo: null,
      documentInfo: null,
      documentsInfo: null,
      confirmCheck: false,
      privacyCheck: false,
      errors: {},
      isSubmitting: false
    }
  },
  mounted() {
    // Load saved data
    try {
      const personalInfo = localStorage.getItem('personalInfo');
      if (personalInfo) {
        this.personalInfo = JSON.parse(personalInfo);
      }
      
      const documentInfo = localStorage.getItem('documentInfo');
      if (documentInfo) {
        this.documentInfo = JSON.parse(documentInfo);
      }
      
      const documentsInfo = localStorage.getItem('documentsInfo');
      if (documentsInfo) {
        this.documentsInfo = JSON.parse(documentsInfo);
      }
    } catch (e) {
      console.error('Error loading saved data', e);
    }
  },
  methods: {
    validateForm() {
      const errors = {};
      
      if (!this.confirmCheck || !this.privacyCheck) {
        errors.confirm = 'Es necesario aceptar ambas confirmaciones para continuar';
      }
      
      this.errors = errors;
      return Object.keys(errors).length === 0;
    },
    
    handleSubmit() {
      if (!this.validateForm()) {
        return;
      }
      
      this.isSubmitting = true;
      
      // Simulate API call
      setTimeout(() => {
        // In a real app, here you would send all collected data to your backend
        
        // Save completion status
        localStorage.setItem('processCompleted', 'true');
        
        this.isSubmitting = false;
        this.$router.push('/completed');
      }, 2000);
    }
  }
}
</script>
