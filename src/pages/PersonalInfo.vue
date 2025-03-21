
<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader showBackButton title="Información Personal" />
    
    <main class="flex-1 container max-w-2xl mx-auto p-6">
      <TransitionWrapper class="space-y-6">
        <WorkflowStep 
          :steps="workflowSteps" 
          currentStepId="personal-info" 
          class="mb-8"
        />
        
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <FormSection 
            title="Datos Personales" 
            description="Introduce tus datos personales básicos" 
            :icon="User"
          >
            <div class="grid grid-cols-1 gap-4">
              <div class="space-y-2">
                <label for="fullName" class="text-sm font-medium">Nombre Completo *</label>
                <input 
                  id="fullName" 
                  v-model="formData.fullName" 
                  type="text" 
                  required 
                  class="w-full px-4 py-2 rounded-md border border-input bg-background" 
                  placeholder="Introduce tu nombre completo"
                />
                <p v-if="errors.fullName" class="text-xs text-destructive">{{ errors.fullName }}</p>
              </div>
              
              <div class="space-y-2">
                <label for="dni" class="text-sm font-medium">DNI/NIE *</label>
                <input 
                  id="dni" 
                  v-model="formData.dni" 
                  type="text" 
                  required 
                  class="w-full px-4 py-2 rounded-md border border-input bg-background" 
                  placeholder="Introduce tu DNI o NIE"
                />
                <p v-if="errors.dni" class="text-xs text-destructive">{{ errors.dni }}</p>
              </div>
              
              <div class="space-y-2">
                <label for="email" class="text-sm font-medium">Email *</label>
                <input 
                  id="email" 
                  v-model="formData.email" 
                  type="email" 
                  required 
                  class="w-full px-4 py-2 rounded-md border border-input bg-background" 
                  placeholder="tu.email@ejemplo.com"
                />
                <p v-if="errors.email" class="text-xs text-destructive">{{ errors.email }}</p>
              </div>
              
              <div class="space-y-2">
                <label for="phone" class="text-sm font-medium">Teléfono *</label>
                <input 
                  id="phone" 
                  v-model="formData.phone" 
                  type="tel" 
                  required 
                  class="w-full px-4 py-2 rounded-md border border-input bg-background" 
                  placeholder="Introduce tu número de teléfono"
                />
                <p v-if="errors.phone" class="text-xs text-destructive">{{ errors.phone }}</p>
              </div>
            </div>
          </FormSection>
          
          <FormSection 
            title="Dirección" 
            description="Introduce los datos de tu domicilio actual" 
            :icon="Home"
          >
            <div class="grid grid-cols-1 gap-4">
              <div class="space-y-2">
                <label for="address" class="text-sm font-medium">Dirección *</label>
                <input 
                  id="address" 
                  v-model="formData.address" 
                  type="text" 
                  required 
                  class="w-full px-4 py-2 rounded-md border border-input bg-background" 
                  placeholder="Calle, número, piso..."
                />
                <p v-if="errors.address" class="text-xs text-destructive">{{ errors.address }}</p>
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label for="postalCode" class="text-sm font-medium">Código Postal *</label>
                  <input 
                    id="postalCode" 
                    v-model="formData.postalCode" 
                    type="text" 
                    required 
                    class="w-full px-4 py-2 rounded-md border border-input bg-background" 
                    placeholder="Código postal"
                  />
                  <p v-if="errors.postalCode" class="text-xs text-destructive">{{ errors.postalCode }}</p>
                </div>
                
                <div class="space-y-2">
                  <label for="city" class="text-sm font-medium">Ciudad *</label>
                  <input 
                    id="city" 
                    v-model="formData.city" 
                    type="text" 
                    required 
                    class="w-full px-4 py-2 rounded-md border border-input bg-background" 
                    placeholder="Ciudad"
                  />
                  <p v-if="errors.city" class="text-xs text-destructive">{{ errors.city }}</p>
                </div>
              </div>
              
              <div class="space-y-2">
                <label for="province" class="text-sm font-medium">Provincia *</label>
                <input 
                  id="province" 
                  v-model="formData.province" 
                  type="text" 
                  required 
                  class="w-full px-4 py-2 rounded-md border border-input bg-background" 
                  placeholder="Provincia"
                />
                <p v-if="errors.province" class="text-xs text-destructive">{{ errors.province }}</p>
              </div>
            </div>
          </FormSection>
          
          <FormSection 
            title="Datos Bancarios" 
            description="Introduce los datos de tu cuenta bancaria" 
            :icon="CreditCard"
          >
            <div class="space-y-4">
              <div class="space-y-2">
                <label for="iban" class="text-sm font-medium">IBAN *</label>
                <input 
                  id="iban" 
                  v-model="formData.iban" 
                  type="text" 
                  required 
                  class="w-full px-4 py-2 rounded-md border border-input bg-background" 
                  placeholder="ES00 0000 0000 0000 0000 0000"
                />
                <p v-if="errors.iban" class="text-xs text-destructive">{{ errors.iban }}</p>
              </div>
              
              <div class="space-y-2">
                <label for="accountHolder" class="text-sm font-medium">Titular de la Cuenta *</label>
                <input 
                  id="accountHolder" 
                  v-model="formData.accountHolder" 
                  type="text" 
                  required 
                  class="w-full px-4 py-2 rounded-md border border-input bg-background" 
                  placeholder="Nombre del titular"
                />
                <p v-if="errors.accountHolder" class="text-xs text-destructive">{{ errors.accountHolder }}</p>
              </div>
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
import AppHeader from '../components/layout/Header.vue';
import AppFooter from '../components/layout/Footer.vue';
import Button from '../components/ui/Button.vue';
import TransitionWrapper from '../components/ui/TransitionWrapper.vue';
import WorkflowStep from '../components/workflow/WorkflowStep.vue';
import FormSection from '../components/workflow/FormSection.vue';
import { User, Home, CreditCard, ArrowRight } from 'lucide-vue-next';

export default {
  name: 'PersonalInfo',
  components: {
    AppHeader,
    AppFooter,
    Button,
    TransitionWrapper,
    WorkflowStep,
    FormSection,
    User,
    Home,
    CreditCard,
    ArrowRight
  },
  data() {
    return {
      workflowSteps: [
        { id: 'personal-info', title: 'Información Personal' },
        { id: 'documents-upload', title: 'Subir Documentos' },
        { id: 'sign-documents', title: 'Firmar Documentos' },
        { id: 'confirmation', title: 'Confirmación' }
      ],
      formData: {
        fullName: '',
        dni: '',
        email: '',
        phone: '',
        address: '',
        postalCode: '',
        city: '',
        province: '',
        iban: '',
        accountHolder: ''
      },
      errors: {},
      isSubmitting: false
    }
  },
  mounted() {
    // Check if we have saved data
    const savedPersonalInfo = localStorage.getItem('personalInfo');
    if (savedPersonalInfo) {
      try {
        this.formData = JSON.parse(savedPersonalInfo);
      } catch (e) {
        console.error('Error parsing saved personal info', e);
      }
    }
  },
  methods: {
    validateForm() {
      const errors = {};
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const dniRegex = /^[0-9]{8}[A-Za-z]$|^[XYZxyz][0-9]{7}[A-Za-z]$/;
      const phoneRegex = /^[6789]\d{8}$/;
      const postalCodeRegex = /^\d{5}$/;
      const ibanRegex = /^ES\d{2}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$|^ES\d{22}$/;
      
      if (!this.formData.fullName || this.formData.fullName.trim().length < 3) {
        errors.fullName = 'Introduce un nombre válido';
      }
      
      if (!this.formData.dni || !dniRegex.test(this.formData.dni)) {
        errors.dni = 'Introduce un DNI o NIE válido';
      }
      
      if (!this.formData.email || !emailRegex.test(this.formData.email)) {
        errors.email = 'Introduce un email válido';
      }
      
      if (!this.formData.phone || !phoneRegex.test(this.formData.phone)) {
        errors.phone = 'Introduce un teléfono válido (9 dígitos)';
      }
      
      if (!this.formData.address || this.formData.address.trim().length < 5) {
        errors.address = 'Introduce una dirección válida';
      }
      
      if (!this.formData.postalCode || !postalCodeRegex.test(this.formData.postalCode)) {
        errors.postalCode = 'Introduce un código postal válido (5 dígitos)';
      }
      
      if (!this.formData.city || this.formData.city.trim().length < 2) {
        errors.city = 'Introduce una ciudad válida';
      }
      
      if (!this.formData.province || this.formData.province.trim().length < 2) {
        errors.province = 'Introduce una provincia válida';
      }
      
      if (!this.formData.iban || !ibanRegex.test(this.formData.iban)) {
        errors.iban = 'Introduce un IBAN válido (formato ES00 0000 0000 0000 0000 0000)';
      }
      
      if (!this.formData.accountHolder || this.formData.accountHolder.trim().length < 3) {
        errors.accountHolder = 'Introduce el nombre del titular de la cuenta';
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
      
      // Save data to localStorage
      localStorage.setItem('personalInfo', JSON.stringify(this.formData));
      
      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        this.$router.push('/documents-upload');
      }, 800);
    }
  }
}
</script>
