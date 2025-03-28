
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
              <h4 class="text-sm font-medium mb-2">¿Desea realizar reconocimiento médico?</h4>
              
              <div class="flex space-x-4 mb-4">
                <label class="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="medicalExamOption"
                    :value="true"
                    v-model="wantsMedicalExam"
                    class="h-4 w-4 text-primary focus:ring-primary"
                  />
                  <span class="text-sm">Sí</span>
                </label>
                
                <label class="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="medicalExamOption"
                    :value="false"
                    v-model="wantsMedicalExam"
                    class="h-4 w-4 text-primary focus:ring-primary"
                  />
                  <span class="text-sm">No</span>
                </label>
              </div>
              
              <div v-if="wantsMedicalExam === true">
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
                    2. Los datos aportados por el interesado se utilizarán con carácter único y exclusivo para los fines previstos en el procedimiento o actuación de que se trate. En ningún caso los datos referidos serán objeto de tratamiento o cesión a terceros sino es con el consentimiento inequívoco del afectado, o en los supuestos previstos en los artículos 6.2 y 11.2 de la Ley 15/1999 de 13 de Diciembre de Protección de datos de carácter personal (BOE nº 298 de 14 Diciembre 1999)
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
                
                <div class="flex items-center space-x-2 mt-3">
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
              </div>
              
              <div v-if="wantsMedicalExam === false">
                <div 
                  ref="medicalRejectScroll" 
                  class="bg-muted/50 rounded-lg p-4 max-h-48 overflow-y-auto"
                  @scroll="handleMedicalRejectScroll"
                >
                  <h4 class="text-sm font-medium mb-2">B) NO DESEO REALIZAR RECONOCIMIENTO MÉDICO</h4>
                  <p class="text-sm text-muted-foreground">
                    En virtud del artículo 22 de la Ley de Prevención de Riesgos Laborales, el empresario garantizará a los trabajadores a su servicio la vigilancia periódica de su estado de salud en función de los riesgos inherentes al trabajo. La empresa ha ofrecido a sus trabajadores los Exámenes de Salud, derecho al cual los trabajadores pueden renunciar, salvo en los tres supuestos contenidos en el apartado A.2.
                    <br><br>
                    (Continúe desplazándose para leer todo el contenido)
                    <br><br>
                    Última línea del documento informativo.
                  </p>
                </div>
                
                <div class="flex items-center space-x-2 mt-3">
                  <input
                    type="checkbox"
                    id="medicalReject"
                    v-model="medicalReject"
                    :disabled="!hasScrolledMedicalRejectToEnd"
                    class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label for="medicalReject" class="text-sm font-medium">
                    He leído y acepto la información sobre renuncia al reconocimiento médico
                  </label>
                </div>
              </div>
              
              <p v-if="errors.medicalConsent" class="text-xs text-destructive">{{ errors.medicalConsent }}</p>
            </div>
          </FormSection>
          
          <div class="flex justify-end pt-4">
            <Button 
              type="submit"
              :isLoading="isSubmitting"
              icon="ArrowRight"
              iconPosition="right"
            >
              Continuar al Resumen
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
        { id: 'confirmation', title: 'Confirmación' },
        { id: 'completed', title: 'Proceso Completado' }
      ],
      harassmentAgreement: false,
      safetyAgreement: false,
      wantsMedicalExam: null,
      medicalConsent: false,
      medicalReject: false,
      hasScrolledHarassmentToEnd: false,
      hasScrolledSafetyToEnd: false,
      hasScrolledMedicalToEnd: false,
      hasScrolledMedicalRejectToEnd: false,
      errors: {},
      isSubmitting: false
    }
  },
  created() {
    console.log('SignDocuments component created');
    
    // Load existing data if available
    try {
      const documentsInfo = localStorage.getItem('documentsInfo');
      if (documentsInfo) {
        const parsedData = JSON.parse(documentsInfo);
        
        if (parsedData.agreements) {
          this.harassmentAgreement = parsedData.agreements.harassmentProtocol || false;
          this.safetyAgreement = parsedData.agreements.safetyInfo || false;
          this.wantsMedicalExam = parsedData.agreements.wantsMedicalExam;
          this.medicalConsent = parsedData.agreements.medicalConsent || false;
          this.medicalReject = parsedData.agreements.medicalReject || false;
        }
      }
    } catch (e) {
      console.error('Error loading saved data', e);
    }
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
    
    handleMedicalRejectScroll(event) {
      const element = event.target;
      // Check if scrolled to bottom
      const scrolledToEnd = Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 10;
      
      if (scrolledToEnd && !this.hasScrolledMedicalRejectToEnd) {
        this.hasScrolledMedicalRejectToEnd = true;
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
      
      if (this.wantsMedicalExam === null) {
        errors.medicalConsent = 'Es necesario seleccionar una opción sobre el reconocimiento médico';
      } else if (this.wantsMedicalExam === true && !this.medicalConsent) {
        errors.medicalConsent = 'Es necesario aceptar el consentimiento médico';
      } else if (this.wantsMedicalExam === false && !this.medicalReject) {
        errors.medicalConsent = 'Es necesario aceptar la información sobre renuncia al reconocimiento médico';
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
      
      // Save data
      const documentsInfo = {
        agreements: {
          harassmentProtocol: this.harassmentAgreement,
          safetyInfo: this.safetyAgreement,
          wantsMedicalExam: this.wantsMedicalExam,
          medicalConsent: this.medicalConsent,
          medicalReject: this.medicalReject
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
