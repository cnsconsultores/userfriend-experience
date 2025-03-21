
<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader showBackButton title="Subir Documentos" />
    
    <main class="flex-1 container max-w-2xl mx-auto p-6">
      <TransitionWrapper class="space-y-6">
        <WorkflowStep 
          :steps="workflowSteps" 
          currentStepId="documents-upload" 
          class="mb-8"
        />
        
        <div class="rounded-lg border bg-card text-card-foreground shadow-sm backdrop-blur-sm bg-white/50 border-transparent mb-6">
          <div class="p-6 flex flex-col space-y-1.5">
            <h3 class="font-semibold text-lg tracking-tight">Instrucciones</h3>
            <p class="text-sm text-muted-foreground">
              Toma fotos claras y legibles de tus documentos. Asegúrate de que todos los datos son visibles.
            </p>
          </div>
        </div>
        
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <FormSection 
            title="DNI / NIE" 
            description="Sube imágenes de ambas caras de tu DNI o NIE"
            :icon="FileText"
          >
            <DocumentUpload
              id="idCard"
              label="DNI / NIE (ambas caras)"
              description="Sube fotos claras de ambas caras de tu documento de identidad"
              accept="image/*"
              :multiple="true"
              :maxFiles="2"
              v-model="documents.idCard"
              :showCamera="true"
            />
            <p v-if="errors.idCard" class="text-xs text-destructive mt-2">{{ errors.idCard }}</p>
          </FormSection>
          
          <FormSection 
            title="Tarjeta Seguridad Social" 
            description="Sube una imagen de tu tarjeta de la Seguridad Social"
            :icon="CreditCard"
          >
            <DocumentUpload
              id="socialSecurity"
              label="Tarjeta de la Seguridad Social"
              description="Sube una foto clara de tu tarjeta de la Seguridad Social"
              accept="image/*"
              v-model="documents.socialSecurity"
              :showCamera="true"
            />
            <p v-if="errors.socialSecurity" class="text-xs text-destructive mt-2">{{ errors.socialSecurity }}</p>
          </FormSection>
          
          <FormSection 
            title="Certificado Bancario" 
            description="Sube un certificado de titularidad de tu cuenta bancaria"
            :icon="Landmark"
          >
            <DocumentUpload
              id="bankCertificate"
              label="Certificado Bancario"
              description="Documento que acredite la titularidad de tu cuenta bancaria"
              accept="image/*,.pdf"
              v-model="documents.bankCertificate"
              :showCamera="true"
            />
            <p v-if="errors.bankCertificate" class="text-xs text-destructive mt-2">{{ errors.bankCertificate }}</p>
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
import AppHeader from '../components/layout/Header.vue';
import AppFooter from '../components/layout/Footer.vue';
import Button from '../components/ui/Button.vue';
import TransitionWrapper from '../components/ui/TransitionWrapper.vue';
import WorkflowStep from '../components/workflow/WorkflowStep.vue';
import FormSection from '../components/workflow/FormSection.vue';
import DocumentUpload from '../components/workflow/DocumentUpload.vue';
import { FileText, CreditCard, Landmark } from 'lucide-vue-next';

export default {
  name: 'DocumentsUpload',
  components: {
    AppHeader,
    AppFooter,
    Button,
    TransitionWrapper,
    WorkflowStep,
    FormSection,
    DocumentUpload,
    FileText,
    CreditCard,
    Landmark
  },
  data() {
    return {
      workflowSteps: [
        { id: 'personal-info', title: 'Información Personal' },
        { id: 'documents-upload', title: 'Subir Documentos' },
        { id: 'sign-documents', title: 'Firmar Documentos' },
        { id: 'confirmation', title: 'Confirmación' }
      ],
      documents: {
        idCard: [],
        socialSecurity: [],
        bankCertificate: []
      },
      errors: {},
      isSubmitting: false
    }
  },
  mounted() {
    // Check for saved document info
    const savedDocumentInfo = localStorage.getItem('documentInfo');
    if (savedDocumentInfo) {
      try {
        const parsed = JSON.parse(savedDocumentInfo);
        // We can't restore actual files, but we can indicate they were uploaded
        if (parsed.idCard && parsed.idCard.length) {
          this.documents.idCard = [{name: 'DNI_guardado.jpg', size: 0, type: 'image/jpeg'}];
        }
        if (parsed.socialSecurity && parsed.socialSecurity.length) {
          this.documents.socialSecurity = [{name: 'SS_guardado.jpg', size: 0, type: 'image/jpeg'}];
        }
        if (parsed.bankCertificate && parsed.bankCertificate.length) {
          this.documents.bankCertificate = [{name: 'Banco_guardado.pdf', size: 0, type: 'application/pdf'}];
        }
      } catch (e) {
        console.error('Error parsing saved document info', e);
      }
    }
  },
  methods: {
    validateForm() {
      const errors = {};
      
      if (this.documents.idCard.length === 0) {
        errors.idCard = 'Es necesario subir una imagen del DNI/NIE';
      }
      
      if (this.documents.socialSecurity.length === 0) {
        errors.socialSecurity = 'Es necesario subir una imagen de la tarjeta de la Seguridad Social';
      }
      
      if (this.documents.bankCertificate.length === 0) {
        errors.bankCertificate = 'Es necesario subir un certificado bancario';
      }
      
      this.errors = errors;
      return Object.keys(errors).length === 0;
    },
    
    handleSubmit() {
      if (!this.validateForm()) {
        return;
      }
      
      this.isSubmitting = true;
      
      // In a real app, this would upload files to a server
      // Here we just store names for demo purposes
      const documentInfo = {
        idCard: this.documents.idCard.map(f => f.name),
        socialSecurity: this.documents.socialSecurity.map(f => f.name),
        bankCertificate: this.documents.bankCertificate.map(f => f.name)
      };
      localStorage.setItem('documentInfo', JSON.stringify(documentInfo));
      
      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        this.$router.push('/sign-documents');
      }, 1500);
    }
  }
}
</script>
